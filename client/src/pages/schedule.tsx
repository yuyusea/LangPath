import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";
import { TopNav } from "@/components/TopNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Calendar, Target, Loader2, Pencil, Trash2, Plus, X } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { ScheduleData, UserProgress, Task } from "@shared/schema";

const DAY_LABELS: { [key: string]: string } = {
  monday: "월",
  tuesday: "화",
  wednesday: "수",
  thursday: "목",
  friday: "금",
  saturday: "토",
  sunday: "일",
};

interface TaskEditData {
  weekNumber: number;
  dayOfWeek: string;
  taskIndex: number;
  task: Task;
  isNew?: boolean;
}

export default function Schedule() {
  const { profileId, hasProfile } = useUserProfile();
  const [, setLocation] = useLocation();
  const [expandedMonth, setExpandedMonth] = useState<string>("month-1");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Edit dialog state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskEditData | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    duration: "",
    details: [""],
  });

  // Delete confirmation state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<{ weekNumber: number; dayOfWeek: string; taskIndex: number } | null>(null);

  useEffect(() => {
    if (!hasProfile) {
      setLocation("/welcome");
    }
  }, [hasProfile, setLocation]);

  const { data: schedule, isLoading: scheduleLoading } = useQuery<ScheduleData>({
    queryKey: ["/api/schedule", profileId],
    enabled: !!profileId,
  });

  const { data: progress, isLoading: progressLoading } = useQuery<UserProgress>({
    queryKey: ["/api/progress", profileId],
    enabled: !!profileId,
  });

  const toggleTaskMutation = useMutation({
    mutationFn: async ({ taskId, completed }: { taskId: string; completed: boolean }) => {
      return await apiRequest("POST", "/api/progress/toggle-task", {
        profileId,
        taskId,
        completed,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress", profileId] });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: async (data: { weekNumber: number; dayOfWeek: string; taskIndex: number; task: Task }) => {
      return await apiRequest("PATCH", `/api/schedule/${profileId}/task`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/schedule", profileId] });
      setEditDialogOpen(false);
      toast({ title: "수정되었습니다" });
    },
    onError: () => {
      toast({ title: "수정에 실패했습니다", variant: "destructive" });
    },
  });

  const addTaskMutation = useMutation({
    mutationFn: async (data: { weekNumber: number; dayOfWeek: string; task: Task }) => {
      return await apiRequest("POST", `/api/schedule/${profileId}/task`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/schedule", profileId] });
      setEditDialogOpen(false);
      toast({ title: "추가되었습니다" });
    },
    onError: () => {
      toast({ title: "추가에 실패했습니다", variant: "destructive" });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (data: { weekNumber: number; dayOfWeek: string; taskIndex: number }) => {
      return await apiRequest("DELETE", `/api/schedule/${profileId}/task`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/schedule", profileId] });
      setDeleteDialogOpen(false);
      toast({ title: "삭제되었습니다" });
    },
    onError: () => {
      toast({ title: "삭제에 실패했습니다", variant: "destructive" });
    },
  });

  if (!hasProfile || !profileId) {
    return null;
  }

  if (scheduleLoading || progressLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const months = schedule?.months || [];
  const taskCompletions = (progress?.taskCompletions as any) || {};

  const handleTaskToggle = (taskId: string, completed: boolean) => {
    toggleTaskMutation.mutate({ taskId, completed });
  };

  const handleEditClick = (weekNumber: number, dayOfWeek: string, taskIndex: number, task: Task) => {
    setEditingTask({ weekNumber, dayOfWeek, taskIndex, task });
    setEditForm({
      title: task.title,
      duration: task.duration,
      details: task.details && task.details.length > 0 ? [...task.details] : [""],
    });
    setEditDialogOpen(true);
  };

  const handleAddClick = (weekNumber: number, dayOfWeek: string) => {
    setEditingTask({
      weekNumber,
      dayOfWeek,
      taskIndex: -1,
      task: { title: "", duration: "30분", details: [] },
      isNew: true,
    });
    setEditForm({
      title: "",
      duration: "30분",
      details: [""],
    });
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (weekNumber: number, dayOfWeek: string, taskIndex: number) => {
    setTaskToDelete({ weekNumber, dayOfWeek, taskIndex });
    setDeleteDialogOpen(true);
  };

  const handleSaveTask = () => {
    if (!editingTask || !editForm.title.trim()) return;

    const cleanedDetails = editForm.details.filter(d => d.trim().length > 0);
    const taskData = {
      title: editForm.title.trim(),
      duration: editForm.duration.trim() || "30분",
      details: cleanedDetails.length > 0 ? cleanedDetails : undefined,
    };

    if (editingTask.isNew) {
      addTaskMutation.mutate({
        weekNumber: editingTask.weekNumber,
        dayOfWeek: editingTask.dayOfWeek,
        task: taskData,
      });
    } else {
      updateTaskMutation.mutate({
        weekNumber: editingTask.weekNumber,
        dayOfWeek: editingTask.dayOfWeek,
        taskIndex: editingTask.taskIndex,
        task: taskData,
      });
    }
  };

  const handleConfirmDelete = () => {
    if (!taskToDelete) return;
    deleteTaskMutation.mutate(taskToDelete);
  };

  const addDetailField = () => {
    setEditForm(prev => ({
      ...prev,
      details: [...prev.details, ""],
    }));
  };

  const removeDetailField = (index: number) => {
    setEditForm(prev => ({
      ...prev,
      details: prev.details.filter((_, i) => i !== index),
    }));
  };

  const updateDetailField = (index: number, value: string) => {
    setEditForm(prev => ({
      ...prev,
      details: prev.details.map((d, i) => i === index ? value : d),
    }));
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <TopNav />
      
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        <div className="mb-6 space-y-2">
          <h1 className="text-3xl font-bold text-foreground" data-testid="page-title">
            학습 스케줄
          </h1>
          <p className="text-muted-foreground">
            {schedule?.totalWeeks || 12}주 완성 로드맵
          </p>
        </div>

        <div className="space-y-6">
          <Accordion
            type="single"
            collapsible
            value={expandedMonth}
            onValueChange={setExpandedMonth}
            className="space-y-6"
          >
            {months.map((month) => (
              <AccordionItem
                key={month.monthNumber}
                value={`month-${month.monthNumber}`}
                className="border-none"
              >
                <Card className="overflow-hidden">
                  <CardHeader className="bg-primary/5 border-b border-primary/10">
                    <AccordionTrigger 
                      className="hover:no-underline p-0"
                      data-testid={`month-${month.monthNumber}-trigger`}
                    >
                      <div className="flex items-start justify-between gap-4 w-full">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            <h2 className="text-xl font-semibold text-foreground">
                              {month.monthNumber}개월차
                            </h2>
                          </div>
                          <div className="flex items-start gap-2">
                            <Target className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            <p className="text-foreground font-medium">{month.goal}</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="shrink-0">
                          {month.weeks.length}주
                        </Badge>
                      </div>
                    </AccordionTrigger>
                  </CardHeader>
                  
                  <AccordionContent className="pb-0">
                    <CardContent className="p-4 space-y-4">
                      {month.weeks.map((week) => (
                        <div key={week.weekNumber} className="space-y-3">
                          <div className="flex items-center gap-3 py-2 border-b">
                            <Badge variant="outline" className="shrink-0">
                              {week.weekNumber}주차
                            </Badge>
                            <span className="font-medium text-foreground">
                              {week.goal}
                            </span>
                          </div>
                          
                          {week.days && week.days.length > 0 ? (
                            <div className="space-y-3">
                              {week.days.map((day) => (
                                <div
                                  key={day.dayOfWeek}
                                  className="pl-4 border-l-2 border-primary/20 space-y-2"
                                >
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-medium text-sm text-muted-foreground">
                                      {DAY_LABELS[day.dayOfWeek]}요일
                                    </h4>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleAddClick(week.weekNumber, day.dayOfWeek)}
                                      className="h-7 text-xs"
                                      data-testid={`add-task-${week.weekNumber}-${day.dayOfWeek}`}
                                    >
                                      <Plus className="w-3 h-3 mr-1" />
                                      추가
                                    </Button>
                                  </div>
                                  <div className="space-y-2">
                                    {day.tasks.map((task, idx) => {
                                      const taskId = `${week.weekNumber}-${day.dayOfWeek}-${idx}`;
                                      const isCompleted = taskCompletions[taskId] === true;
                                      
                                      return (
                                        <div
                                          key={idx}
                                          className="text-sm bg-muted/30 rounded-md p-3 group"
                                          data-testid={`task-${taskId}`}
                                        >
                                          <div className="flex items-start gap-3">
                                            <Checkbox
                                              checked={isCompleted}
                                              onCheckedChange={(checked) => 
                                                handleTaskToggle(taskId, checked === true)
                                              }
                                              data-testid={`checkbox-${taskId}`}
                                              className="mt-0.5"
                                            />
                                            <div className="flex-1 min-w-0">
                                              <div className="flex items-start justify-between gap-2">
                                                <span 
                                                  className={`font-medium ${
                                                    isCompleted 
                                                      ? "line-through text-muted-foreground" 
                                                      : "text-foreground"
                                                  }`}
                                                >
                                                  {task.title}
                                                </span>
                                                <div className="flex items-center gap-1 shrink-0">
                                                  <span className="text-muted-foreground mr-1">
                                                    {task.duration}
                                                  </span>
                                                  <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => handleEditClick(week.weekNumber, day.dayOfWeek, idx, task)}
                                                    data-testid={`edit-task-${taskId}`}
                                                  >
                                                    <Pencil className="w-3 h-3" />
                                                  </Button>
                                                  <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                                                    onClick={() => handleDeleteClick(week.weekNumber, day.dayOfWeek, idx)}
                                                    data-testid={`delete-task-${taskId}`}
                                                  >
                                                    <Trash2 className="w-3 h-3" />
                                                  </Button>
                                                </div>
                                              </div>
                                              {task.details && task.details.length > 0 && (
                                                <ul className="mt-1 space-y-1">
                                                  {task.details.map((detail, i) => (
                                                    <li 
                                                      key={i} 
                                                      className={`flex items-start gap-1 ${
                                                        isCompleted 
                                                          ? "text-muted-foreground/70" 
                                                          : "text-muted-foreground"
                                                      }`}
                                                    >
                                                      <span className="text-primary">-</span>
                                                      {detail}
                                                    </li>
                                                  ))}
                                                </ul>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground pl-4">
                              세부 계획이 곧 업데이트됩니다
                            </p>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Edit Task Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingTask?.isNew ? "할 일 추가" : "할 일 수정"}
            </DialogTitle>
            <DialogDescription>
              {editingTask && (
                <span>
                  {editingTask.weekNumber}주차 {DAY_LABELS[editingTask.dayOfWeek]}요일
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="task-title">제목</Label>
              <Input
                id="task-title"
                value={editForm.title}
                onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="학습 내용을 입력하세요"
                data-testid="input-task-title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="task-duration">소요 시간</Label>
              <Input
                id="task-duration"
                value={editForm.duration}
                onChange={(e) => setEditForm(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="예: 30분, 1시간"
                data-testid="input-task-duration"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>세부 내용</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={addDetailField}
                  data-testid="button-add-detail"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  추가
                </Button>
              </div>
              <div className="space-y-2">
                {editForm.details.map((detail, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={detail}
                      onChange={(e) => updateDetailField(index, e.target.value)}
                      placeholder="세부 내용"
                      data-testid={`input-detail-${index}`}
                    />
                    {editForm.details.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeDetailField(index)}
                        className="shrink-0"
                        data-testid={`button-remove-detail-${index}`}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              data-testid="button-cancel-edit"
            >
              취소
            </Button>
            <Button
              onClick={handleSaveTask}
              disabled={!editForm.title.trim() || updateTaskMutation.isPending || addTaskMutation.isPending}
              data-testid="button-save-task"
            >
              {(updateTaskMutation.isPending || addTaskMutation.isPending) ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                editingTask?.isNew ? "추가" : "저장"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>할 일을 삭제할까요?</AlertDialogTitle>
            <AlertDialogDescription>
              이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-testid="button-confirm-delete"
            >
              {deleteTaskMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "삭제"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <BottomNav />
    </div>
  );
}
