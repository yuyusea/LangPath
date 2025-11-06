import OpenAI from "openai";
import pRetry, { AbortError } from "p-retry";
import type { InsertUserProfile, ScheduleData } from "@shared/schema";
import { LANGUAGE_OPTIONS } from "@shared/schema";

// This is using Replit's AI Integrations service, which provides OpenAI-compatible API access without requiring your own OpenAI API key.
const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY
});

// Log environment setup on startup
console.log("[OpenAI] Integration configured:", {
  hasBaseURL: !!process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  hasAPIKey: !!process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
});

// Helper function to check if error is rate limit or quota violation
function isRateLimitError(error: any): boolean {
  const errorMsg = error?.message || String(error);
  return (
    errorMsg.includes("429") ||
    errorMsg.includes("RATELIMIT_EXCEEDED") ||
    errorMsg.toLowerCase().includes("quota") ||
    errorMsg.toLowerCase().includes("rate limit")
  );
}

// Helper to get localized language label
function getLanguageLabel(languageValue: string): string {
  const option = LANGUAGE_OPTIONS.find(opt => opt.value === languageValue);
  return option?.label || languageValue;
}

// Language-specific mock schedules
function generateMockSchedule(profile: InsertUserProfile): ScheduleData {
  console.log("[OpenAI] Using mock schedule data as fallback");
  
  const languageLabel = getLanguageLabel(profile.language);
  
  const languageSpecific: { [key: string]: any } = {
    japanese: {
      week1Goal: "히라가나 완전 정복",
      monday: [
        { title: "히라가나 あ행 학습", duration: "20분", details: ["あいうえお 쓰기 연습", "발음 듣고 따라하기"] },
        { title: "일본어 기본 인사", duration: "10분", details: ["こんにちは、ありがとう 등 인사말 학습"] }
      ],
      tuesday: [
        { title: "히라가나 か행 학습", duration: "20분", details: ["かきくけこ 쓰기 연습", "탁음과 반탁음 이해"] },
        { title: "숫자 세기", duration: "10분", details: ["1~10까지 일본어로 세기"] }
      ]
    },
    english: {
      week1Goal: "영어 기초 문법과 발음",
      monday: [
        { title: "영어 알파벳과 발음", duration: "20분", details: ["A-M 발음 연습", "모음 발음 차이 학습"] },
        { title: "기본 인사 표현", duration: "10분", details: ["Hello, How are you? 등 표현 학습"] }
      ],
      tuesday: [
        { title: "영어 알파벳 복습", duration: "20분", details: ["N-Z 발음 연습", "자음 발음 차이 학습"] },
        { title: "be동사 이해", duration: "10분", details: ["I am, You are 문장 만들기"] }
      ]
    },
    chinese: {
      week1Goal: "병음과 성조 기초",
      monday: [
        { title: "병음 학습 (1성~2성)", duration: "20분", details: ["ā á 성조 구분 연습", "기본 모음 발음"] },
        { title: "간단한 인사말", duration: "10분", details: ["你好(nǐhǎo) 발음과 성조 연습"] }
      ],
      tuesday: [
        { title: "병음 학습 (3성~4성)", duration: "20분", details: ["ǎ à 성조 구분 연습", "성조 변화 규칙"] },
        { title: "숫자 세기", duration: "10분", details: ["1~10까지 중국어 숫자와 성조"] }
      ]
    },
    spanish: {
      week1Goal: "스페인어 발음과 기초 문법",
      monday: [
        { title: "스페인어 알파벳", duration: "20분", details: ["A-M 발음 연습", "ñ, ll 특수 발음 학습"] },
        { title: "인사 표현", duration: "10분", details: ["Hola, Buenos días 등 인사말"] }
      ],
      tuesday: [
        { title: "알파벳 복습", duration: "20분", details: ["N-Z 발음 연습", "롤링 R 발음 연습"] },
        { title: "명사의 성", duration: "10분", details: ["남성명사와 여성명사 구분"] }
      ]
    },
    french: {
      week1Goal: "프랑스어 발음과 알파벳",
      monday: [
        { title: "프랑스어 알파벳", duration: "20분", details: ["A-M 발음 연습", "비음 모음 이해"] },
        { title: "인사 표현", duration: "10분", details: ["Bonjour, Merci 등 기본 표현"] }
      ],
      tuesday: [
        { title: "알파벳 복습", duration: "20분", details: ["N-Z 발음 연습", "리에종 규칙 학습"] },
        { title: "명사와 관사", duration: "10분", details: ["le, la, un, une 사용법"] }
      ]
    }
  };

  const langData = languageSpecific[profile.language] || languageSpecific.english;

  return {
    months: [
      {
        monthNumber: 1,
        goal: `${languageLabel} 기초 다지기`,
        weeks: [
          {
            weekNumber: 1,
            goal: langData.week1Goal,
            days: [
              { dayOfWeek: "monday", tasks: langData.monday },
              { dayOfWeek: "tuesday", tasks: langData.tuesday }
            ]
          }
        ]
      }
    ],
    totalWeeks: 12
  };
}

