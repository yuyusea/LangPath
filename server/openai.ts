import OpenAI from "openai";
import pRetry, { AbortError } from "p-retry";
import type { InsertUserProfile, ScheduleData, MonthPlan, WeekPlan, DayPlan, Task } from "@shared/schema";
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

// Convert deadline to total weeks
function getWeeksFromDeadline(deadline: string): number {
  switch (deadline) {
    case "1month": return 4;
    case "3months": return 12;
    case "6months": return 24;
    case "flexible": return 12;
    default: return 12;
  }
}

// Language-specific curriculum templates
const LANGUAGE_CURRICULUM: { [key: string]: { phases: { name: string; weeks: number; topics: string[] }[] } } = {
  japanese: {
    phases: [
      { name: "문자 기초", weeks: 4, topics: ["히라가나 あ~な행", "히라가나 は~わ행", "가타카나 ア~ナ행", "가타카나 ハ~ワ행"] },
      { name: "기초 문법", weeks: 4, topics: ["기본 조사(は, が, を, に)", "동사 ます형", "형용사 활용", "숫자와 시간 표현"] },
      { name: "회화 기초", weeks: 4, topics: ["자기소개", "일상 회화", "쇼핑/식당 표현", "존경어 기초"] },
      { name: "문법 심화", weeks: 4, topics: ["동사 て형", "동사 た형", "~たい 표현", "조건문 기초"] },
      { name: "독해/청해", weeks: 4, topics: ["간단한 문장 읽기", "JLPT N5 문제풀이", "애니메이션 청취", "종합 복습"] },
      { name: "실전 연습", weeks: 4, topics: ["롤플레이 회화", "작문 연습", "시험 대비", "종합 정리"] }
    ]
  },
  english: {
    phases: [
      { name: "발음과 기초", weeks: 4, topics: ["알파벳과 발음 규칙", "be동사 완전 정복", "일반동사 현재형", "기본 의문문"] },
      { name: "시제와 문법", weeks: 4, topics: ["과거형 학습", "미래형 학습", "현재진행형", "조동사 can, will"] },
      { name: "회화 기초", weeks: 4, topics: ["일상 대화", "전화/이메일 영어", "여행 영어", "쇼핑/식당 영어"] },
      { name: "문법 심화", weeks: 4, topics: ["현재완료", "수동태", "관계대명사", "가정법 기초"] },
      { name: "독해/청해", weeks: 4, topics: ["뉴스 기사 읽기", "팟캐스트 청취", "영화/드라마 표현", "토익 문제풀이"] },
      { name: "비즈니스 영어", weeks: 4, topics: ["프레젠테이션", "미팅 영어", "협상 표현", "종합 정리"] }
    ]
  },
  chinese: {
    phases: [
      { name: "발음과 성조", weeks: 4, topics: ["성모/운모 기초", "4성 완전 정복", "성조 변화 규칙", "병음 실전 연습"] },
      { name: "기초 문법", weeks: 4, topics: ["是, 有, 在 동사", "기본 어순", "양사 학습", "시간/날짜 표현"] },
      { name: "한자 학습", weeks: 4, topics: ["HSK 1급 한자", "HSK 2급 한자", "필순 연습", "한자 조합 이해"] },
      { name: "회화 기초", weeks: 4, topics: ["자기소개", "일상 대화", "길 찾기", "쇼핑/식당 표현"] },
      { name: "문법 심화", weeks: 4, topics: ["把 구문", "被 구문", "보어 학습", "복문 구조"] },
      { name: "실전 연습", weeks: 4, topics: ["HSK 문제풀이", "중국 드라마 청취", "작문 연습", "종합 정리"] }
    ]
  },
  spanish: {
    phases: [
      { name: "발음과 기초", weeks: 4, topics: ["알파벳과 발음", "명사의 성/수", "관사 사용법", "기본 인사말"] },
      { name: "동사 기초", weeks: 4, topics: ["Ser vs Estar", "-ar 동사 활용", "-er/-ir 동사 활용", "불규칙 동사"] },
      { name: "문법 심화", weeks: 4, topics: ["과거형 (Preterito)", "미래형", "전치사", "대명사"] },
      { name: "회화 기초", weeks: 4, topics: ["일상 대화", "여행 스페인어", "전화 표현", "의견 표현"] },
      { name: "접속법", weeks: 4, topics: ["접속법 현재", "접속법 과거", "조건문", "복합 문장"] },
      { name: "실전 연습", weeks: 4, topics: ["DELE 문제풀이", "원어민 콘텐츠", "작문 연습", "종합 정리"] }
    ]
  },
  french: {
    phases: [
      { name: "발음과 기초", weeks: 4, topics: ["알파벳과 발음", "비음 모음", "리에종 규칙", "기본 인사말"] },
      { name: "문법 기초", weeks: 4, topics: ["명사와 관사", "형용사 위치", "Etre/Avoir 동사", "의문문 만들기"] },
      { name: "동사 활용", weeks: 4, topics: ["-er 동사 현재형", "-ir/-re 동사", "과거형 (Passe compose)", "반과거"] },
      { name: "회화 기초", weeks: 4, topics: ["자기소개", "일상 대화", "쇼핑/식당", "길 찾기"] },
      { name: "문법 심화", weeks: 4, topics: ["대명사", "접속법 기초", "조건문", "관계대명사"] },
      { name: "실전 연습", weeks: 4, topics: ["DELF 문제풀이", "프랑스 영화", "작문 연습", "종합 정리"] }
    ]
  }
};

