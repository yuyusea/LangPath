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
import { userProfiles, learningSchedules, userProgress } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

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

// Database storage implementation using Drizzle ORM
export class DatabaseStorage implements IStorage {
  async createUserProfile(insertProfile: InsertUserProfile): Promise<UserProfile> {
    const [profile] = await db
      .insert(userProfiles)
      .values(insertProfile)
      .returning();
    return profile;
  }

  async getUserProfile(id: string): Promise<UserProfile | undefined> {
    const [profile] = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.id, id));
    return profile || undefined;
  }

  async createLearningSchedule(insertSchedule: InsertLearningSchedule): Promise<LearningSchedule> {
    const [schedule] = await db
      .insert(learningSchedules)
      .values(insertSchedule)
      .returning();
    return schedule;
  }

  async getLearningSchedule(userProfileId: string): Promise<LearningSchedule | undefined> {
    const [schedule] = await db
      .select()
      .from(learningSchedules)
      .where(eq(learningSchedules.userProfileId, userProfileId));
    return schedule || undefined;
  }

  async createUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const [progress] = await db
      .insert(userProgress)
      .values(insertProgress)
      .returning();
    return progress;
  }

  async getUserProgress(userProfileId: string): Promise<UserProgress | undefined> {
    const [progress] = await db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userProfileId, userProfileId));
    return progress || undefined;
  }

  async updateUserProgress(userProfileId: string, updates: Partial<UserProgress>): Promise<UserProgress> {
    const existing = await this.getUserProgress(userProfileId);
    if (!existing) {
      throw new Error("Progress not found");
    }
    
    const [updated] = await db
      .update(userProgress)
      .set(updates)
      .where(eq(userProgress.id, existing.id))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
