import { Home, Calendar, MessageCircle, TrendingUp, User } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { path: "/dashboard", label: "오늘", icon: Home, testId: "nav-today" },
  { path: "/schedule", label: "스케줄", icon: Calendar, testId: "nav-schedule" },
  { path: "/chat", label: "챗봇", icon: MessageCircle, testId: "nav-chat" },
  { path: "/progress", label: "진행률", icon: TrendingUp, testId: "nav-progress" },
  { path: "/profile", label: "프로필", icon: User, testId: "nav-profile" },
];

export function BottomNav() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-card-border md:hidden z-50">
      <div className="flex items-center justify-around h-16 px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = location === item.path || location.startsWith(item.path);
          const Icon = item.icon;

          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-md transition-colors min-w-[64px]",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover-elevate"
              )}
              data-testid={item.testId}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
