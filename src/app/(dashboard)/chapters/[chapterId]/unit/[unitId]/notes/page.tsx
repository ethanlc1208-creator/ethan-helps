import { getUnit, getChapter } from "@/data/chapters";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function NotesPage({
  params,
}: {
  params: Promise<{ chapterId: string; unitId: string }>;
}) {
  const { chapterId, unitId } = await params;
  const unit = getUnit(unitId);
  const chapter = getChapter(chapterId);
  if (!unit || !chapter) notFound();

  const notes: Record<string, { title: string; content: string }[]> = {
    "7.1": [
      { title: "Polygon Interior Angles Theorem", content: "The sum of the interior angles of a convex n-gon is (n − 2) × 180°. Each interior angle of a regular n-gon is (n − 2) × 180° / n." },
      { title: "Polygon Exterior Angles Theorem", content: "The sum of one exterior angle from each vertex of any convex polygon is 360°. Each exterior angle of a regular n-gon is 360° / n." },
    ],
    "7.2": [
      { title: "Properties of Parallelograms", content: "In a parallelogram: opposite sides are congruent and parallel; opposite angles are congruent; consecutive angles are supplementary; diagonals bisect each other." },
    ],
    "7.3": [
      { title: "Five Ways to Prove a Parallelogram", content: "1) Both pairs of opposite sides parallel. 2) Both pairs of opposite sides congruent. 3) Both pairs of opposite angles congruent. 4) One pair of opposite sides both congruent and parallel. 5) Diagonals bisect each other." },
    ],
    "7.4": [
      { title: "Special Parallelograms", content: "Rhombus: all sides congruent; diagonals perpendicular and bisect angles. Rectangle: four right angles; diagonals congruent. Square: both a rhombus and a rectangle." },
    ],
    "7.5": [
      { title: "Trapezoids and Kites", content: "Trapezoid: exactly one pair of parallel sides. Midsegment = (b₁ + b₂) / 2. Isosceles trapezoid: legs congruent → base angles congruent, diagonals congruent. Kite: two pairs of consecutive congruent sides; diagonals perpendicular." },
    ],
    "8.1": [
      { title: "Similar Polygons", content: "Two polygons are similar if corresponding angles are congruent and corresponding side lengths are proportional. Scale factor = ratio of corresponding sides. Perimeter ratio = scale factor; area ratio = (scale factor)²." },
    ],
    "8.2": [
      { title: "AA Similarity", content: "If two angles of one triangle are congruent to two angles of another triangle, then the triangles are similar (AA Similarity Theorem)." },
    ],
  };

  const unitNotes = notes[unitId] || [
    { title: unit.title, content: "Detailed notes for this unit are being added. Check back soon." },
  ];

  return (
    <div className="max-w-2xl">
      <div className="text-sm text-[var(--text-muted)] mb-1">
        Chapter {chapter.number} · {unit.number}
      </div>
      <h1 className="text-2xl font-bold mb-6">{unit.title} — Notes</h1>
      <div className="space-y-4">
        {unitNotes.map((n) => (
          <div key={n.title} className="card p-5">
            <h2 className="font-semibold mb-2">{n.title}</h2>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">{n.content}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link href={`/chapters/${chapterId}`} className="btn-ghost text-sm">
          ← Back to chapter
        </Link>
      </div>
    </div>
  );
}
