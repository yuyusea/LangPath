import { Flame, Award, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MotivationalMessageProps {
  streakDays: number;
  totalTasksCompleted: number;
  weeklyCompletionRate: number;
}

export function MotivationalMessage({
  streakDays,
  totalTasksCompleted,
  weeklyCompletionRate,
}: MotivationalMessageProps) {
  const getMessage = () => {
    if (streakDays >= 7) {
      return "놀라워요! 일주일 연속 학습 중이에요!";
    }
    if (streakDays >= 3) {
      return `대단해요! ${streakDays}일 연속 달성!`;
    }
    if (totalTasksCompleted >= 50) {
      return `벌써 ${totalTasksCompleted}개 학습 완료!`;
    }
    if (weeklyCompletionRate >= 80) {
      return "이번 주 정말 잘하고 계세요!";
    }
    return "오늘도 화이팅!";
  };

  return (
    <Card className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          {streakDays >= 3 ? (
            <Flame className="w-5 h-5 text-primary" />
          ) : totalTasksCompleted >= 50 ? (
            <Award className="w-5 h-5 text-primary" />
          ) : (
            <TrendingUp className="w-5 h-5 text-primary" />
          )}
        </div>
        <p className="text-base font-medium text-foreground" data-testid="motivational-message">
          {getMessage()}
        </p>
      </div>
    </Card>
  );
}
