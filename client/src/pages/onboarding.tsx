import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QuestionStep } from "@/components/QuestionStep";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";
import { useUserProfile } from "@/hooks/useUserProfile";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  LANGUAGE_OPTIONS,
  LEVEL_OPTIONS,
  GOAL_OPTIONS,
  DEADLINE_OPTIONS,
  DAILY_TIME_OPTIONS,
  LEARNING_STYLE_OPTIONS,
  WEAKNESS_OPTIONS,
  type InsertUserProfile,
} from "@shared/schema";

const QUESTIONS = [
  { key: "language", question: "어떤 언어를 공부하고 싶으세요?", options: LANGUAGE_OPTIONS },
  { key: "currentLevel", question: "현재 수준이 어떻게 되나요?", options: LEVEL_OPTIONS },
  { key: "goal", question: "최종 목표가 뭔가요?", options: GOAL_OPTIONS },
  { key: "deadline", question: "언제까지 목표를 달성하고 싶으세요?", options: DEADLINE_OPTIONS },
  { key: "dailyTime", question: "하루에 몇 시간 공부 가능한가요?", options: DAILY_TIME_OPTIONS },
  { key: "learningStyle", question: "어떤 방식으로 공부하고 싶으세요?", options: LEARNING_STYLE_OPTIONS },
  { key: "weakness", question: "가장 약한 부분이 뭔가요?", options: WEAKNESS_OPTIONS },
];

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Partial<InsertUserProfile>>({});
  const { saveProfileId } = useUserProfile();
  const { toast } = useToast();

  const currentQuestion = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  const handleSelect = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.key]: value };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentStep < QUESTIONS.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleComplete(newAnswers as InsertUserProfile);
      }
    }, 300);
  };

  const handleComplete = async (profile: InsertUserProfile) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const response = await apiRequest("POST", "/api/profile", profile);
      const data = await response.json();
      
      if (data.profile?.id) {
        saveProfileId(data.profile.id);
        toast({
          title: "학습 계획이 생성되었습니다!",
          description: "이제 맞춤형 학습을 시작하세요.",
        });
        setLocation("/dashboard");
      } else {
        throw new Error("Failed to create profile");
      }
    } catch (err: any) {
      console.error("Error creating profile:", err);
      const errorMessage = err.message || "학습 계획 생성에 실패했습니다";
      setError(errorMessage.includes("Failed to generate") 
        ? "AI 학습 계획 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." 
        : errorMessage);
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8">
          <div className="flex flex-col items-center gap-6 text-center">
            {error ? (
              <>
                <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-destructive" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">
                    오류가 발생했습니다
                  </h2>
                  <p className="text-muted-foreground">
                    {error}
                  </p>
                </div>
                <Button onClick={() => setLocation("/onboarding")}>
                  다시 시도
                </Button>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">
                    맞춤 학습 계획 생성 중...
                  </h2>
                  <p className="text-muted-foreground">
                    AI가 당신만의 학습 로드맵을 만들고 있어요
                  </p>
                </div>
                <div className="w-full space-y-2">
                  <Progress value={66} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    잠시만 기다려주세요 (30초-1분 소요)
                  </p>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">LangPath</h1>
          </div>
          <Progress value={progress} className="h-2" data-testid="progress-bar" />
        </div>

        <QuestionStep
          question={currentQuestion.question}
          options={currentQuestion.options}
          selectedValue={answers[currentQuestion.key as keyof InsertUserProfile]}
          onSelect={handleSelect}
          questionNumber={currentStep + 1}
          totalQuestions={QUESTIONS.length}
        />

        {currentStep > 0 && (
          <div className="mt-6">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep(currentStep - 1)}
              data-testid="button-back"
            >
              ← 이전 질문
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
