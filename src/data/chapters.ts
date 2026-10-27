import type { Chapter, QuizQuestion } from "@/types";

export const chapters: Chapter[] = [
  {
    id: "ch7",
    number: 7,
    title: "Quadrilaterals and Other Polygons",
    description:
      "Angles of polygons, properties of parallelograms, special parallelograms, trapezoids, and kites.",
    units: [
      {
        id: "7.1",
        chapterId: "ch7",
        number: "7.1",
        title: "Angles of Polygons",
        topics: [
          "Interior angle sum",
          "Exterior angle sum",
          "Regular polygons",
          "Finding number of sides",
        ],
        totalQuizzes: 3,
      },
      {
        id: "7.2",
        chapterId: "ch7",
        number: "7.2",
        title: "Properties of Parallelograms",
        topics: [
          "Opposite sides congruent",
          "Opposite angles congruent",
          "Consecutive angles supplementary",
          "Diagonals bisect each other",
        ],
        totalQuizzes: 3,
      },
      {
        id: "7.3",
        chapterId: "ch7",
        number: "7.3",
        title: "Proving a Quadrilateral Is a Parallelogram",
        topics: [
          "Five ways to prove",
          "Coordinate proofs",
          "Using midpoints",
          "Using slopes and distances",
        ],
        totalQuizzes: 2,
      },
      {
        id: "7.4",
        chapterId: "ch7",
        number: "7.4",
        title: "Properties of Special Parallelograms",
        topics: ["Rhombus", "Rectangle", "Square", "Hierarchy of quadrilaterals"],
        totalQuizzes: 3,
      },
      {
        id: "7.5",
        chapterId: "ch7",
        number: "7.5",
        title: "Properties of Trapezoids and Kites",
        topics: [
          "Isosceles trapezoid",
          "Trapezoid midsegment theorem",
          "Kite properties",
          "Base angles",
        ],
        totalQuizzes: 3,
      },
    ],
  },
  {
    id: "ch8",
    number: 8,
    title: "Similarity",
    description:
      "Similar polygons, triangle similarity theorems (AA, SSS, SAS), and proportionality theorems.",
    units: [
      {
        id: "8.1",
        chapterId: "ch8",
        number: "8.1",
        title: "Similar Polygons",
        topics: [
          "Definition of similar polygons",
          "Scale factor",
          "Corresponding angles and sides",
          "Perimeter and area ratios",
        ],
        totalQuizzes: 3,
      },
      {
        id: "8.2",
        chapterId: "ch8",
        number: "8.2",
        title: "Proving Triangle Similarity by AA",
        topics: ["AA Similarity Theorem", "Using parallel lines", "Indirect measurement"],
        totalQuizzes: 2,
      },
      {
        id: "8.3",
        chapterId: "ch8",
        number: "8.3",
        title: "Proving Triangle Similarity by SSS and SAS",
        topics: ["SSS Similarity Theorem", "SAS Similarity Theorem", "Comparing theorems"],
        totalQuizzes: 2,
      },
      {
        id: "8.4",
        chapterId: "ch8",
        number: "8.4",
        title: "Proportionality Theorems",
        topics: [
          "Triangle Proportionality Theorem",
          "Three or more parallel lines",
          "Triangle Angle Bisector Theorem",
        ],
        totalQuizzes: 3,
      },
    ],
  },
];

