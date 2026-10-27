// Unit Grade & Mastery calculation

import type { LetterGrade, MasteryLevel, UnitProgress } from "@/types";

export const WEIGHTS = {
  quizzes: 0.30,
  flashcards: 0.20,
  tests: 0.40,
  activities: 0.10,
} as const;

export function calculateUnitScore(input: {
  quizAverage: number | null;
  flashcardAccuracy: number | null;
  testScore: number | null;
  activityScore: number | null;
}): number | null {
  const { quizAverage, flashcardAccuracy, testScore, activityScore } = input;

  // Need at least one graded component
  const hasAny =
    quizAverage !== null ||
    flashcardAccuracy !== null ||
    testScore !== null ||
    activityScore !== null;

  if (!hasAny) return null;

  // Use 0 for missing components so the weighted sum still works,
  // but renormalize weights based on what is present.
  let totalWeight = 0;
  let weightedSum = 0;

  if (quizAverage !== null) {
    weightedSum += quizAverage * WEIGHTS.quizzes;
    totalWeight += WEIGHTS.quizzes;
  }
  if (flashcardAccuracy !== null) {
    weightedSum += flashcardAccuracy * WEIGHTS.flashcards;
    totalWeight += WEIGHTS.flashcards;
  }
  if (testScore !== null) {
    weightedSum += testScore * WEIGHTS.tests;
    totalWeight += WEIGHTS.tests;
  }
  if (activityScore !== null) {
    weightedSum += activityScore * WEIGHTS.activities;
    totalWeight += WEIGHTS.activities;
  }

  if (totalWeight === 0) return null;
  return Math.round((weightedSum / totalWeight) * 10) / 10;
}

export function getLetterGrade(score: number | null): LetterGrade | null {
  if (score === null) return null;
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

export function getMasteryLevel(score: number | null): MasteryLevel | null {
  if (score === null) return null;
  if (score >= 90) return "mastered";
  if (score >= 80) return "almost_mastered";
  if (score >= 70) return "developing";
  return "needs_review";
}

export function masteryLabel(level: MasteryLevel | null): string {
  switch (level) {
    case "mastered":
      return "Mastered";
    case "almost_mastered":
      return "Almost Mastered";
    case "developing":
      return "Developing";
    case "needs_review":
      return "Needs Review";
    default:
      return "Not Started";
  }
}

export function letterColor(grade: LetterGrade | null): string {
  switch (grade) {
    case "A":
      return "text-emerald-400";
    case "B":
      return "text-blue-400";
    case "C":
      return "text-yellow-400";
    case "D":
      return "text-orange-400";
    case "F":
      return "text-red-400";
    default:
      return "text-zinc-400";
  }
}

export function buildUnitProgress(
  partial: Partial<UnitProgress> & { userId: string; unitId: string; subject: string }
): UnitProgress {
  const overall = calculateUnitScore({
    quizAverage: partial.quizAverage ?? null,
    flashcardAccuracy: partial.flashcardAccuracy ?? null,
    testScore: partial.testScore ?? null,
    activityScore: partial.activityScore ?? null,
  });

  return {
    userId: partial.userId,
    unitId: partial.unitId,
    subject: partial.subject,
    quizAverage: partial.quizAverage ?? null,
    flashcardAccuracy: partial.flashcardAccuracy ?? null,
    testScore: partial.testScore ?? null,
    activityScore: partial.activityScore ?? null,
    overallScore: overall,
    letterGrade: getLetterGrade(overall),
    masteryLevel: getMasteryLevel(overall),
    quizzesCompleted: partial.quizzesCompleted ?? 0,
    totalQuizzes: partial.totalQuizzes ?? 0,
    topicsNeedingReview: partial.topicsNeedingReview ?? [],
    lastUpdated: new Date().toISOString(),
    status: overall === null ? "not_started" : overall >= 90 ? "completed" : "in_progress",
  };
}
