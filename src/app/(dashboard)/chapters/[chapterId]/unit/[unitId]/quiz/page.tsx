"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Question {
  id: string;
  type: string;
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  topic: string;
}

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const unitId = params.unitId as string;
  const chapterId = params.chapterId as string;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load questions from a simple API or embedded data
    fetch(`/api/quiz/${unitId}`)
      .then((r) => r.json())
      .then((data) => {
        setQuestions(data.questions || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [unitId]);

  function selectAnswer(qId: string, value: string) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  }

  function submit() {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === String(q.correctAnswer)) correct++;
    });
    const pct = questions.length
      ? Math.round((correct / questions.length) * 100)
      : 0;
    setScore(pct);
    setSubmitted(true);

    // Save attempt
    fetch("/api/quiz/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        unitId,
        score: pct,
        totalQuestions: questions.length,
        correctCount: correct,
        answers,
      }),
    }).catch(console.error);
  }

  if (loading) {
    return <p className="text-[var(--text-muted)]">Loading quiz…</p>;
  }

  if (questions.length === 0) {
    return (
      <div>
        <h1 className="text-xl font-bold mb-2">Quiz — Unit {unitId}</h1>
        <p className="text-[var(--text-muted)]">
          No questions available for this unit yet.
        </p>
        <button
          className="btn-ghost mt-4"
          onClick={() => router.push(`/chapters/${chapterId}`)}
        >
          Back to chapter
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-bold mb-1">Practice Quiz</h1>
      <p className="text-sm text-[var(--text-muted)] mb-6">Unit {unitId}</p>

      {submitted && score !== null && (
        <div
          className={`mb-6 card p-4 border ${
            score >= 80
              ? "border-emerald-500/40"
              : score >= 60
              ? "border-yellow-500/40"
              : "border-red-500/40"
          }`}
        >
          <div className="text-2xl font-bold">{score}%</div>
          <div className="text-sm text-[var(--text-muted)]">
            {questions.filter((q) => answers[q.id] === String(q.correctAnswer)).length}{" "}
            of {questions.length} correct
          </div>
        </div>
      )}

      <div className="space-y-6">
        {questions.map((q, i) => {
          const isCorrect = answers[q.id] === String(q.correctAnswer);
          return (
            <div key={q.id} className="card p-5">
              <div className="text-xs text-[var(--text-muted)] mb-1">
                Question {i + 1} · {q.topic}
              </div>
              <p className="font-medium mb-3">{q.question}</p>
              <div className="space-y-2">
                {(q.options || []).map((opt) => {
                  let extra = "";
                  if (submitted) {
                    if (opt === String(q.correctAnswer))
                      extra = "border-emerald-500/50 bg-emerald-500/10";
                    else if (answers[q.id] === opt && !isCorrect)
                      extra = "border-red-500/50 bg-red-500/10";
                  } else if (answers[q.id] === opt) {
                    extra = "border-blue-500 bg-blue-500/10";
                  }
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => selectAnswer(q.id, opt)}
                      className={`w-full text-left px-3 py-2 rounded-lg border border-[var(--border)] text-sm transition-colors ${extra}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {submitted && q.explanation && (
                <p className="mt-3 text-sm text-[var(--text-muted)]">
                  {q.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex gap-3">
        {!submitted ? (
          <button
            className="btn-primary"
            onClick={submit}
            disabled={Object.keys(answers).length < questions.length}
          >
            Submit Quiz
          </button>
        ) : (
          <button
            className="btn-primary"
            onClick={() => {
              setAnswers({});
              setSubmitted(false);
              setScore(null);
            }}
          >
            Retake
          </button>
        )}
        <button
          className="btn-ghost"
          onClick={() => router.push(`/chapters/${chapterId}`)}
        >
          Back to chapter
        </button>
      </div>
    </div>
  );
}
