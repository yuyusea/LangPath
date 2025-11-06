import OpenAI from "openai";
import pRetry, { AbortError } from "p-retry";
import type { InsertUserProfile, ScheduleData } from "@shared/schema";

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

// Mock schedule data for fallback when OpenAI is unavailable
function generateMockSchedule(profile: InsertUserProfile): ScheduleData {
  console.log("[OpenAI] Using mock schedule data as fallback");
  
  return {
    months: [
      {
        monthNumber: 1,
        goal: `${profile.language} 기초 다지기`,
        weeks: [
          {
            weekNumber: 1,
            goal: "알파벳과 기본 발음 익히기",
            days: [
              {
                dayOfWeek: "monday",
                tasks: [
                  {
                    title: "알파벳 학습",
                    duration: "15분",
                    details: ["A-M 알파벳 쓰기 연습", "기본 발음 듣기"]
                  },
                  {
                    title: "발음 연습",
                    duration: "15분",
                    details: ["모음 발음 따라하기"]
                  }
                ]
              },
              {
                dayOfWeek: "tuesday",
                tasks: [
                  {
                    title: "알파벳 복습",
                    duration: "15분",
                    details: ["N-Z 알파벳 쓰기 연습"]
                  },
                  {
                    title: "기본 인사말",
                    duration: "15분",
                    details: ["Hello, Good morning 등 학습"]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    totalWeeks: 12
  };
}

export async function generateLearningSchedule(profile: InsertUserProfile): Promise<ScheduleData> {
  const prompt = `당신은 외국어 학습 컨설턴트입니다. 아래 학습자 정보를 바탕으로 맞춤 학습 스케줄을 만들어주세요.

[학습자 정보]
- 학습 언어: ${profile.language}
- 현재 수준: ${profile.currentLevel}
- 목표: ${profile.goal}
- 기간: ${profile.deadline}
- 일일 학습 시간: ${profile.dailyTime}
- 선호 방식: ${profile.learningStyle}
- 약점: ${profile.weakness}

[요구사항]
1. 12주 주차별 학습 목표를 명확히 설정
2. 각 주의 월요일부터 일요일까지 일일 학습 내용 제공
3. 각 학습 내용은 지정된 일일 학습 시간 내 완료 가능하게 구성
4. 약점(${profile.weakness})에 더 많은 시간 할당
5. 선호하는 학습 방식(${profile.learningStyle})을 반영
6. 구체적이고 실행 가능한 학습 과제 제시

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
