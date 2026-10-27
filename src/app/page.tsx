import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export default async function HomePage() {
  const session = await getSession();
  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <header className="border-b border-[var(--border)] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-sm">
            EH
          </div>
          <span className="font-semibold text-lg tracking-tight">Ethan Helps</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="btn-ghost text-sm">
            Log in
          </Link>
          <Link href="/login" className="btn-primary text-sm">
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
          Geometry Study Platform
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-3xl leading-tight">
          Master Geometry with{" "}
          <span className="text-blue-400">Ethan Helps</span>
        </h1>
        <p className="mt-5 text-[var(--text-muted)] max-w-xl text-lg">
          Notes, interactive practice, quizzes, tests, flashcards, and personalized
          study plans — all in one clean platform built for real results.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/login" className="btn-primary text-base px-8 py-3">
            Start Studying
          </Link>
          <Link href="/login" className="btn-ghost text-base px-8 py-3">
            Staff Login
          </Link>
        </div>

        {/* Feature cards */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl w-full">
          {[
            {
              title: "Smart Practice",
              desc: "Quizzes, tests, and flashcards that adapt to what you need to review.",
            },
            {
              title: "Grade & Mastery",
              desc: "Clear unit scores, letter grades, and mastery levels based on real performance.",
            },
            {
              title: "Study Plans",
              desc: "Set a goal grade and get a daily plan that focuses on your weak topics.",
            },
          ].map((f) => (
            <div key={f.title} className="card p-5 text-left">
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-[var(--text-muted)]">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-[var(--border)] py-6 text-center text-sm text-[var(--text-muted)]">
        © {new Date().getFullYear()} Ethan Helps · Built for serious geometry students
      </footer>
    </div>
  );
}
