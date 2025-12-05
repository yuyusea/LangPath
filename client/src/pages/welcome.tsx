import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Sparkles, GraduationCap } from "lucide-react";

export default function WelcomePage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="text-welcome-title">
            LangPath
          </h1>
          <p className="text-muted-foreground" data-testid="text-welcome-subtitle">
            AI 외국어 학습 컨설턴트
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            어떻게 시작할까요?
          </p>

          <Card 
            className="cursor-pointer transition-all hover-elevate border-2 border-transparent hover:border-primary/20"
            onClick={() => setLocation("/onboarding")}
            data-testid="card-ai-curriculum"
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">
                    AI 추천 커리큘럼으로 시작
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    7단계 질문에 답하면 AI가 맞춤형 학습 스케줄을 만들어 드려요
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer transition-all hover-elevate border-2 border-transparent hover:border-primary/20"
            onClick={() => setLocation("/book-onboarding")}
            data-testid="card-book-curriculum"
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/50 rounded-xl flex items-center justify-center shrink-0">
                  <BookOpen className="w-6 h-6 text-accent-foreground" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">
                    내 교재로 공부하기
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    교재 목차를 입력하면 AI가 학습 스케줄을 만들어 드려요
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          어떤 방식을 선택하든 나중에 스케줄을 수정할 수 있어요
        </p>
      </div>
    </div>
  );
}
