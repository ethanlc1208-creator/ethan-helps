import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { saveQuizAttempt, getQuizAttempts, upsertProgress, getProgressForUser } from "@/lib/store";
import { buildUnitProgress } from "@/lib/grades";
import { getUnit } from "@/data/chapters";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { unitId, score, totalQuestions, correctCount, answers } = body;

  await saveQuizAttempt({
    id: randomUUID(),
    userId: session.userId,
    unitId,
    quizId: `${unitId}-practice`,
    score,
    totalQuestions,
    correctCount,
    completedAt: new Date().toISOString(),
    answers: answers || {},
  });

  // Recalculate unit progress
  const attempts = await getQuizAttempts(session.userId, unitId);
  const quizAverage =
    attempts.length > 0
      ? attempts.reduce((s, a) => s + a.score, 0) / attempts.length
      : null;

  const unit = getUnit(unitId);
  const existing = (await getProgressForUser(session.userId)).find(
    (p) => p.unitId === unitId
  );

  const progress = buildUnitProgress({
    userId: session.userId,
    unitId,
    subject: "Geometry",
    quizAverage,
    flashcardAccuracy: existing?.flashcardAccuracy ?? null,
    testScore: existing?.testScore ?? null,
    activityScore: existing?.activityScore ?? null,
    quizzesCompleted: attempts.length,
    totalQuizzes: unit?.totalQuizzes ?? 0,
    topicsNeedingReview: existing?.topicsNeedingReview ?? [],
  });

  await upsertProgress(progress);

  return NextResponse.json({ ok: true, progress });
}
