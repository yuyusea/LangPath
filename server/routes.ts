import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateLearningSchedule } from "./openai";
import { insertUserProfileSchema } from "@shared/schema";
import type { ScheduleData, Task } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Create user profile and generate learning schedule
  app.post("/api/profile", async (req, res) => {
    try {
      const profileData = insertUserProfileSchema.parse(req.body);
      
      // Create user profile
      const profile = await storage.createUserProfile(profileData);
      
      // Generate learning schedule using OpenAI
      const scheduleData = await generateLearningSchedule(profileData);
      
      // Save schedule
      const schedule = await storage.createLearningSchedule({
        userProfileId: profile.id,
        scheduleData: scheduleData as any, // JSON type
      });
      
      // Initialize progress with start date
      const today = new Date().toISOString().split('T')[0];
      const progress = await storage.createUserProgress({
        userProfileId: profile.id,
        currentWeek: 1,
        totalWeeks: scheduleData.totalWeeks,
        completedDays: {},
        streakDays: 0,
        totalTasksCompleted: 0,
        lastCompletedDate: null,
        startDate: today,
        taskCompletions: {},
        completedDates: {},
      });
      
      res.json({
        profile,
        schedule: scheduleData,
        progress,
      });
    } catch (error: any) {
      console.error("Error creating profile:", error);
      res.status(400).json({ error: error.message || "Failed to create profile" });
    }
  });
  
  // Get learning schedule
  app.get("/api/schedule/:profileId", async (req, res) => {
    try {
      const { profileId } = req.params;
      const schedule = await storage.getLearningSchedule(profileId);
      
      if (!schedule) {
        return res.status(404).json({ error: "Schedule not found" });
      }
      
      res.json(schedule.scheduleData);
    } catch (error: any) {
      console.error("Error fetching schedule:", error);
      res.status(500).json({ error: "Failed to fetch schedule" });
    }
  });
  
  // Get user progress
  app.get("/api/progress/:profileId", async (req, res) => {
    try {
      const { profileId } = req.params;
      const progress = await storage.getUserProgress(profileId);
      
      if (!progress) {
        return res.status(404).json({ error: "Progress not found" });
      }
      
      res.json(progress);
    } catch (error: any) {
      console.error("Error fetching progress:", error);
      res.status(500).json({ error: "Failed to fetch progress" });
    }
  });
  
  // Get today's tasks
  app.get("/api/today/:profileId", async (req, res) => {
    try {
      const { profileId } = req.params;
      
      const schedule = await storage.getLearningSchedule(profileId);
      const progress = await storage.getUserProgress(profileId);
      
      if (!schedule || !progress) {
        return res.status(404).json({ error: "Schedule or progress not found" });
      }
      
      const scheduleData = schedule.scheduleData as unknown as ScheduleData;
      
      // Calculate which day of the learning schedule user is on
      const startDate = progress.startDate || new Date().toISOString().split('T')[0];
      const today = new Date();
      const start = new Date(startDate);
      
      // Calculate days since start (0-indexed)
      const daysSinceStart = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysSinceStart < 0) {
        // Haven't started yet
        return res.json({ tasks: [], dayOfWeek: "monday", weekGoal: "" });
      }
      
      // Calculate week number (1-indexed) and day of week
      const weekNumber = Math.floor(daysSinceStart / 7) + 1;
      const dayIndex = daysSinceStart % 7;
      const dayNames = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
      const dayOfWeek = dayNames[dayIndex];
      
      // Check if beyond schedule
      if (weekNumber > scheduleData.totalWeeks) {
        return res.json({ 
          tasks: [], 
          dayOfWeek,
          weekGoal: "학습 계획을 모두 완료했습니다!" 
        });
      }
      
      // Find the week's plan
      let currentWeekPlan = null;
      for (const month of scheduleData.months) {
        const week = month.weeks.find(w => w.weekNumber === weekNumber);
        if (week) {
          currentWeekPlan = week;
          break;
        }
      }
      
      if (!currentWeekPlan) {
        return res.json({ tasks: [], dayOfWeek, weekGoal: "" });
      }
      
      // Get today's tasks based on learning schedule
      const todayPlan = currentWeekPlan.days.find(d => d.dayOfWeek === dayOfWeek);
      
      // Add taskId to each task for completion tracking
      const tasksWithIds = (todayPlan?.tasks || []).map((task, index) => ({
        ...task,
        taskId: `${weekNumber}-${dayOfWeek}-${index}`
      }));
      
      res.json({
        tasks: tasksWithIds,
        dayOfWeek,
        weekGoal: currentWeekPlan.goal,
      });
    } catch (error: any) {
      console.error("Error fetching today's tasks:", error);
      res.status(500).json({ error: "Failed to fetch today's tasks" });
    }
  });
  
  // Toggle task completion
  app.post("/api/progress/toggle-task", async (req, res) => {
    try {
      const { profileId, taskId, completed } = req.body;
      
      if (!profileId || !taskId || completed === undefined) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      
      const progress = await storage.getUserProgress(profileId);
      const schedule = await storage.getLearningSchedule(profileId);
      
      if (!progress || !schedule) {
        return res.status(404).json({ error: "Progress or schedule not found" });
      }
      
      const taskCompletions = (progress.taskCompletions as any) || {};
      const completedDays = (progress.completedDays as any) || {};
      
      // Update task completion status
      taskCompletions[taskId] = completed;
      
      // Parse taskId to get week and day info
      const [weekStr, dayOfWeek] = taskId.split('-');
      const weekNumber = parseInt(weekStr);
      
      // Get all tasks for this day from schedule
      const scheduleData = schedule.scheduleData as unknown as ScheduleData;
      let dayTasks: Task[] = [];
      
      for (const month of scheduleData.months) {
        const week = month.weeks.find(w => w.weekNumber === weekNumber);
        if (week) {
          const day = week.days.find(d => d.dayOfWeek === dayOfWeek);
          if (day) {
            dayTasks = day.tasks;
            break;
          }
        }
      }
      
      // Check if all tasks for this day are completed
      let allDayTasksCompleted = true;
      for (let i = 0; i < dayTasks.length; i++) {
        const tid = `${weekNumber}-${dayOfWeek}-${i}`;
        if (!taskCompletions[tid]) {
          allDayTasksCompleted = false;
          break;
        }
      }
      
      // Update completedDays if all tasks are done
      if (!completedDays[weekNumber]) {
        completedDays[weekNumber] = {};
      }
      
      const isNowCompleted = allDayTasksCompleted && dayTasks.length > 0;
      
      if (isNowCompleted) {
        completedDays[weekNumber][dayOfWeek] = true;
      } else {
        completedDays[weekNumber][dayOfWeek] = false;
      }
      
      // Convert week/day to actual date and update completedDates
      const actualDate = weekDayToDate(progress.startDate || new Date().toISOString().split('T')[0], weekNumber, dayOfWeek);
      const completedDates = (progress.completedDates as any) || {};
      
      if (isNowCompleted) {
        completedDates[actualDate] = true;
      } else {
        delete completedDates[actualDate];
      }
      
      // Calculate streak from actual completed dates
      const { streak: newStreak, lastDate } = calculateStreak(completedDates);
      const lastCompletedDate = lastDate;
      
      // Count total completed tasks
      const totalCompleted = Object.values(taskCompletions).filter(Boolean).length;
      
      // Update progress
      const updated = await storage.updateUserProgress(profileId, {
        taskCompletions,
        completedDays,
        completedDates,
        streakDays: newStreak,
        totalTasksCompleted: totalCompleted,
        lastCompletedDate,
      });
      
      res.json(updated);
    } catch (error: any) {
      console.error("Error toggling task:", error);
      res.status(500).json({ error: "Failed to toggle task" });
    }
  });
  
  // Complete tasks for a day
  app.post("/api/progress/complete", async (req, res) => {
    try {
      const { profileId, dayOfWeek, tasksCompleted } = req.body;
      
      if (!profileId || !dayOfWeek) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      
      const progress = await storage.getUserProgress(profileId);
      if (!progress) {
        return res.status(404).json({ error: "Progress not found" });
      }
      
      const currentWeek = progress.currentWeek;
      const completedDays = progress.completedDays as any || {};
      
      // Initialize week if not exists
      if (!completedDays[currentWeek]) {
        completedDays[currentWeek] = {};
      }
      
      // Mark day as completed
      completedDays[currentWeek][dayOfWeek] = true;
      
      // Update streak
      const today = new Date().toISOString().split('T')[0];
      let newStreak = progress.streakDays;
      
      if (progress.lastCompletedDate) {
        const lastDate = new Date(progress.lastCompletedDate);
        const todayDate = new Date(today);
        const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          newStreak += 1;
        } else if (diffDays > 1) {
          newStreak = 1;
        }
      } else {
        newStreak = 1;
      }
      
      // Update progress
      const updated = await storage.updateUserProgress(profileId, {
        completedDays,
        streakDays: newStreak,
        totalTasksCompleted: progress.totalTasksCompleted + (tasksCompleted || 0),
        lastCompletedDate: today,
      });
      
      res.json(updated);
    } catch (error: any) {
      console.error("Error completing tasks:", error);
      res.status(500).json({ error: "Failed to complete tasks" });
    }
  });
  
  // Get user profile
  app.get("/api/profile/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const profile = await storage.getUserProfile(id);
      
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      
      res.json(profile);
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  // AI Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { profileId, message, conversationHistory } = req.body;
      
      if (!profileId || !message) {
        return res.status(400).json({ error: "Missing profileId or message" });
      }
      
      const profile = await storage.getUserProfile(profileId);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      
      // Import chatWithAI dynamically
      const { chatWithAI } = await import("./openai");
      
      const response = await chatWithAI(profile, message, conversationHistory || []);
      
      res.json({ response });
    } catch (error: any) {
      console.error("Error in chat:", error);
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function getTodayDayOfWeek(): string {
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const today = new Date().getDay();
  return days[today];
}

// Helper function to convert week/day to actual date
function weekDayToDate(startDate: string, weekNumber: number, dayOfWeek: string): string {
  const dayIndex: { [key: string]: number } = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 0,
  };
  
  const start = new Date(startDate);
  const startDayIndex = start.getDay();
  
  // Calculate days to add
  let targetDayIndex = dayIndex[dayOfWeek];
  let daysToAdd = targetDayIndex - startDayIndex;
  
  // Adjust for week number (each week is 7 days)
  daysToAdd += (weekNumber - 1) * 7;
  
  // If target day is before start day in the week, add 7 days
  if (daysToAdd < 0) {
    daysToAdd += 7;
  }
  
  const targetDate = new Date(start);
  targetDate.setDate(start.getDate() + daysToAdd);
  
  return targetDate.toISOString().split('T')[0];
}

// Calculate streak from completed dates
function calculateStreak(completedDates: { [date: string]: boolean }): { streak: number; lastDate: string | null } {
  const dates = Object.keys(completedDates).filter(d => completedDates[d]).sort();
  
  if (dates.length === 0) {
    return { streak: 0, lastDate: null };
  }
  
  // Start from the most recent completed date, not today
  const mostRecentDate = dates[dates.length - 1];
  let streak = 1; // Count the most recent date
  let currentDate = new Date(mostRecentDate);
  currentDate.setDate(currentDate.getDate() - 1);
  
  // Count backwards from most recent completed date
  while (true) {
    const dateStr = currentDate.toISOString().split('T')[0];
    if (completedDates[dateStr]) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  return { streak, lastDate: mostRecentDate };
}
