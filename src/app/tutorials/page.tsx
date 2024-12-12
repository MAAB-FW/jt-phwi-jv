"use client";

import { getAllTutorials } from "@/services/getData";
import { useQuery } from "@tanstack/react-query";

interface Tutorial {
  _id: string;
  title: string;
  videoId: string;
}

// const tutorials: Tutorial[] = [
//   {
//     id: 1,
//     title: "Japanese Alphabet - Hiragana Made Easy",
//     videoId: "wD3FJgij79c",
//   },
//   {
//     id: 2,
//     title: "Learning Japanese is Easy... Here's How",
//     videoId: "T09w34WME5Q",
//   },
//   {
//     id: 3,
//     title: "How I became fluent in Japanese | Kanji",
//     videoId: "4CvoPRZsejc",
//   },
//   {
//     id: 4,
//     title: "Watch this before studying Japanese",
//     videoId: "4MNnv5hsfYw",
//   },
//   {
//     id: 5,
//     title: "Is Duolingo Really a Good Way to Study Japanese?",
//     videoId: "j1fNAA8mdFY",
//   },
//   {
//     id: 6,
//     title: "10 JAPANESE Phrases Every Traveler Should Know (Basic Japanese)",
//     videoId: "UJR5rm9HhTA",
//   },
//   {
//     id: 7,
//     title:
//       "150 basic Japanese phrases: You can learn it completely in 20 minutes. #learnjapanese #beginners",
//     videoId: "G_oC7anVuA8",
//   },
//   {
//     id: 8,
//     title: "Lesson 1. Learn Japanese in Urdu and Hindi",
//     videoId: "IhUeEh10Xfs",
//   },
// ];

export default function TutorialsPage() {
  const { data: tutorials = [], isLoading } = useQuery<Tutorial[]>({
    queryKey: ["tutorials"],
    queryFn: async () => {
      const { tutorials } = await getAllTutorials();
      return tutorials;
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Japanese Language Tutorials</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {isLoading ? (
          <>
            <div className="animate-pulse overflow-hidden rounded-lg bg-white shadow-lg">
              <div className="relative h-0 pb-[56.25%]">
                <div className="absolute left-0 top-0 h-full w-full bg-gray-200"></div>
              </div>
              <div className="p-6">
                <div className="mb-2 h-6 w-3/4 rounded bg-gray-200"></div>
                <div className="mb-1 h-4 w-full rounded bg-gray-200"></div>
                <div className="h-4 w-1/2 rounded bg-gray-200"></div>
              </div>
            </div>
            <div className="animate-pulse overflow-hidden rounded-lg bg-white shadow-lg">
              <div className="relative h-0 pb-[56.25%]">
                <div className="absolute left-0 top-0 h-full w-full bg-gray-200"></div>
              </div>
              <div className="p-6">
                <div className="mb-2 h-6 w-3/4 rounded bg-gray-200"></div>
                <div className="mb-1 h-4 w-full rounded bg-gray-200"></div>
                <div className="h-4 w-1/2 rounded bg-gray-200"></div>
              </div>
            </div>
          </>
        ) : (
          <>
            {tutorials.length === 0 ? (
              <div className="col-span-2 flex h-[90vh] items-center justify-center text-center text-gray-500">
                No tutorials available
              </div>
            ) : (
              tutorials?.map((tutorial) => (
                <div
                  key={tutorial._id}
                  className="overflow-hidden rounded-lg bg-white shadow-lg"
                >
                  <div className="relative h-0 pb-[56.25%]">
                    <iframe
                      className="absolute left-0 top-0 h-full w-full"
                      src={`https://www.youtube.com/embed/${tutorial.videoId}`}
                      title={tutorial.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="mb-2 text-xl font-semibold">
                      {tutorial.title}
                    </h2>
                    {/* <p className="text-gray-600">{tutorial.description}</p> */}
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}
