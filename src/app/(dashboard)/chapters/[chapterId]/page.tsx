import { notFound } from "next/navigation";
import Link from "next/link";
import { getChapter } from "@/data/chapters";
import { getSession } from "@/lib/auth";
import { getProgressForUser } from "@/lib/store";
import { letterColor, masteryLabel } from "@/lib/grades";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ chapterId: string }>;
}) {
  const { chapterId } = await params;
  const chapter = getChapter(chapterId);
  if (!chapter) notFound();

  const session = await getSession();
  const progress = session ? await getProgressForUser(session.userId) : [];

  return (
    <div>
      <div className="mb-2 text-sm text-[var(--text-muted)]">
        Chapter {chapter.number}
      </div>
      <h1 className="text-2xl font-bold mb-2">{chapter.title}</h1>
      <p className="text-[var(--text-muted)] mb-8 max-w-2xl">{chapter.description}</p>

      <div className="grid grid-cols-1 gap-4">
        {chapter.units.map((unit) => {
          const p = progress.find((pr) => pr.unitId === unit.id);
          const score = p?.overallScore;
          const grade = p?.letterGrade;
          const mastery = p?.masteryLevel;

          return (
            <div key={unit.id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-blue-400">
                      {unit.number}
                    </span>
                    {grade && (
                      <span className={`text-sm font-bold ${letterColor(grade)}`}>
                        {score}% — {grade}
                      </span>
                    )}
                  </div>
                  <h2 className="font-semibold text-lg">{unit.title}</h2>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {unit.topics.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--text-muted)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs text-[var(--text-muted)] mb-1">
                    {masteryLabel(mastery ?? null)}
                  </div>
                  {/* Progress bar */}
                  <div className="w-32 h-2 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-500 transition-all"
                      style={{ width: `${score ?? 0}%` }}
                    />
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">
                    Quizzes: {p?.quizzesCompleted ?? 0}/{unit.totalQuizzes}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href={`/chapters/${chapterId}/unit/${unit.id}/quiz`}
                  className="btn-primary text-sm py-1.5 px-3"
                >
                  Practice Quiz
                </Link>
                <Link
                  href={`/chapters/${chapterId}/unit/${unit.id}/notes`}
                  className="btn-ghost text-sm py-1.5 px-3"
                >
                  Notes
                </Link>
                <Link
                  href={`/chapters/${chapterId}/unit/${unit.id}/flashcards`}
                  className="btn-ghost text-sm py-1.5 px-3"
                >
                  Flashcards
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
