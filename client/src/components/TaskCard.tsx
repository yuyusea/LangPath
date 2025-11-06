import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Task } from "@shared/schema";

interface TaskCardProps {
  task: Task;
  isCompleted?: boolean;
  onToggle?: (completed: boolean) => void;
}

export function TaskCard({ task, isCompleted = false, onToggle }: TaskCardProps) {
  const [checked, setChecked] = useState(isCompleted);

  const handleToggle = (value: boolean) => {
    setChecked(value);
    onToggle?.(value);
  };

  return (
    <Card 
      className={cn(
        "p-4 transition-all hover-elevate",
        checked && "bg-muted/30"
      )}
      data-testid={`task-card-${task.title.toLowerCase().replace(/\s/g, '-')}`}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={checked}
          onCheckedChange={handleToggle}
          className="mt-1 w-6 h-6"
          data-testid={`checkbox-${task.title.toLowerCase().replace(/\s/g, '-')}`}
        />
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h4 className={cn(
              "text-base font-medium leading-tight",
              checked ? "text-muted-foreground line-through" : "text-foreground"
            )}>
              {task.title}
            </h4>
            <div className="flex items-center gap-1 text-muted-foreground shrink-0">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-sm">{task.duration}</span>
            </div>
          </div>
          {task.details && task.details.length > 0 && (
            <ul className="space-y-1 ml-1">
              {task.details.map((detail, index) => (
                <li 
                  key={index}
                  className={cn(
                    "text-sm flex items-start gap-2",
                    checked ? "text-muted-foreground" : "text-muted-foreground"
                  )}
                >
                  <span className="text-primary mt-0.5">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Card>
  );
}