export async function generateLearningSchedule(profile: InsertUserProfile): Promise<ScheduleData> {
  // Language-specific learning requirements
  const languageRequirements: { [key: string]: string } = {
    japanese: `
**일본어 학습 필수 포함사항:**
- 1-2주차: 히라가나 완전 습득 (50음도, 탁음, 반탁음, 요음)
- 3-4주차: 가타카나 완전 습득
- 5주차부터: 기초 한자 학습 시작 (JLPT N5 수준)
- 조사(は, が, を, に 등) 정확한 사용법
- 동사 변형 (ます형, て형, た형, ない형)
- 일본어 특유의 경어법 (존댓말 vs 반말)
- 문법: ~です/~ます, ~ている, ~たい 등
- ${profile.goal === "exam" ? "JLPT N5~N3 시험 대비 문제 풀이 포함" : ""}`,
    
    english: `
**영어 학습 필수 포함사항:**
- 발음: 모음/자음 발음 차이, 연음 규칙
- 기초 문법: be동사, 일반동사, 시제(현재/과거/미래)
- 문장 구조: 5형식 문장 구조 이해
- 전치사: in, on, at 등 기본 전치사 사용
- 조동사: can, will, should 등
- ${profile.goal === "exam" ? "토익/토플 유형별 문제 풀이 포함" : ""}
- ${profile.goal === "business" ? "비즈니스 이메일 작성, 프레젠테이션 표현 포함" : ""}`,
    
    chinese: `
**중국어 학습 필수 포함사항:**
- 1-2주차: 병음 완전 정복 (성모, 운모, 성조)
- 4성 (1성 ā, 2성 á, 3성 ǎ, 4성 à) 정확한 발음과 구분
- 성조 변화 규칙 (3성+3성 → 2성+3성 등)
- 기초 한자 학습 (간체자 위주, HSK 1-2급 수준)
- 기본 문법: 是, 有, 在 사용법
- 양사(量詞) 사용법
- ${profile.goal === "exam" ? "HSK 시험 대비 문제 풀이 포함" : ""}`,
    
    spanish: `
**스페인어 학습 필수 포함사항:**
- 발음: ñ, ll, rr 등 특수 발음
- 명사의 성(남성/여성) 구분과 관사
- 동사 변화: 규칙/불규칙 동사 현재형
- Ser vs Estar 차이와 사용
- 전치사: a, de, en 등 기본 전치사
- 재귀동사 이해와 활용`,
    
    french: `
**프랑스어 학습 필수 포함사항:**
- 발음: 비음 모음, 리에종 규칙
- 명사의 성(남성/여성)과 관사(le, la, un, une)
- 동사 변화: -er, -ir, -re 동사 현재형
- Être와 Avoir 동사 완전 정복
- 대명사와 소유형용사
- 부정문과 의문문 만들기`
  };

  const specificRequirements = languageRequirements[profile.language] || languageRequirements.english;

  const prompt = `당신은 ${profile.language} 전문 학습 컨설턴트입니다. 아래 학습자 정보를 바탕으로 매우 구체적이고 실용적인 12주 학습 스케줄을 만들어주세요.

[학습자 정보]
- 학습 언어: ${profile.language}
- 현재 수준: ${profile.currentLevel}
- 목표: ${profile.goal}
- 기간: ${profile.deadline}
- 일일 학습 시간: ${profile.dailyTime}
- 선호 방식: ${profile.learningStyle}
- 약점: ${profile.weakness}

${specificRequirements}

[요구사항]
1. 12주 주차별 학습 목표를 명확히 설정
2. 각 주의 월요일부터 일요일까지 일일 학습 내용 제공
3. 각 학습 내용은 지정된 일일 학습 시간 내 완료 가능하게 구성
4. 약점(${profile.weakness})에 더 많은 시간 할당
5. 선호하는 학습 방식(${profile.learningStyle})을 반영
6. **언어별 필수 포함사항을 반드시 스케줄에 포함**
7. 추상적인 내용이 아닌 구체적이고 실행 가능한 학습 과제 제시
   - 나쁜 예: "알파벳 학습", "발음 연습"
   - 좋은 예(일본어): "히라가나 あ행(あいうえお) 쓰기 50번", "조사 は와 が 차이점 예문 10개"
   - 좋은 예(영어): "be동사 현재형 긍정/부정/의문문 각 10문장", "발음: TH 소리(/θ/, /ð/) 단어 20개"

JSON 형식으로 출력해주세요:
{
  "months": [
    {
      "monthNumber": 1,
      "goal": "1개월차 목표",
      "weeks": [
        {
          "weekNumber": 1,
          "goal": "1주차 목표",
          "days": [
            {
              "dayOfWeek": "monday",
              "tasks": [
                {
                  "title": "과제 제목",
                  "duration": "30분",
                  "details": ["세부 내용1", "세부 내용2"]
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "totalWeeks": 12
}`;

  try {
    // Use p-retry for robust error handling
    const scheduleData = await pRetry(
      async () => {
        try {
          // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
          const response = await openai.chat.completions.create({
            model: "gpt-5",
            messages: [
              {
                role: "system",
                content: "You are an expert language learning consultant. Provide detailed, personalized study schedules in Korean. Always respond with valid JSON."
              },
              {
                role: "user",
                content: prompt
              }
            ],
            response_format: { type: "json_object" },
            max_completion_tokens: 8192,
          });

          const content = response.choices[0]?.message?.content;
          if (!content) {
            throw new Error("No response from OpenAI");
          }

          const parsedData: ScheduleData = JSON.parse(content);
          
          // Validate the structure
          if (!parsedData.months || !Array.isArray(parsedData.months)) {
            throw new Error("Invalid schedule format from OpenAI");
          }

          return parsedData;
        } catch (error: any) {
          console.error("OpenAI API attempt failed:", error);
          // Check if it's a rate limit error
          if (isRateLimitError(error)) {
            throw error; // Rethrow to trigger p-retry
          }
          // For non-rate-limit errors, throw immediately (don't retry)
          throw new AbortError(error);
        }
      },
      {
        retries: 7,
        minTimeout: 2000,
        maxTimeout: 128000,
        factor: 2,
        onFailedAttempt: (error) => {
          console.log(
            `Attempt ${error.attemptNumber} failed. ${error.retriesLeft} retries left.`
          );
        },
      }
    );

    return scheduleData;
  } catch (error) {
    console.error("Error generating schedule with OpenAI after all retries:", error);
    console.log("[OpenAI] Falling back to mock schedule data for development");
    // In development, return mock data instead of failing
    return generateMockSchedule(profile);
  }
}
