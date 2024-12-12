"use client";

import { addVucabulary, getAllLessonsNo } from "@/services/getData";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";

export interface VucabularyFormData {
  lessonNo: number;
  word: string;
  meaning: string;
  pronunciation: string;
  whenToSay: string;
  example: string;
  exampleMeaning: string;
  adminMail: string;
}

export default function AddLesson() {
  const { data: session } = useSession();

  const { data: lessonsNos = [] } = useQuery({
    queryKey: ["lessons-no"],
    queryFn: async () => {
      const { lessons } = await getAllLessonsNo();
      return lessons;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VucabularyFormData>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: VucabularyFormData) => {
    data.adminMail = session?.user?.email || "";

    if (
      !data.lessonNo ||
      !data.word ||
      !data.meaning ||
      !data.pronunciation ||
      !data.whenToSay ||
      !data.example ||
      !data.exampleMeaning
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await addVucabulary({
        ...data,
        lessonNo: Number(data.lessonNo),
      });

      if (response.insertedId) {
        toast.success("Vucabulary added successfully!");
        reset();
        setIsLoading(false);
        return;
      }
      toast.error(response.message);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
          Add New Vocabulary
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* First Row - Lesson No and Word side by side */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Lesson Number
              </label>
              <select
                {...register("lessonNo", { required: true })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 transition duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="">Select a lesson</option>
                {lessonsNos?.map(
                  (lesson: { lessonNo: number; name: string; _id: string }) => (
                    <option key={lesson._id} value={lesson.lessonNo}>
                      Lesson {lesson.lessonNo} - {lesson.name}
                    </option>
                  )
                )}
              </select>
              {errors.lessonNo && (
                <span className="mt-1 text-sm text-red-500">
                  Please select a lesson
                </span>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Word
              </label>
              <input
                type="text"
                {...register("word", { required: true })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 transition duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter vocabulary word"
              />
              {errors.word && (
                <span className="mt-1 text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
          </div>

          {/* Rest of the form in two columns */}
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Pronunciation
                </label>
                <input
                  type="text"
                  {...register("pronunciation", { required: true })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 transition duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Enter pronunciation"
                />
                {errors.pronunciation && (
                  <span className="mt-1 text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  When To Say
                </label>
                <input
                  type="text"
                  {...register("whenToSay", { required: true })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 transition duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Enter usage context"
                />
                {errors.whenToSay && (
                  <span className="mt-1 text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Meaning
                </label>
                <input
                  type="text"
                  {...register("meaning", { required: true })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 transition duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Enter word meaning"
                />
                {errors.meaning && (
                  <span className="mt-1 text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Full Width Fields */}
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Example
              </label>
              <textarea
                {...register("example", { required: true })}
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 transition duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter an example sentence"
              />
              {errors.example && (
                <span className="mt-1 text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Example Meaning
              </label>
              <textarea
                {...register("exampleMeaning", { required: true })}
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 transition duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter the meaning of the example"
              />
              {errors.exampleMeaning && (
                <span className="mt-1 text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-8 w-full transform rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <CgSpinner className="mr-2 animate-spin text-xl" />
                <span>Adding...</span>
              </div>
            ) : (
              "Add Vocabulary"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