// Sample quiz questions for Chapter 7
export const quizQuestions: Record<string, QuizQuestion[]> = {
  "7.1": [
    {
      id: "7.1-q1",
      type: "multiple_choice",
      question: "What is the sum of the interior angles of a convex 15-gon?",
      options: ["2340°", "2700°", "2160°", "2520°"],
      correctAnswer: "2340°",
      explanation: "(15 − 2) × 180° = 13 × 180° = 2340°",
      topic: "Interior angle sum",
    },
    {
      id: "7.1-q2",
      type: "multiple_choice",
      question: "Each exterior angle of a regular 18-gon measures:",
      options: ["15°", "18°", "20°", "24°"],
      correctAnswer: "20°",
      explanation: "360° / 18 = 20°",
      topic: "Exterior angle sum",
    },
    {
      id: "7.1-q3",
      type: "multiple_choice",
      question: "The sum of the interior angles of a polygon is 1980°. How many sides does it have?",
      options: ["11", "12", "13", "14"],
      correctAnswer: "13",
      explanation: "(n − 2) × 180 = 1980 → n − 2 = 11 → n = 13",
      topic: "Finding number of sides",
    },
    {
      id: "7.1-q4",
      type: "multiple_choice",
      question: "Each interior angle of a regular nonagon (9-gon) measures:",
      options: ["120°", "135°", "140°", "144°"],
      correctAnswer: "140°",
      explanation: "(9 − 2) × 180° / 9 = 1260° / 9 = 140°",
      topic: "Regular polygons",
    },
    {
      id: "7.1-q5",
      type: "true_false",
      question: "The sum of the exterior angles of any convex polygon is always 360°.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "This is the Polygon Exterior Angles Theorem.",
      topic: "Exterior angle sum",
    },
  ],
  "7.2": [
    {
      id: "7.2-q1",
      type: "multiple_choice",
      question: "In parallelogram ABCD, if m∠A = 70°, then m∠C =",
      options: ["70°", "110°", "140°", "180°"],
      correctAnswer: "70°",
      explanation: "Opposite angles of a parallelogram are congruent.",
      topic: "Opposite angles congruent",
    },
    {
      id: "7.2-q2",
      type: "multiple_choice",
      question: "In parallelogram ABCD, if m∠A = 70°, then m∠B =",
      options: ["70°", "110°", "140°", "180°"],
      correctAnswer: "110°",
      explanation: "Consecutive angles of a parallelogram are supplementary.",
      topic: "Consecutive angles supplementary",
    },
    {
      id: "7.2-q3",
      type: "true_false",
      question: "The diagonals of a parallelogram always bisect each other.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "This is one of the key properties of parallelograms.",
      topic: "Diagonals bisect each other",
    },
  ],
  "7.4": [
    {
      id: "7.4-q1",
      type: "multiple_choice",
      question: "A parallelogram with perpendicular diagonals must be a:",
      options: ["Rectangle", "Rhombus", "Square", "Trapezoid"],
      correctAnswer: "Rhombus",
      explanation: "Perpendicular diagonals are a defining property of a rhombus.",
      topic: "Rhombus",
    },
    {
      id: "7.4-q2",
      type: "multiple_choice",
      question: "A parallelogram with congruent diagonals must be a:",
      options: ["Rhombus", "Rectangle", "Kite", "Trapezoid"],
      correctAnswer: "Rectangle",
      explanation: "Congruent diagonals characterize a rectangle.",
      topic: "Rectangle",
    },
    {
      id: "7.4-q3",
      type: "true_false",
      question: "Every square is a rhombus.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "A square has all sides congruent, so it is a rhombus (and also a rectangle).",
      topic: "Hierarchy of quadrilaterals",
    },
  ],
  "7.5": [
    {
      id: "7.5-q1",
      type: "multiple_choice",
      question: "The midsegment of a trapezoid with bases 10 and 18 has length:",
      options: ["8", "14", "28", "4"],
      correctAnswer: "14",
      explanation: "Midsegment = (10 + 18) / 2 = 14",
      topic: "Trapezoid midsegment theorem",
    },
    {
      id: "7.5-q2",
      type: "multiple_choice",
      question: "The diagonals of a kite are always:",
      options: ["Congruent", "Parallel", "Perpendicular", "Bisecting each other"],
      correctAnswer: "Perpendicular",
      explanation: "One of the key properties of a kite is that its diagonals are perpendicular.",
      topic: "Kite properties",
    },
  ],
  "8.1": [
    {
      id: "8.1-q1",
      type: "multiple_choice",
      question: "If two polygons are similar with scale factor 3:5, the ratio of their perimeters is:",
      options: ["3:5", "9:25", "5:3", "1:1"],
      correctAnswer: "3:5",
      explanation: "The ratio of perimeters equals the scale factor.",
      topic: "Perimeter and area ratios",
    },
    {
      id: "8.1-q2",
      type: "multiple_choice",
      question: "If two similar triangles have scale factor 2:3, the ratio of their areas is:",
      options: ["2:3", "4:9", "3:2", "8:27"],
      correctAnswer: "4:9",
      explanation: "Area ratio is the square of the scale factor.",
      topic: "Perimeter and area ratios",
    },
  ],
  "8.2": [
    {
      id: "8.2-q1",
      type: "true_false",
      question: "AA Similarity requires two pairs of congruent corresponding angles.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "That is exactly the AA Similarity Theorem.",
      topic: "AA Similarity Theorem",
    },
  ],
};

export function getChapter(id: string) {
  return chapters.find((c) => c.id === id);
}

export function getUnit(unitId: string) {
  for (const ch of chapters) {
    const unit = ch.units.find((u) => u.id === unitId);
    if (unit) return unit;
  }
  return null;
}

export function getQuestionsForUnit(unitId: string): QuizQuestion[] {
  return quizQuestions[unitId] || [];
}
