import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeeklyCalendarProps {
  completedDays: { [key: string]: boolean };
  currentWeek: number;
}

const DAYS = [
  { key: "monday", label: "월", fullLabel: "월요일" },
  { key: "tuesday", label: "화", fullLabel: "화요일" },
  { key: "wednesday", label: "수", fullLabel: "수요일" },
  { key: "thursday", label: "목", fullLabel: "목요일" },
  { key: "friday", label: "금", fullLabel: "금요일" },
  { key: "saturday", label: "토", fullLabel: "토요일" },
  { key: "sunday", label: "일", fullLabel: "일요일" },
];

export function WeeklyCalendar({ completedDays, currentWeek }: WeeklyCalendarProps) {
  return (
    <div className="space-y-3" data-testid="weekly-calendar">
      <h3 className="text-sm font-semibold text-foreground">이번 주 한눈에 보기</h3>
      <div className="grid grid-cols-7 gap-2">
        {DAYS.map((day) => {
          const isCompleted = completedDays[day.key] || false;
          
          return (
            <div
              key={day.key}
              className={cn(
                "relative aspect-square rounded-md border-2 flex flex-col items-center justify-center transition-all",
                isCompleted
                  ? "bg-primary/10 border-primary"
                  : "bg-card border-card-border"
              )}
              data-testid={`day-${day.key}`}
            >
              <span className={cn(
                "text-xs font-medium mb-1",
                isCompleted ? "text-primary" : "text-muted-foreground"
              )}>
                {day.label}
              </span>
              {isCompleted && (
                <CheckCircle2 
                  className="w-5 h-5 text-primary" 
                  data-testid={`check-${day.key}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
