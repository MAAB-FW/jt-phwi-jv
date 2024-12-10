"use client";

import Link from "next/link";

interface Lesson {
  id: number;
  name: string;
  description: string;
  vocabularyCount: number;
}

const lessons: Lesson[] = [
  {
    id: 1,
    name: "Basic Greetings",
    description: "Essential Japanese greetings for daily conversations",
    vocabularyCount: 15,
  },
  {
    id: 2,
    name: "Numbers and Counting",
    description: "Learn to count and use numbers in Japanese",
    vocabularyCount: 30,
  },
  {
    id: 3,
    name: "Family Members",
    description: "Vocabulary for family relationships",
    vocabularyCount: 20,
  },
  {
    id: 4,
    name: "Food and Drinks",
    description: "Common words for Japanese cuisine and beverages",
    vocabularyCount: 25,
  },
  {
    id: 5,
    name: "Weather and Seasons",
    description: "Vocabulary for describing weather and seasons",
    vocabularyCount: 18,
  },
  {
    id: 6,
    name: "Transportation",
    description: "Words related to getting around in Japan",
    vocabularyCount: 22,
  },
];

export default function LessonsPage() {
  // const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Japanese Vocabulary Lessons</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => (
          <Link
            href={`/lesson/lesson-${lesson.id}`}
            key={lesson.id}
            className="cursor-pointer rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
            // onClick={() => router.push(`/lesson/${lesson.id}`)}
          >
            <div className="p-6">
              <h2 className="mb-2 text-xl font-semibold">
                Lesson {lesson.id}: {lesson.name}
              </h2>
              <p className="mb-4 text-gray-600">{lesson.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span>{lesson.vocabularyCount} words</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
