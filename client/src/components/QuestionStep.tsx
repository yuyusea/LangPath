import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
  flag?: string;
}

interface QuestionStepProps {
  question: string;
  options: Option[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function QuestionStep({
  question,
  options,
  selectedValue,
  onSelect,
  questionNumber,
  totalQuestions,
}: QuestionStepProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-primary">
            질문 {questionNumber}/{totalQuestions}
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
          {question}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((option) => (
          <Button
            key={option.value}
            variant={selectedValue === option.value ? "default" : "outline"}
            className={cn(
              "h-auto py-4 px-6 justify-start text-left font-medium transition-all",
              selectedValue === option.value && "ring-2 ring-primary ring-offset-2"
            )}
            onClick={() => onSelect(option.value)}
            data-testid={`option-${option.value}`}
          >
            {option.flag && <span className="text-2xl mr-3">{option.flag}</span>}
            <span>{option.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
