"use client";

import { deleteLesson, getLessons } from "@/services/getData";
import { queryClient } from "@/services/providers";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { JSX } from "react";
import toast from "react-hot-toast";

interface Lesson {
  lessonNo: number;
  name: string;
  description: string;
}

export default function ManageLessons(): JSX.Element {
  const { data: lessons = [] } = useQuery<Lesson[]>({
    queryKey: ["get-lessons"],
    queryFn: async (): Promise<Lesson[]> => {
      const { lessons } = await getLessons();
      return lessons;
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["delete-lesson"],
    mutationFn: async (lessonNo: number): Promise<{ deletedCount: number }> => {
      const res = await deleteLesson(lessonNo);
      console.log(res);
      return { deletedCount: res.deletedCount };
    },
    onSuccess: (data: { deletedCount: number }) => {
      if (data.deletedCount) {
        toast.success("Lesson deleted successfully!");
        queryClient.invalidateQueries({ queryKey: ["get-lessons"] });
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  return (
    <div className="min-h-screen py-4 sm:py-8">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Manage Lessons
          </h1>
          <Link
            href="/dashboard/add-lessons"
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 sm:w-auto"
          >
            Add New Lesson
          </Link>
        </div>

        <div className="overflow-x-auto rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-900 sm:px-6 sm:py-4 sm:text-sm">
                    Lesson No
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-900 sm:px-6 sm:py-4 sm:text-sm">
                    Name
                  </th>
                  <th className="hidden px-3 py-3 text-left text-xs font-semibold text-gray-900 sm:table-cell sm:px-6 sm:py-4 sm:text-sm">
                    Description
                  </th>
                  <th className="px-3 py-3 text-right text-xs font-semibold text-gray-900 sm:px-6 sm:py-4 sm:text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {lessons?.map((lesson) => (
                  <tr
                    key={lesson.lessonNo}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-3 py-3 text-xs text-gray-900 sm:px-6 sm:py-4 sm:text-sm">
                      {lesson.lessonNo}
                    </td>
                    <td className="px-3 py-3 text-xs font-medium text-gray-900 sm:px-6 sm:py-4 sm:text-sm">
                      {lesson.name}
                    </td>
                    <td className="hidden px-3 py-3 text-xs text-gray-500 sm:table-cell sm:px-6 sm:py-4 sm:text-sm">
                      {lesson.description}
                    </td>
                    <td className="px-3 py-3 text-right sm:px-6 sm:py-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                        <button className="inline-flex items-center justify-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 sm:px-3 sm:text-sm">
                          Edit
                        </button>
                        <button
                          onClick={() => mutate(lesson.lessonNo)}
                          className="inline-flex items-center justify-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 sm:px-3 sm:text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {lessons.length === 0 && (
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 sm:text-sm">
              No lessons found. Add your first lesson to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
