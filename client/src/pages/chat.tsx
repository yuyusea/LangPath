import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TopNav } from "@/components/TopNav";
import { BottomNav } from "@/components/BottomNav";
import { Bot, Send, Sparkles, Loader2, Plus } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useLocation } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { UserProfile } from "@shared/schema";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUESTION_POOL: Record<string, string[]> = {
  japanese: [
    "히라가나를 빨리 외우는 방법이 있을까요?",
    "일본어 조사 は와 が의 차이가 뭔가요?",
    "일본어 경어 표현은 어떻게 공부해야 할까요?",
    "가타카나는 어떻게 공부하면 좋을까요?",
    "일본어 한자를 효과적으로 외우는 방법을 알려주세요",
    "일본어 문법 공부 순서를 추천해주세요",
    "일본어 청해 실력을 늘리려면 어떻게 해야 할까요?",
    "일본어 회화 연습 방법을 알려주세요",
    "JLPT 시험 준비는 어떻게 하면 좋을까요?",
    "일본 드라마로 일본어를 배울 수 있을까요?",
  ],
  english: [
    "영어 발음을 향상시키는 방법이 있을까요?",
    "영어 관사 a와 the의 차이가 뭔가요?",
    "영어 회화 실력을 빠르게 늘리려면 어떻게 해야 할까요?",
    "영어 시제를 쉽게 이해하는 방법이 있을까요?",
    "영어 전치사 사용법을 알려주세요",
    "영어 듣기 실력을 키우려면 어떻게 해야 할까요?",
    "영어로 글쓰기 연습하는 방법을 알려주세요",
    "영어 단어를 효과적으로 암기하는 방법이 있을까요?",
    "영어 원어민처럼 발음하려면 어떻게 해야 할까요?",
    "영어 뉴스나 팟캐스트 추천해주세요",
  ],
  chinese: [
    "중국어 성조를 정확하게 발음하는 방법이 있을까요?",
    "간체자와 번체자의 차이가 뭔가요?",
    "중국어 한자를 효과적으로 외우는 방법을 알려주세요",
    "중국어 병음을 빨리 익히는 방법이 있을까요?",
    "중국어 문법 기초를 알려주세요",
    "중국어 회화 연습은 어떻게 하면 좋을까요?",
    "HSK 시험 준비 방법을 알려주세요",
    "중국어 청해 실력을 늘리려면 어떻게 해야 할까요?",
    "중국 드라마로 중국어를 배울 수 있을까요?",
    "중국어 작문 실력을 키우는 방법이 있을까요?",
  ],
  spanish: [
    "스페인어 동사 변형을 쉽게 외우는 방법이 있을까요?",
    "스페인어 ser와 estar의 차이가 뭔가요?",
    "스페인어 발음에서 주의할 점이 있을까요?",
    "스페인어 접속법은 어떻게 공부해야 할까요?",
    "스페인어 회화 연습 방법을 알려주세요",
    "라틴 아메리카 스페인어와 스페인 스페인어 차이가 있나요?",
    "스페인어 듣기 실력을 키우려면 어떻게 해야 할까요?",
    "스페인어 단어를 효과적으로 외우는 방법이 있을까요?",
    "DELE 시험 준비는 어떻게 하면 좋을까요?",
    "스페인어 원어민 콘텐츠 추천해주세요",
  ],
  french: [
    "프랑스어 발음을 향상시키는 방법이 있을까요?",
    "프랑스어 남성/여성 명사를 구분하는 팁이 있을까요?",
    "프랑스어 동사 활용을 효과적으로 외우는 방법을 알려주세요",
    "프랑스어 비음 발음을 연습하는 방법이 있을까요?",
    "프랑스어 접속법은 어떻게 공부해야 할까요?",
    "프랑스어 회화 연습 방법을 알려주세요",
    "프랑스어 듣기 실력을 키우려면 어떻게 해야 할까요?",
    "DELF/DALF 시험 준비는 어떻게 하면 좋을까요?",
    "프랑스 영화로 프랑스어를 배울 수 있을까요?",
    "프랑스어와 영어의 유사점과 차이점이 뭔가요?",
  ],
  german: [
    "독일어 격변화를 쉽게 외우는 방법이 있을까요?",
    "독일어 관사 der, die, das의 차이가 뭔가요?",
    "독일어 복합 명사를 이해하는 방법을 알려주세요",
    "독일어 발음 규칙을 알려주세요",
    "독일어 동사 변형을 효과적으로 외우는 방법이 있을까요?",
    "독일어 문장 구조를 이해하는 방법을 알려주세요",
    "독일어 회화 연습 방법을 알려주세요",
    "독일어 듣기 실력을 키우려면 어떻게 해야 할까요?",
    "Goethe 시험 준비는 어떻게 하면 좋을까요?",
    "독일 미디어 콘텐츠 추천해주세요",
  ],
  korean: [
    "한글을 빨리 외우는 방법이 있을까요?",
    "한국어 존댓말과 반말의 차이가 뭔가요?",
    "한국어 조사 은/는과 이/가의 차이를 알려주세요",
    "한국어 발음 규칙을 알려주세요",
    "한국어 경어법은 어떻게 공부해야 할까요?",
    "한국어 불규칙 동사를 외우는 방법이 있을까요?",
    "한국어 회화 연습 방법을 알려주세요",
    "TOPIK 시험 준비는 어떻게 하면 좋을까요?",
    "한국 드라마로 한국어를 배울 수 있을까요?",
    "한국어 청해 실력을 늘리려면 어떻게 해야 할까요?",
  ],
  default: [
    "효과적인 언어 학습 방법을 알려주세요",
    "단어를 오래 기억하는 방법이 있을까요?",
    "오늘 학습한 내용을 복습하는 방법을 알려주세요",
    "언어 학습에 얼마나 시간을 투자해야 할까요?",
    "외국어 듣기 실력을 키우는 방법이 있을까요?",
    "외국어 말하기 연습은 어떻게 하면 좋을까요?",
    "학습 동기를 유지하는 방법을 알려주세요",
    "언어 학습 앱 추천해주세요",
    "문법과 회화 중 뭘 먼저 공부해야 할까요?",
    "언어 교환 파트너는 어떻게 찾나요?",
  ],
};

