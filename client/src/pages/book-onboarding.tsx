import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ArrowLeft, ArrowRight, BookOpen, Upload, Loader2, Image as ImageIcon, Type } from "lucide-react";
import type { UserProfile } from "@shared/schema";
import { LANGUAGE_OPTIONS } from "@shared/schema";

type InputMethod = "text" | "image";

interface BookFormData {
  bookTitle: string;
  tableOfContents: string;
  tocImage: File | null;
  tocImageBase64: string;
  language: string;
  dailyTime: string;
  deadline: string;
}

const DAILY_TIME_OPTIONS = [
  { value: "15min", label: "15분" },
  { value: "30min", label: "30분" },
  { value: "1hour", label: "1시간" },
  { value: "2hours", label: "2시간 이상" },
];

const DEADLINE_OPTIONS = [
  { value: "1month", label: "1개월" },
  { value: "3months", label: "3개월" },
  { value: "6months", label: "6개월" },
  { value: "flexible", label: "여유롭게" },
];

export default function BookOnboardingPage() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [inputMethod, setInputMethod] = useState<InputMethod>("text");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<BookFormData>({
    bookTitle: "",
    tableOfContents: "",
    tocImage: null,
    tocImageBase64: "",
    language: "",
    dailyTime: "",
    deadline: "",
  });

  const totalSteps = 4;

  const createProfileMutation = useMutation({
    mutationFn: async (data: BookFormData) => {
      const response = await apiRequest("POST", "/api/profile/book", {
        bookTitle: data.bookTitle,
        tableOfContents: data.tableOfContents,
        tocImageBase64: data.tocImageBase64,
        language: data.language,
        dailyTime: data.dailyTime,
        deadline: data.deadline,
      });
      return response.json() as Promise<UserProfile>;
    },
    onSuccess: (profile) => {
      localStorage.setItem("langpath_profile_id", String(profile.id));
      toast({
        title: "학습 스케줄이 생성되었습니다!",
        description: "교재 기반 맞춤 학습을 시작해 보세요.",
      });
      setLocation("/dashboard");
    },
    onError: (error) => {
      toast({
        title: "스케줄 생성에 실패했습니다",
        description: "잠시 후 다시 시도해 주세요.",
        variant: "destructive",
      });
      console.error("Profile creation error:", error);
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "파일이 너무 큽니다",
          description: "5MB 이하의 이미지를 업로드해 주세요.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          tocImage: file,
          tocImageBase64: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.bookTitle.trim().length > 0 && formData.language;
      case 2:
        if (inputMethod === "text") {
          return formData.tableOfContents.trim().length > 0;
        } else {
          return formData.tocImageBase64.length > 0;
        }
      case 3:
        return formData.dailyTime && formData.deadline;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      setLocation("/welcome");
    }
  };

  const handleSubmit = () => {
    createProfileMutation.mutate(formData);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-foreground">
                어떤 교재로 공부하시나요?
              </h2>
              <p className="text-sm text-muted-foreground">
                교재 정보를 알려주세요
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bookTitle">교재 제목</Label>
                <Input
                  id="bookTitle"
                  placeholder="예: 민나노 니홍고 1"
                  value={formData.bookTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, bookTitle: e.target.value }))}
                  data-testid="input-book-title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">학습 언어</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}
                >
                  <SelectTrigger data-testid="select-language">
                    <SelectValue placeholder="언어를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGE_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-foreground">
                교재 목차를 입력해 주세요
              </h2>
              <p className="text-sm text-muted-foreground">
                AI가 목차를 분석해서 학습 스케줄을 만들어 드려요
              </p>
            </div>

            <div className="flex gap-2 justify-center">
              <Button
                variant={inputMethod === "text" ? "default" : "outline"}
                size="sm"
                onClick={() => setInputMethod("text")}
                data-testid="button-input-text"
              >
                <Type className="w-4 h-4 mr-2" />
                텍스트 입력
              </Button>
              <Button
                variant={inputMethod === "image" ? "default" : "outline"}
                size="sm"
                onClick={() => setInputMethod("image")}
                data-testid="button-input-image"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                이미지 업로드
              </Button>
            </div>

            {inputMethod === "text" ? (
              <div className="space-y-2">
                <Label htmlFor="toc">목차 내용</Label>
                <Textarea
                  id="toc"
                  placeholder={`예:\n1과 인사\n2과 자기소개\n3과 숫자\n4과 날짜와 시간\n...`}
                  value={formData.tableOfContents}
                  onChange={(e) => setFormData(prev => ({ ...prev, tableOfContents: e.target.value }))}
                  className="min-h-[200px] resize-none"
                  data-testid="textarea-toc"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  data-testid="input-toc-image"
                />
                
                {formData.tocImageBase64 ? (
                  <div className="space-y-3">
                    <div className="relative rounded-lg overflow-hidden border">
                      <img 
                        src={formData.tocImageBase64} 
                        alt="목차 이미지" 
                        className="w-full max-h-[300px] object-contain"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full"
                      data-testid="button-change-image"
                    >
                      다른 이미지로 변경
                    </Button>
                  </div>
                ) : (
                  <Card 
                    className="border-dashed cursor-pointer hover-elevate"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <CardContent className="p-8 flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <Upload className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-foreground">
                          이미지 업로드
                        </p>
                        <p className="text-sm text-muted-foreground">
                          목차 사진을 촬영하거나 이미지를 선택하세요
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-foreground">
                학습 설정
              </h2>
              <p className="text-sm text-muted-foreground">
                하루 학습량과 목표 기간을 설정해 주세요
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>하루에 얼마나 공부할 수 있나요?</Label>
                <div className="grid grid-cols-2 gap-2">
                  {DAILY_TIME_OPTIONS.map(option => (
                    <Button
                      key={option.value}
                      variant={formData.dailyTime === option.value ? "default" : "outline"}
                      onClick={() => setFormData(prev => ({ ...prev, dailyTime: option.value }))}
                      data-testid={`button-time-${option.value}`}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>언제까지 이 교재를 끝내고 싶으신가요?</Label>
                <div className="grid grid-cols-2 gap-2">
                  {DEADLINE_OPTIONS.map(option => (
                    <Button
                      key={option.value}
                      variant={formData.deadline === option.value ? "default" : "outline"}
                      onClick={() => setFormData(prev => ({ ...prev, deadline: option.value }))}
                      data-testid={`button-deadline-${option.value}`}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-foreground">
                입력 내용 확인
              </h2>
              <p className="text-sm text-muted-foreground">
                확인 후 스케줄 생성을 시작합니다
              </p>
            </div>

            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">교재</span>
                  <span className="font-medium">{formData.bookTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">언어</span>
                  <span className="font-medium">
                    {LANGUAGE_OPTIONS.find(l => l.value === formData.language)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">목차 입력</span>
                  <span className="font-medium">
                    {inputMethod === "text" ? "텍스트" : "이미지"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">일일 학습</span>
                  <span className="font-medium">
                    {DAILY_TIME_OPTIONS.find(t => t.value === formData.dailyTime)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">목표 기간</span>
                  <span className="font-medium">
                    {DEADLINE_OPTIONS.find(d => d.value === formData.deadline)?.label}
                  </span>
                </div>
              </CardContent>
            </Card>

            {createProfileMutation.isPending && (
              <div className="text-center space-y-3 py-4">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                <p className="text-sm text-muted-foreground">
                  AI가 교재를 분석하고 스케줄을 생성하고 있어요...
                </p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="p-4 flex items-center gap-3 border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          data-testid="button-back"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <Progress value={(step / totalSteps) * 100} className="h-2" />
        </div>
        <span className="text-sm text-muted-foreground">
          {step}/{totalSteps}
        </span>
      </header>

      <main className="flex-1 p-6 flex flex-col">
        <div className="flex-1 max-w-md mx-auto w-full">
          {renderStep()}
        </div>

        <div className="max-w-md mx-auto w-full pt-6">
          {step < totalSteps ? (
            <Button
              className="w-full"
              onClick={handleNext}
              disabled={!canProceed()}
              data-testid="button-next"
            >
              다음
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={createProfileMutation.isPending}
              data-testid="button-create-schedule"
            >
              {createProfileMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  생성 중...
                </>
              ) : (
                <>
                  <BookOpen className="w-4 h-4 mr-2" />
                  스케줄 생성하기
                </>
              )}
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
