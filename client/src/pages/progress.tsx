import { useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";
import { TopNav } from "@/components/TopNav";
import { ProgressRing } from "@/components/ProgressRing";
import { Badge } from "@/components/ui/badge";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Flame, 
  Target, 
  Calendar,
  CheckCircle2,
  Award,
  Loader2
} from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { UserProgress } from "@shared/schema";

const ACHIEVEMENTS = [
  { title: "첫 학습 완료", description: "학습 여정의 시작!", icon: Target, minTasks: 1 },
  { title: "3일 연속", description: "꾸준함의 힘!", icon: Flame, minStreak: 3 },
  { title: "일주일 완주", description: "한 주를 완성했어요", icon: Award, minStreak: 7 },
  { title: "한 달 달성", description: "30일 학습 완료", icon: Award, minStreak: 30 },
];

export default function Progress() {
  const { profileId, hasProfile } = useUserProfile();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!hasProfile) {
      setLocation("/onboarding");
    }
  }, [hasProfile, setLocation]);

  const { data: progress, isLoading } = useQuery<UserProgress>({
    queryKey: ["/api/progress", profileId],
    enabled: !!profileId,
  });

  if (!hasProfile || !profileId) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const currentWeek = progress?.currentWeek || 1;
  const totalWeeks = progress?.totalWeeks || 12;
  const streakDays = progress?.streakDays || 0;
  const totalTasksCompleted = progress?.totalTasksCompleted || 0;
  
  const overallProgress = (currentWeek / totalWeeks) * 100;
  
  const completedDaysData = (progress?.completedDays as any) || {};
  const currentWeekData = completedDaysData[currentWeek] || {};
  const daysCompletedThisWeek = Object.values(currentWeekData).filter(Boolean).length;
  const weeklyCompletion = (daysCompletedThisWeek / 7) * 100;

  const checkAchievement = (achievement: typeof ACHIEVEMENTS[0]) => {
    if (achievement.minTasks && totalTasksCompleted >= achievement.minTasks) return true;
    if (achievement.minStreak && streakDays >= achievement.minStreak) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <TopNav />
      
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="mb-6 space-y-2">
          <h1 className="text-3xl font-bold text-foreground" data-testid="page-title">
            학습 진행률
          </h1>
          <p className="text-muted-foreground">
            당신의 성장을 확인하세요
          </p>
        </div>

        <div className="space-y-6">
          {/* Overall Progress */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  전체 진행률
                </h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <ProgressRing
                  percentage={overallProgress}
                  size={140}
                  strokeWidth={10}
                />
                <div className="flex-1 space-y-4 w-full">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">현재 주차</span>
                      <span className="font-medium text-foreground">
                        {currentWeek} / {totalWeeks}주
                      </span>
                    </div>
                    <ProgressBar value={overallProgress} className="h-3" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/30 rounded-md p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Flame className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">연속 학습</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground">
                        {streakDays}일
                      </p>
                    </div>
                    <div className="bg-muted/30 rounded-md p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">총 완료</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground">
                        {totalTasksCompleted}개
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Progress */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  이번 주 진행률
                </h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    완료한 날
                  </span>
                  <span className="text-lg font-bold text-foreground">
                    {daysCompletedThisWeek} / 7일
                  </span>
                </div>
                <ProgressBar value={weeklyCompletion} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  이번 주 {Math.round(weeklyCompletion)}% 달성
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  업적
                </h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ACHIEVEMENTS.map((achievement, index) => {
                  const unlocked = checkAchievement(achievement);
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-md border transition-all ${
                        unlocked
                          ? "bg-primary/5 border-primary/20"
                          : "bg-muted/20 border-muted opacity-60"
                      }`}
                      data-testid={`achievement-${index}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                          <achievement.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground">
                              {achievement.title}
                            </h3>
                            {unlocked && (
                              <Badge variant="secondary" className="text-xs">
                                달성
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Learning Stats */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  학습 통계
                </h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-foreground">평균 완료율</span>
                  <span className="font-semibold text-primary">
                    {Math.round(weeklyCompletion)}%
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-foreground">가장 긴 연속 학습</span>
                  <span className="font-semibold text-foreground">
                    {streakDays}일
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-foreground">남은 기간</span>
                  <span className="font-semibold text-foreground">
                    {totalWeeks - currentWeek}주
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