function getRandomQuestions(pool: string[], count: number): string[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function getSampleQuestions(language: string): string[] {
  const pool = QUESTION_POOL[language] || QUESTION_POOL.default;
  return getRandomQuestions(pool, 3);
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "안녕하세요! 학습에 관해 궁금한 게 있으신가요? 무엇이든 물어보세요!",
};

const CHAT_STORAGE_KEY = "langpath_chat_messages";

export default function Chat() {
  const { profileId, hasProfile } = useUserProfile();
  const [, setLocation] = useLocation();
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(CHAT_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch {
        // Invalid JSON, use default
      }
    }
    return [INITIAL_MESSAGE];
  });
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [sampleQuestions, setSampleQuestions] = useState<string[]>([]);

  const { data: profile } = useQuery<UserProfile>({
    queryKey: ["/api/profile", profileId],
    enabled: !!profileId,
  });

  useEffect(() => {
    if (profile?.language) {
      setSampleQuestions(getSampleQuestions(profile.language));
    }
  }, [profile?.language]);

  useEffect(() => {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const handleNewConversation = () => {
    setMessages([INITIAL_MESSAGE]);
    setSampleQuestions(getSampleQuestions(profile?.language || ""));
  };

  useEffect(() => {
    if (!hasProfile) {
      setLocation("/onboarding");
    }
  }, [hasProfile, setLocation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const chatMutation = useMutation({
    mutationFn: async (userMessage: string) => {
      const conversationHistory = messages.slice(1); // Exclude initial greeting
      const response = await apiRequest("POST", "/api/chat", {
        profileId,
        message: userMessage,
        conversationHistory,
      });
      return response.json();
    },
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.",
        },
      ]);
    },
  });

  const handleSend = async () => {
    if (!input.trim() || chatMutation.isPending) return;

    const userMessage = input.trim();
    setInput("");

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    await chatMutation.mutateAsync(userMessage);
  };

  const handleSampleQuestion = (question: string) => {
    setInput(question);
  };

  if (!hasProfile || !profileId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <TopNav />

      <div className="max-w-3xl mx-auto px-4 py-6 md:py-8 h-[calc(100vh-4rem)] flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground" data-testid="page-title">
                AI 트레이너
              </h1>
            </div>
            {messages.length > 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleNewConversation}
                className="gap-1"
                data-testid="button-new-conversation"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">새 대화</span>
              </Button>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            학습에 관해 무엇이든 물어보세요
          </p>
        </div>

        {/* Messages */}
        <Card className="flex-1 overflow-hidden mb-4">
          <CardContent className="h-full overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
                data-testid={`message-${message.role}-${index}`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={`rounded-lg px-4 py-3 max-w-[80%] ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {chatMutation.isPending && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div className="rounded-lg px-4 py-3 bg-muted">
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
        </Card>

        {/* Sample Questions */}
        {messages.length === 1 && (
          <div className="mb-4 space-y-2">
            <p className="text-xs text-muted-foreground">추천 질문:</p>
            <div className="flex flex-wrap gap-2">
              {sampleQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSampleQuestion(question)}
                  className="text-xs"
                  data-testid={`sample-question-${index}`}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="메시지를 입력하세요..."
            disabled={chatMutation.isPending}
            data-testid="input-message"
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || chatMutation.isPending}
            size="icon"
            data-testid="button-send"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
