import { getSession } from "@/lib/auth";
import { getProgressForUser, getAnnouncements } from "@/lib/store";
import { chapters } from "@/data/chapters";
import { masteryLabel, letterColor } from "@/lib/grades";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) return null;

  const progress = await getProgressForUser(session.userId);
  const announcements = (await getAnnouncements()).slice(0, 5);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">
        Welcome back, {session.displayName}
      </h1>
      <p className="text-[var(--text-muted)] text-sm mb-8">
        Your Geometry progress at a glance
      </p>

      {/* Tier badge */}
      <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold capitalize">
        Ethan&apos;s {session.tier} Plan
      </div>

      {/* Chapters overview */}
      <h2 className="text-lg font-semibold mb-4">Your Units</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {chapters.map((ch) => (
          <Link
            key={ch.id}
            href={`/chapters/${ch.id}`}
            className="card p-5 hover:border-blue-500/40 transition-colors block"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="text-xs text-[var(--text-muted)] font-medium">
                  Chapter {ch.number}
                </div>
                <h3 className="font-semibold">{ch.title}</h3>
              </div>
              <span className="text-xs bg-[var(--bg-elevated)] px-2 py-1 rounded">
                {ch.units.length} units
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)] line-clamp-2">
              {ch.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {ch.units.map((u) => {
                const p = progress.find((pr) => pr.unitId === u.id);
                return (
                  <span
                    key={u.id}
                    className={`text-xs px-2 py-0.5 rounded border border-[var(--border)] ${
                      p?.letterGrade
                        ? letterColor(p.letterGrade)
                        : "text-[var(--text-muted)]"
                    }`}
                  >
                    {u.number}
                    {p?.letterGrade ? ` · ${p.letterGrade}` : ""}
                  </span>
                );
              })}
            </div>
          </Link>
        ))}
      </div>

      {/* Announcements */}
      <h2 className="text-lg font-semibold mb-4">Announcements</h2>
      {announcements.length === 0 ? (
        <div className="card p-5 text-sm text-[var(--text-muted)]">
          No announcements yet.
        </div>
      ) : (
        <div className="space-y-3">
          {announcements.map((a) => (
            <div key={a.id} className="card p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold uppercase text-blue-400">
                  {a.category}
                </span>
                {a.pinned && (
                  <span className="text-xs text-amber-400">Pinned</span>
                )}
              </div>
              <h3 className="font-medium">{a.title}</h3>
              <p className="text-sm text-[var(--text-muted)] mt-1">{a.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
