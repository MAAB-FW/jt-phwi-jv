"use client";
import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const Page = ({ params }: { params: Promise<{ lessonNo: string }> }) => {
  return <LessonPage lessonNo={React.use(params).lessonNo}></LessonPage>;
};
export default Page;

// ==================================================

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function LessonPage({ lessonNo }: { lessonNo: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample vocabulary data
  const vocabularyList = [
    {
      lessonNo: 1, // Add lesson number here
      word: "ありがとう",
      meaning: "Thank you",
      pronunciation: "Arigatou",
      whenToSay: "Used to express gratitude",
      example: "ありがとうございます。",
      exampleMeaning: "Thank you very much.",
      adminEmail: "", // Add admin email here
    },
    {
      lessonNo: 1, // Add lesson number here
      word: "こんにちは",
      meaning: "Hello",
      pronunciation: "Konnichiwa",
      whenToSay: "Used as a greeting during daytime",
      example: "こんにちは、元気ですか？",
      exampleMeaning: "Hello, how are you?",
      adminEmail: "", // Add admin email here
    },
    {
      lessonNo: 1, // Add lesson number here
      word: "こんばんは",
      meaning: "Good evening",
      pronunciation: "Konbanwa",
      whenToSay: "Used as a greeting in the evening",
      example: "こんばんは、今日はどうでしたか？",
      exampleMeaning: "Good evening, how was your day?",
      adminEmail: "", // Add admin email here
    },
    {
      lessonNo: 1, // Add lesson number here
      word: "さようなら",
      meaning: "Goodbye",
      pronunciation: "Sayounara",
      whenToSay: "Used to say farewell",
      example: "さようなら、また会いましょう。",
      exampleMeaning: "Goodbye, see you again.",
      adminEmail: "", // Add admin email here
    },
    {
      lessonNo: 1, // Add lesson number here
      word: "おやすみなさい",
      meaning: "Good night",
      pronunciation: "Oyasuminasai",
      whenToSay: "Used to wish someone a good night",
      example: "おやすみなさい、良い夢を。",
      exampleMeaning: "Good night, sweet dreams.",
      adminEmail: "", // Add admin email here
    },
    // Add more vocabulary items as needed
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < vocabularyList.length - 1 ? prev + 1 : prev
    );
  };

  const pronounceWord = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "ja-JP";
    window.speechSynthesis.speak(utterance);
  };

  const currentWord = vocabularyList[currentIndex];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
          Vocabulary Lesson
        </h1>

        <div className="mb-6 rounded-lg bg-white p-6 shadow-lg">
          <div
            className="cursor-pointer rounded-lg p-4 text-center transition-colors hover:bg-gray-50"
            onClick={() => pronounceWord(currentWord.word)}
          >
            <h2 className="mb-2 text-4xl font-bold text-indigo-600">
              {currentWord.word}
            </h2>
            <p className="mb-4 text-xl text-gray-600">
              {currentWord.pronunciation}
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-700">Meaning:</h3>
              <p className="text-gray-600">{currentWord.meaning}</p>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-700">When to Say:</h3>
              <p className="text-gray-600">{currentWord.whenToSay}</p>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-700">Example:</h3>
              <p className="text-gray-600">{currentWord.example}</p>
              <p className="italic text-gray-500">
                {currentWord.exampleMeaning}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`flex items-center rounded-md px-4 py-2 ${
              currentIndex === 0
                ? "cursor-not-allowed bg-gray-200 text-gray-400"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            <FaAngleLeft className="mr-2 h-5 w-5" />
            Previous
          </button>

          <span className="text-gray-600">
            {currentIndex + 1} of {vocabularyList.length}
          </span>

          <button
            onClick={handleNext}
            disabled={currentIndex === vocabularyList.length - 1}
            className={`flex items-center rounded-md px-4 py-2 ${
              currentIndex === vocabularyList.length - 1
                ? "cursor-not-allowed bg-gray-200 text-gray-400"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Next
            <FaAngleRight className="ml-2 h-5 w-5" />
          </button>
        </div>

        <div className="mt-8 rounded-lg bg-yellow-50 p-4">
          <p className="text-sm text-yellow-800">
            <span className="font-bold">Note:</span> If pronunciation doesnt
            work, please install the Japanese language pack in your system
            settings.
          </p>
        </div>
      </div>
    </div>
  );
}
