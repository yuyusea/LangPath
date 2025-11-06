import { useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/BottomNav";
import { TopNav } from "@/components/TopNav";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Target, 
  Clock, 
  BookOpen, 
  TrendingDown,
  RefreshCw,
  Loader2
} from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { UserProfile } from "@shared/schema";

const PROFILE_ICONS = [
  { icon: BookOpen, label: "학습 언어", key: "language", color: "text-blue-500" },
  { icon: User, label: "현재 수준", key: "currentLevel", color: "text-green-500" },
  { icon: Target, label: "학습 목표", key: "goal", color: "text-purple-500" },
  { icon: Clock, label: "목표 기간", key: "deadline", color: "text-orange-500" },
  { icon: Clock, label: "일일 학습 시간", key: "dailyTime", color: "text-pink-500" },
  { icon: BookOpen, label: "학습 방식", key: "learningStyle", color: "text-cyan-500" },
  { icon: TrendingDown, label: "약점", key: "weakness", color: "text-red-500" },
];

export default function Profile() {
  const { profileId, hasProfile } = useUserProfile();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!hasProfile) {
      setLocation("/onboarding");
    }
  }, [hasProfile, setLocation]);

  const { data: profile, isLoading } = useQuery<UserProfile>({
    queryKey: ["/api/profile", profileId],
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

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <TopNav />
      
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="mb-6 space-y-2">
          <h1 className="text-3xl font-bold text-foreground" data-testid="page-title">
            내 프로필
          </h1>
          <p className="text-muted-foreground">
            학습 설정 및 목표
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    학습자
                  </h2>
                  <Badge variant="secondary" className="mt-1">
                    {profile?.language} 학습 중
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Learning Profile */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-foreground">
                학습 프로필
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              {PROFILE_ICONS.map((item, index) => {
                const Icon = item.icon;
                const value = profile?.[item.key as keyof UserProfile] as string;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-md bg-muted/30"
                    data-testid={`profile-item-${index}`}
                  >
                    <div className={`w-10 h-10 rounded-md bg-background flex items-center justify-center shrink-0 ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-0.5">
                        {item.label}
                      </p>
                      <p className="font-medium text-foreground">
                        {value || "정보 없음"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-foreground">
                설정
              </h2>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setLocation("/onboarding")}
                data-testid="button-regenerate"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                학습 계획 재생성
              </Button>
              <p className="text-sm text-muted-foreground px-2">
                학습 목표나 상황이 변경되었다면 새로운 계획을 생성할 수 있습니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
