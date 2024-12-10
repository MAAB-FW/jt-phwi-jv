"use client";

interface Tutorial {
  id: number;
  title: string;
  videoId: string;
}

const tutorials: Tutorial[] = [
  {
    id: 1,
    title: "Japanese Alphabet - Hiragana Made Easy",
    videoId: "wD3FJgij79c",
  },
  {
    id: 2,
    title: "Learning Japanese is Easy... Here's How",
    videoId: "T09w34WME5Q",
  },
  {
    id: 3,
    title: "How I became fluent in Japanese | Kanji",
    videoId: "4CvoPRZsejc",
  },
  {
    id: 4,
    title: "Watch this before studying Japanese",
    videoId: "4MNnv5hsfYw",
  },
  {
    id: 5,
    title: "Is Duolingo Really a Good Way to Study Japanese?",
    videoId: "j1fNAA8mdFY",
  },
  {
    id: 6,
    title: "10 JAPANESE Phrases Every Traveler Should Know (Basic Japanese)",
    videoId: "UJR5rm9HhTA",
  },
  {
    id: 7,
    title:
      "150 basic Japanese phrases: You can learn it completely in 20 minutes. #learnjapanese #beginners",
    videoId: "G_oC7anVuA8",
  },
  {
    id: 8,
    title: "Basic Kanji Characters",
    videoId: "mPppVDX_GiY",
  },
];

export default function TutorialsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Japanese Language Tutorials</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {tutorials.map((tutorial) => (
          <div
            key={tutorial.id}
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
              <h2 className="mb-2 text-xl font-semibold">{tutorial.title}</h2>
              {/* <p className="text-gray-600">{tutorial.description}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
