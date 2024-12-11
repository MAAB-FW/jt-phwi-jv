"use client";

import { deleteLesson, getLessons } from "@/services/getData";
import { queryClient } from "@/services/providers";
import { useMutation, useQuery } from "@tanstack/react-query";
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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Lessons</h1>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Lesson No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {lessons?.map((lesson) => (
              <tr key={lesson.lessonNo}>
                <td className="whitespace-nowrap px-6 py-4">
                  {lesson.lessonNo}
                </td>
                <td className="px-6 py-4">{lesson.name}</td>
                <td className="px-6 py-4">{lesson.description}</td>
                <td className="space-x-2 px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800">
                    Edit
                  </button>
                  <button
                    onClick={() => mutate(lesson.lessonNo)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
