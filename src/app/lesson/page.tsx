"use client";

import { getLessons, getVocabularyCountALesson } from "@/services/getData";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { JSX } from "react";

interface Lesson {
  lessonNo: number;
  name: string;
  description: string;
}

// const lessons: Lesson[] = [
//   {
//     lessonNo: 1,
//     name: "Basic Greetings",
//     description: "Essential Japanese greetings for daily conversations",
//   },
//   {
//     lessonNo: 2,
//     name: "Numbers and Counting",
//     description: "Learn to count and use numbers in Japanese",
//   },
//   {
//     lessonNo: 3,
//     name: "Family Members",
//     description: "Vocabulary for family relationships",
//   },
//   {
//     lessonNo: 4,
//     name: "Food and Drinks",
//     description: "Common words for Japanese cuisine and beverages",
//   },
//   {
//     lessonNo: 5,
//     name: "Weather and Seasons",
//     description: "Vocabulary for describing weather and seasons",
//   },
//   {
//     lessonNo: 6,
//     name: "Transportation",
//     description: "Words related to getting around in Japan",
//   },
// ];

export default function LessonsPage() {
  // const router = useRouter();

  const { data: lessons = [], isLoading } = useQuery<Lesson[]>({
    queryKey: ["get-lessons"],
    queryFn: async () => {
      const { lessons } = await getLessons();
      return lessons;
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Japanese Vocabulary Lessons</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <>
            <div className="group relative animate-pulse overflow-hidden rounded-xl bg-white p-1 shadow-md">
              <div className="space-y-3 rounded-lg bg-gradient-to-br from-white to-gray-50 p-6">
                <div className="flex items-start justify-between">
                  <div className="h-6 w-1/2 rounded bg-gray-200"></div>
                  <div className="h-4 w-1/4 rounded bg-gray-200"></div>
                </div>
                <div className="mt-1 h-6 w-full rounded bg-gray-200"></div>
                <div className="h-6 w-full rounded bg-gray-200 pt-2"></div>
              </div>
            </div>
            <div className="group relative animate-pulse overflow-hidden rounded-xl bg-white p-1 shadow-md">
              <div className="space-y-3 rounded-lg bg-gradient-to-br from-white to-gray-50 p-6">
                <div className="flex items-start justify-between">
                  <div className="h-6 w-1/2 rounded bg-gray-200"></div>
                  <div className="h-4 w-1/4 rounded bg-gray-200"></div>
                </div>
                <div className="mt-1 h-6 w-full rounded bg-gray-200"></div>
                <div className="h-6 w-full rounded bg-gray-200 pt-2"></div>
              </div>
            </div>
            <div className="group relative animate-pulse overflow-hidden rounded-xl bg-white p-1 shadow-md">
              <div className="space-y-3 rounded-lg bg-gradient-to-br from-white to-gray-50 p-6">
                <div className="flex items-start justify-between">
                  <div className="h-6 w-1/2 rounded bg-gray-200"></div>
                  <div className="h-4 w-1/4 rounded bg-gray-200"></div>
                </div>
                <div className="mt-1 h-6 w-full rounded bg-gray-200"></div>
                <div className="h-6 w-full rounded bg-gray-200 pt-2"></div>
              </div>
            </div>
          </>
        ) : (
          <>
            {lessons.map((lesson) => (
              <Link
                href={`/lesson/${lesson.lessonNo}`}
                key={lesson.lessonNo}
                className="group relative cursor-pointer overflow-hidden rounded-xl bg-white p-1 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="space-y-3 rounded-lg bg-gradient-to-br from-white to-gray-50 p-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600">
                      {lesson.name}
                    </h2>
                    <span className="text-nowrap rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-600">
                      Lesson {lesson.lessonNo}
                    </span>
                  </div>
                  <p className="text-gray-600">{lesson.description}</p>
                  <div className="pt-2">
                    <VC lessonNo={lesson.lessonNo} />
                  </div>
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function VC({ lessonNo }: { lessonNo: number }): JSX.Element {
  const { data: count = 0 } = useQuery({
    queryKey: ["get-vocabulary-count", lessonNo],
    queryFn: async () => {
      const { count } = await getVocabularyCountALesson(lessonNo);
      return count;
    },
  });

  return (
    <p className="mt-2 font-medium text-gray-600">
      Vocabulary Count: <span className="text-indigo-600">{count}</span>
    </p>
  );
}
