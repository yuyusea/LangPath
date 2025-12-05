import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Welcome from "@/pages/welcome";
import Onboarding from "@/pages/onboarding";
import BookOnboarding from "@/pages/book-onboarding";
import Dashboard from "@/pages/dashboard";
import Schedule from "@/pages/schedule";
import Progress from "@/pages/progress";
import Profile from "@/pages/profile";
import Chat from "@/pages/chat";

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <Redirect to="/welcome" />} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/book-onboarding" component={BookOnboarding} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/schedule" component={Schedule} />
      <Route path="/chat" component={Chat} />
      <Route path="/progress" component={Progress} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
