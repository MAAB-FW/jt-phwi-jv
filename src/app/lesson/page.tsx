"use client";

import { getLessons } from "@/services/getData";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

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

  const { data: lessons = [] } = useQuery<Lesson[]>({
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
        {lessons.map((lesson) => (
          <Link
            href={`/lesson/lesson-${lesson.lessonNo}`}
            key={lesson.lessonNo}
            className="cursor-pointer rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
            // onClick={() => router.push(`/lesson/${lesson.id}`)}
          >
            <div className="space-y-2 p-6">
              <h2 className="text-xl font-semibold">
                Lesson {lesson.lessonNo}: {lesson.name}
              </h2>
              <p className="text-gray-600">{lesson.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