// Generate language-specific mock schedules with full duration
function generateMockSchedule(profile: InsertUserProfile): ScheduleData {
  console.log("[OpenAI] Using mock schedule data as fallback");
  
  const languageLabel = getLanguageLabel(profile.language);
  const totalWeeks = getWeeksFromDeadline(profile.deadline);
  const curriculum = LANGUAGE_CURRICULUM[profile.language] || LANGUAGE_CURRICULUM.english;
  
  const dayNames: Array<"monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"> = 
    ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  
  const weekdayActivities = ["새 내용 학습", "어휘 학습", "문법 연습", "듣기 연습", "말하기 연습"];
  const weekendActivities = ["주간 복습", "종합 정리"];
  
  const months: MonthPlan[] = [];
  let weekCounter = 1;
  let phaseIndex = 0;
  
  const totalMonths = Math.ceil(totalWeeks / 4);
  
  for (let monthNum = 1; monthNum <= totalMonths; monthNum++) {
    const weeksInMonth: WeekPlan[] = [];
    const monthStartWeek = weekCounter;
    
    for (let w = 0; w < 4 && weekCounter <= totalWeeks; w++) {
      const currentPhase = curriculum.phases[phaseIndex % curriculum.phases.length];
      const topicIndex = w % currentPhase.topics.length;
      const currentTopic = currentPhase.topics[topicIndex];
      
      const days: DayPlan[] = dayNames.map((day, dayIndex) => {
        const isWeekend = dayIndex >= 5;
        const activity = isWeekend 
          ? weekendActivities[dayIndex - 5]
          : weekdayActivities[dayIndex];
        
        const tasks: Task[] = [];
        
        if (isWeekend) {
          tasks.push({
            title: `${currentTopic} 복습`,
            duration: "30분",
            details: [`${weekCounter}주차 학습 내용 정리`, "핵심 포인트 복습"]
          });
          if (dayIndex === 6) {
            tasks.push({
              title: "주간 테스트",
              duration: "20분",
              details: ["주간 학습 확인 퀴즈", "오답 노트 정리"]
            });
          }
        } else {
          tasks.push({
            title: `${currentTopic} - ${activity}`,
            duration: "20분",
            details: [`${currentTopic} ${activity}`, `${languageLabel} 실력 향상`]
          });
          tasks.push({
            title: "오늘의 단어/표현",
            duration: "10분",
            details: ["새 단어 5개 암기", "예문 작성 연습"]
          });
        }
        
        return { dayOfWeek: day, tasks };
      });
      
      weeksInMonth.push({
        weekNumber: weekCounter,
        goal: `${currentTopic}`,
        days
      });
      
      weekCounter++;
      
      if (weekCounter > monthStartWeek + 3) {
        phaseIndex++;
      }
    }
    
    const monthPhase = curriculum.phases[Math.min(phaseIndex, curriculum.phases.length - 1)];
    months.push({
      monthNumber: monthNum,
      goal: `${languageLabel} ${monthPhase.name}`,
      weeks: weeksInMonth
    });
  }

  return {
    months,
    totalWeeks
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

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function chatWithAI(
  profile: InsertUserProfile,
  userMessage: string,
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  const languageLabel = getLanguageLabel(profile.language);
  
  const systemPrompt = `당신은 ${languageLabel} 학습을 돕는 친절한 AI 어시스턴트입니다.

학습자 정보:
- 학습 언어: ${languageLabel}
- 현재 수준: ${profile.currentLevel}
- 목표: ${profile.goal}
- 하루 학습 시간: ${profile.dailyTime}
- 선호 학습 방식: ${profile.learningStyle}
- 약점: ${profile.weakness}

역할:
1. 학습 관련 질문에 구체적이고 실용적인 답변을 제공하세요
2. 학습자의 수준에 맞는 설명을 하세요
3. 예시를 들어서 설명하세요
4. 격려하고 동기부여하세요
5. 짧고 명확하게 답변하세요 (너무 길지 않게)

답변 스타일:
- 친근하고 격려하는 톤
- 구체적인 예시 포함
- 실천 가능한 조언 제공
- 필요시 단계별 설명`;

  try {
    const messages = [
      { role: "system" as const, content: systemPrompt },
      ...conversationHistory.map(msg => ({ role: msg.role, content: msg.content })),
      { role: "user" as const, content: userMessage }
    ];

    console.log("[OpenAI] Sending chat request");
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content || "죄송합니다. 답변을 생성할 수 없습니다.";
    console.log("[OpenAI] Chat response received");
    
    return response;
  } catch (error: any) {
    console.error("[OpenAI] Chat error:", error);
    throw new Error("Failed to generate chat response");
  }
}
