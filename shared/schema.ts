import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User profile from onboarding
export const userProfiles = pgTable("user_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  language: text("language").notNull(),
  currentLevel: text("current_level").notNull().default(""),
  goal: text("goal").notNull().default(""),
  deadline: text("deadline").notNull(),
  dailyTime: text("daily_time").notNull(),
  learningStyle: text("learning_style").notNull().default(""),
  weakness: text("weakness").notNull().default(""),
  // Book-based learning fields
  isBookBased: text("is_book_based").default("false"),
  bookTitle: text("book_title"),
  tableOfContents: text("table_of_contents"),
});

// AI-generated learning schedule
export const learningSchedules = pgTable("learning_schedules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userProfileId: varchar("user_profile_id").notNull(),
  scheduleData: jsonb("schedule_data").notNull(), // Full schedule JSON
});

// User progress tracking
export const userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userProfileId: varchar("user_profile_id").notNull(),
  currentWeek: integer("current_week").notNull().default(1),
  totalWeeks: integer("total_weeks").notNull().default(12),
  completedDays: jsonb("completed_days").notNull().default(sql`'{}'::jsonb`), // { "1": { "monday": true }, ... }
  taskCompletions: jsonb("task_completions").notNull().default(sql`'{}'::jsonb`), // { "1-monday-0": true, "1-monday-1": false, ... }
  completedDates: jsonb("completed_dates").notNull().default(sql`'{}'::jsonb`), // { "2025-11-06": true, ... }
  streakDays: integer("streak_days").notNull().default(0),
  totalTasksCompleted: integer("total_tasks_completed").notNull().default(0),
  lastCompletedDate: text("last_completed_date"),
  startDate: text("start_date").notNull().default(sql`CURRENT_DATE::text`), // When user started learning
});

// Zod schemas
export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({
  id: true,
});

export const insertLearningScheduleSchema = createInsertSchema(learningSchedules).omit({
  id: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
});

// TypeScript types
export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;

export type LearningSchedule = typeof learningSchedules.$inferSelect;
export type InsertLearningSchedule = z.infer<typeof insertLearningScheduleSchema>;

export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;

// Detailed schedule structure types
export interface Task {
  title: string;
  duration: string;
  details?: string[];
  taskId?: string; // unique identifier for completion tracking
}

export interface DayPlan {
  dayOfWeek: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
  tasks: Task[];
}

export interface WeekPlan {
  weekNumber: number;
  goal: string;
  days: DayPlan[];
}

export interface MonthPlan {
  monthNumber: number;
  goal: string;
  weeks: WeekPlan[];
}

export interface ScheduleData {
  months: MonthPlan[];
  totalWeeks: number;
}

// Onboarding question options
export const LANGUAGE_OPTIONS = [
  { value: "japanese", label: "일본어", flag: "🇯🇵" },
  { value: "english", label: "영어", flag: "🇺🇸" },
  { value: "chinese", label: "중국어", flag: "🇨🇳" },
  { value: "spanish", label: "스페인어", flag: "🇪🇸" },
  { value: "french", label: "프랑스어", flag: "🇫🇷" },
  { value: "other", label: "기타", flag: "🌐" },
];

export const LEVEL_OPTIONS = [
  { value: "absolute_beginner", label: "완전 초보" },
  { value: "basic_reading", label: "기본 문자 읽기 가능" },
  { value: "basic_conversation", label: "간단한 회화 가능" },
  { value: "intermediate", label: "중급 (시험 준비 중)" },
];

export const GOAL_OPTIONS = [
  { value: "travel", label: "여행 회화" },
  { value: "business", label: "업무 활용" },
  { value: "exam", label: "시험 합격 (JLPT N3 등)" },
  { value: "media", label: "원서/영상 이해" },
];

export const DEADLINE_OPTIONS = [
  { value: "1month", label: "1개월" },
  { value: "3months", label: "3개월" },
  { value: "6months", label: "6개월" },
  { value: "flexible", label: "천천히" },
];

export const DAILY_TIME_OPTIONS = [
  { value: "30min", label: "30분" },
  { value: "1hour", label: "1시간" },
  { value: "2hours", label: "2시간 이상" },
];

export const LEARNING_STYLE_OPTIONS = [
  { value: "grammar", label: "문법 중심 (체계적)" },
  { value: "conversation", label: "회화 중심 (실용적)" },
  { value: "listening_reading", label: "듣기/독해 중심" },
  { value: "balanced", label: "골고루" },
];

export const WEAKNESS_OPTIONS = [
  { value: "listening", label: "듣기" },
  { value: "speaking", label: "말하기" },
  { value: "reading", label: "읽기" },
  { value: "writing", label: "쓰기" },
];
