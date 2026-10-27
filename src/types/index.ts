// Ethan Helps - Core Types

export type Role = "owner" | "staff" | "student";
export type SubscriptionTier = "basic" | "premium" | "platinum";
export type MasteryLevel = "mastered" | "almost_mastered" | "developing" | "needs_review";
export type LetterGrade = "A" | "B" | "C" | "D" | "F";

export interface User {
  id: string;
  email: string;
  username: string;
  passwordHash: string;
  role: Role;
  tier: SubscriptionTier;
  displayName: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  lastLoginAt?: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  category: "general" | "important" | "urgent" | "assignment" | "system";
  priority: "low" | "normal" | "high" | "critical";
  createdBy: string;
  createdAt: string;
  scheduledFor?: string;
  expiresAt?: string;
  pinned: boolean;
  target: "all" | "students" | "staff" | string[]; // user ids or "all"
  readBy: string[];
}

export interface QuizAttempt {
  id: string;
  userId: string;
  unitId: string;
  quizId: string;
  score: number; // 0-100
  totalQuestions: number;
  correctCount: number;
  completedAt: string;
  answers: Record<string, string | number>;
}

export interface FlashcardSession {
  id: string;
  userId: string;
  unitId: string;
  accuracy: number; // 0-100
  cardsReviewed: number;
  correctCount: number;
  completedAt: string;
}

export interface TestAttempt {
  id: string;
  userId: string;
  unitId: string;
  testId: string;
  score: number; // 0-100
  completedAt: string;
  isRetake: boolean;
  previousScore?: number;
}

export interface ActivityCompletion {
  id: string;
  userId: string;
  unitId: string;
  activityId: string;
  score: number; // 0-100
  completedAt: string;
}

export interface UnitProgress {
  userId: string;
  unitId: string;
  subject: string;
  quizAverage: number | null;
  flashcardAccuracy: number | null;
  testScore: number | null;
  activityScore: number | null;
  overallScore: number | null;
  letterGrade: LetterGrade | null;
  masteryLevel: MasteryLevel | null;
  quizzesCompleted: number;
  totalQuizzes: number;
  topicsNeedingReview: string[];
  lastUpdated: string;
  status: "not_started" | "in_progress" | "completed";
}

export interface GoalPlan {
  id: string;
  userId: string;
  unitId: string;
  goalGrade: number; // e.g. 90, 95, 100
  testDate: string;
  createdAt: string;
  updatedAt: string;
  dailyTasks: DailyTask[];
  readinessEstimate: number | null;
}

export interface DailyTask {
  id: string;
  date: string;
  title: string;
  type: "topic" | "flashcards" | "quiz" | "review" | "practice";
  topicIds?: string[];
  completed: boolean;
  estimatedMinutes: number;
}

// Content types
export interface Chapter {
  id: string;
  number: number;
  title: string;
  description: string;
  units: Unit[];
}

export interface Unit {
  id: string;
  chapterId: string;
  number: string; // e.g. "7.1"
  title: string;
  topics: string[];
  totalQuizzes: number;
}

export interface QuizQuestion {
  id: string;
  type: "multiple_choice" | "short_answer" | "true_false";
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  topic: string;
}
