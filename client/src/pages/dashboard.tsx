import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TaskCard } from "@/components/TaskCard";
import { WeeklyCalendar } from "@/components/WeeklyCalendar";
import { ProgressRing } from "@/components/ProgressRing";
import { MotivationalMessage } from "@/components/MotivationalMessage";
import { BottomNav } from "@/components/BottomNav";
import { TopNav } from "@/components/TopNav";
import { CheckCircle2, Calendar as CalendarIcon, Loader2, Flame } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Task, UserProgress } from "@shared/schema";

interface TodayResponse {
  tasks: Task[];
  dayOfWeek: string;
  weekGoal: string;
}

export default function Dashboard() {
  const { profileId, hasProfile } = useUserProfile();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  useEffect(() => {
    if (!hasProfile) {
      setLocation("/onboarding");
    }
  }, [hasProfile, setLocation]);

  const { data: todayData, isLoading: todayLoading } = useQuery<TodayResponse>({
    queryKey: ["/api/today", profileId],
    enabled: !!profileId,
  });

  const { data: progress, isLoading: progressLoading } = useQuery<UserProgress>({
    queryKey: ["/api/progress", profileId],
    enabled: !!profileId,
  });

  const toggleTaskMutation = useMutation({
    mutationFn: async (data: { taskId: string; completed: boolean }) => {
      return await apiRequest("POST", "/api/progress/toggle-task", {
        profileId,
        taskId: data.taskId,
        completed: data.completed,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress", profileId] });
    },
  });

  const completeMutation = useMutation({
    mutationFn: async (data: { dayOfWeek: string; tasksCompleted: number }) => {
      return await apiRequest("POST", "/api/progress/complete", {
        profileId,
        dayOfWeek: data.dayOfWeek,
        tasksCompleted: data.tasksCompleted,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress", profileId] });
      toast({
        title: "학습 완료!",
        description: "오늘의 학습을 완료했습니다. 정말 잘하셨어요!",
      });
    },
  });

  if (!hasProfile || !profileId) {
    return null;
  }

  if (todayLoading || progressLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const tasks = todayData?.tasks || [];
  const dayOfWeek = todayData?.dayOfWeek || "monday";
  const weekGoal = todayData?.weekGoal || "";
  
  const currentWeek = progress?.currentWeek || 1;
  const totalWeeks = progress?.totalWeeks || 12;
  const streakDays = progress?.streakDays || 0;
  const totalTasksCompleted = progress?.totalTasksCompleted || 0;
  
  const completedDaysData = (progress?.completedDays as any)?.[currentWeek] || {};
  const daysCompletedThisWeek = Object.values(completedDaysData).filter(Boolean).length;
  const weeklyCompletionRate = (daysCompletedThisWeek / 7) * 100;

  // Get completion status from backend
  const taskCompletions = (progress?.taskCompletions as any) || {};
  const completedCount = tasks.filter(task => task.taskId && taskCompletions[task.taskId]).length;
  const totalCount = tasks.length;
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const handleTaskToggle = async (task: Task, completed: boolean) => {
    if (!task.taskId) return;
    
    await toggleTaskMutation.mutateAsync({
      taskId: task.taskId,
      completed,
    });
  };

  const handleCompleteAll = async () => {
    if (completedCount === totalCount && totalCount > 0) {
      // Already all completed, just show message
      toast({
        title: "이미 완료했습니다!",
        description: "오늘의 모든 과제를 완료했어요.",
      });
    } else {
      // Mark all as complete
      for (const task of tasks) {
        if (task.taskId && !taskCompletions[task.taskId]) {
          await toggleTaskMutation.mutateAsync({
            taskId: task.taskId,
            completed: true,
          });
        }
      }
    }
  };

  const today = new Date().toLocaleDateString('ko-KR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  });

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <TopNav />
      
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        <div className="grid md:grid-cols-[1fr_320px] gap-6">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="w-4 h-4" />
                <span>{today}</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground" data-testid="page-title">
                오늘 할 학습
              </h1>
              <p className="text-muted-foreground">
                {currentWeek}주차 / {totalWeeks}주 • {weekGoal}
              </p>
            </div>

            {/* Motivational Message */}
            <MotivationalMessage
              streakDays={streakDays}
              totalTasksCompleted={totalTasksCompleted}
              weeklyCompletionRate={weeklyCompletionRate}
            />

            {/* Today's Tasks */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    오늘의 과제
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {completedCount}/{totalCount} 완료
                  </p>
                </div>
                {totalCount > 0 && (
                  <Button
                    variant={completedCount === totalCount ? "outline" : "default"}
                    size="sm"
                    onClick={handleCompleteAll}
                    disabled={completeMutation.isPending}
                    data-testid="button-complete-all"
                  >
                    {completeMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        저장 중...
                      </>
                    ) : completedCount === totalCount ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        완료됨
                      </>
                    ) : (
                      "모두 완료"
                    )}
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <TaskCard
                      key={task.taskId || task.title}
                      task={task}
                      isCompleted={task.taskId ? !!taskCompletions[task.taskId] : false}
                      onToggle={(completed) => handleTaskToggle(task, completed)}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      오늘은 쉬는 날이에요!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Daily Progress */}
            {totalCount > 0 && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-foreground">
                    오늘 진행률
                  </h3>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <ProgressRing
                    percentage={completionPercentage}
                    label="완료율"
                  />
                </CardContent>
              </Card>
            )}

            {/* Weekly Calendar */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-foreground">
                  주간 캘린더
                </h3>
              </CardHeader>
              <CardContent>
                <WeeklyCalendar
                  completedDays={completedDaysData}
                  currentWeek={currentWeek}
                />
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">연속 학습</span>
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-primary" />
                    <span className="text-lg font-bold text-foreground" data-testid="streak-count">
                      {streakDays}일
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">총 학습 완료</span>
                  <span className="text-lg font-bold text-foreground" data-testid="total-tasks">
                    {totalTasksCompleted}개
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
