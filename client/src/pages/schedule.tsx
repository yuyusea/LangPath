import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";
import { TopNav } from "@/components/TopNav";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar, Target, Loader2 } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { ScheduleData } from "@shared/schema";

const DAY_LABELS: { [key: string]: string } = {
  monday: "월",
  tuesday: "화",
  wednesday: "수",
  thursday: "목",
  friday: "금",
  saturday: "토",
  sunday: "일",
};

export default function Schedule() {
  const { profileId, hasProfile } = useUserProfile();
  const [, setLocation] = useLocation();
  const [expandedMonth, setExpandedMonth] = useState<string>("week-1");

  useEffect(() => {
    if (!hasProfile) {
      setLocation("/onboarding");
    }
  }, [hasProfile, setLocation]);

  const { data: schedule, isLoading } = useQuery<ScheduleData>({
    queryKey: ["/api/schedule", profileId],
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

  const months = schedule?.months || [];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <TopNav />
      
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="mb-6 space-y-2">
          <h1 className="text-3xl font-bold text-foreground" data-testid="page-title">
            학습 스케줄
          </h1>
          <p className="text-muted-foreground">
            {schedule?.totalWeeks || 12}주 완성 로드맵
          </p>
        </div>

        {/* Monthly Roadmap */}
        <div className="space-y-6">
          {months.map((month) => (
            <Card key={month.monthNumber} className="overflow-hidden">
              <CardHeader className="bg-primary/5 border-b border-primary/10">
                <div className="flex items-start justify-between gap-4">
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
              </CardHeader>
              
              <CardContent className="p-4">
                <Accordion
                  type="single"
                  collapsible
                  value={expandedMonth}
                  onValueChange={setExpandedMonth}
                  className="space-y-2"
                >
                  {month.weeks.map((week) => (
                    <AccordionItem
                      key={week.weekNumber}
                      value={`week-${week.weekNumber}`}
                      className="border rounded-md px-4"
                    >
                      <AccordionTrigger 
                        className="hover:no-underline py-4"
                        data-testid={`week-${week.weekNumber}-trigger`}
                      >
                        <div className="flex items-center gap-3 text-left">
                          <Badge variant="outline" className="shrink-0">
                            {week.weekNumber}주차
                          </Badge>
                          <span className="font-medium text-foreground">
                            {week.goal}
                          </span>
                        </div>
                      </AccordionTrigger>
                      
                      <AccordionContent className="pb-4 pt-2">
                        {week.days && week.days.length > 0 ? (
                          <div className="space-y-3">
                            {week.days.map((day) => (
                              <div
                                key={day.dayOfWeek}
                                className="pl-4 border-l-2 border-primary/20 space-y-2"
                              >
                                <h4 className="font-medium text-sm text-muted-foreground">
                                  {DAY_LABELS[day.dayOfWeek]}요일
                                </h4>
                                <div className="space-y-2">
                                  {day.tasks.map((task, idx) => (
                                    <div
                                      key={idx}
                                      className="text-sm bg-muted/30 rounded-md p-3"
                                    >
                                      <div className="flex items-start justify-between gap-2">
                                        <span className="font-medium text-foreground">
                                          {task.title}
                                        </span>
                                        <span className="text-muted-foreground shrink-0">
                                          {task.duration}
                                        </span>
                                      </div>
                                      {task.details && task.details.length > 0 && (
                                        <ul className="mt-1 space-y-1">
                                          {task.details.map((detail, i) => (
                                            <li key={i} className="text-muted-foreground flex items-start gap-1">
                                              <span className="text-primary">•</span>
                                              {detail}
                                            </li>
                                          ))}
                                        </ul>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground pl-4">
                            세부 계획이 곧 업데이트됩니다
                          </p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
