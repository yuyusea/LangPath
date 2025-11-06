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
      
      // Initialize progress
      const progress = await storage.createUserProgress({
        userProfileId: profile.id,
        currentWeek: 1,
        totalWeeks: scheduleData.totalWeeks,
        completedDays: {},
        streakDays: 0,
        totalTasksCompleted: 0,
        lastCompletedDate: null,
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
      const currentWeek = progress.currentWeek;
      
      // Find current week's plan
      let currentWeekPlan = null;
      for (const month of scheduleData.months) {
        const week = month.weeks.find(w => w.weekNumber === currentWeek);
        if (week) {
          currentWeekPlan = week;
          break;
        }
      }
      
      if (!currentWeekPlan) {
        return res.json({ tasks: [], dayOfWeek: getTodayDayOfWeek() });
      }
      
      // Get today's day of week
      const todayDayOfWeek = getTodayDayOfWeek();
      const todayPlan = currentWeekPlan.days.find(d => d.dayOfWeek === todayDayOfWeek);
      
      res.json({
        tasks: todayPlan?.tasks || [],
        dayOfWeek: todayDayOfWeek,
        weekGoal: currentWeekPlan.goal,
      });
    } catch (error: any) {
      console.error("Error fetching today's tasks:", error);
      res.status(500).json({ error: "Failed to fetch today's tasks" });
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

  const httpServer = createServer(app);
  return httpServer;
}

function getTodayDayOfWeek(): string {
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const today = new Date().getDay();
  return days[today];
}
