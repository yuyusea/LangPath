import { Home, Calendar, TrendingUp, User } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { path: "/dashboard", label: "오늘", icon: Home, testId: "nav-today" },
  { path: "/schedule", label: "스케줄", icon: Calendar, testId: "nav-schedule" },
  { path: "/progress", label: "진행률", icon: TrendingUp, testId: "nav-progress" },
  { path: "/profile", label: "프로필", icon: User, testId: "nav-profile" },
];

export function TopNav() {
  const [location] = useLocation();

  return (
    <nav className="hidden md:block border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">L</span>
            </div>
            <span className="text-xl font-bold text-foreground">LangPath</span>
          </div>
          <div className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = location === item.path || location.startsWith(item.path);
              const Icon = item.icon;

              return (
                <Link key={item.path} href={item.path}>
                  <a
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover-elevate"
                    )}
                    data-testid={item.testId}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
