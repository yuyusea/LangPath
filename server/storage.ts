import { randomUUID } from "crypto";
import type {
  UserProfile,
  InsertUserProfile,
  LearningSchedule,
  InsertLearningSchedule,
  UserProgress,
  InsertUserProgress,
  ScheduleData,
} from "@shared/schema";

export interface IStorage {
  // User Profile
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  getUserProfile(id: string): Promise<UserProfile | undefined>;
  
  // Learning Schedule
  createLearningSchedule(schedule: InsertLearningSchedule): Promise<LearningSchedule>;
  getLearningSchedule(userProfileId: string): Promise<LearningSchedule | undefined>;
  
  // User Progress
  createUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  getUserProgress(userProfileId: string): Promise<UserProgress | undefined>;
  updateUserProgress(userProfileId: string, updates: Partial<UserProgress>): Promise<UserProgress>;
}

export class MemStorage implements IStorage {
  private userProfiles: Map<string, UserProfile>;
  private learningSchedules: Map<string, LearningSchedule>;
  private userProgresses: Map<string, UserProgress>;

  constructor() {
    this.userProfiles = new Map();
    this.learningSchedules = new Map();
    this.userProgresses = new Map();
  }

  async createUserProfile(insertProfile: InsertUserProfile): Promise<UserProfile> {
    const id = randomUUID();
    const profile: UserProfile = { ...insertProfile, id };
    this.userProfiles.set(id, profile);
    return profile;
  }

  async getUserProfile(id: string): Promise<UserProfile | undefined> {
    return this.userProfiles.get(id);
  }

  async createLearningSchedule(insertSchedule: InsertLearningSchedule): Promise<LearningSchedule> {
    const id = randomUUID();
    const schedule: LearningSchedule = { ...insertSchedule, id };
    this.learningSchedules.set(id, schedule);
    return schedule;
  }

  async getLearningSchedule(userProfileId: string): Promise<LearningSchedule | undefined> {
    return Array.from(this.learningSchedules.values()).find(
      (schedule) => schedule.userProfileId === userProfileId
    );
  }

  async createUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const id = randomUUID();
    const progress: UserProgress = {
      ...insertProgress,
      id,
      currentWeek: insertProgress.currentWeek ?? 1,
      totalWeeks: insertProgress.totalWeeks ?? 12,
      completedDays: insertProgress.completedDays ?? {},
      streakDays: insertProgress.streakDays ?? 0,
      totalTasksCompleted: insertProgress.totalTasksCompleted ?? 0,
      lastCompletedDate: insertProgress.lastCompletedDate ?? null,
    };
    this.userProgresses.set(id, progress);
    return progress;
  }

  async getUserProgress(userProfileId: string): Promise<UserProgress | undefined> {
    return Array.from(this.userProgresses.values()).find(
      (progress) => progress.userProfileId === userProfileId
    );
  }

  async updateUserProgress(userProfileId: string, updates: Partial<UserProgress>): Promise<UserProgress> {
    const existing = await this.getUserProgress(userProfileId);
    if (!existing) {
      throw new Error("Progress not found");
    }
    
    const updated: UserProgress = { ...existing, ...updates };
    this.userProgresses.set(existing.id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
