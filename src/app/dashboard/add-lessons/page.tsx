"use client";

import { addLesson } from "@/services/getData";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";

export interface LessonFormData {
  lessonNo: number;
  name: string;
  description: string;
}

export default function AddLesson() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LessonFormData>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LessonFormData) => {
    if (!data.lessonNo || !data.name || !data.description) {
      toast.error("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    try {
      // Replace with your API endpoint
      const response = await addLesson({
        ...data,
        lessonNo: Number(data.lessonNo),
      });

      if (response.insertedId) {
        toast.success("Lesson added successfully!");
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
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Add New Lesson</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Lesson Number
          </label>
          <input
            type="number"
            {...register("lessonNo", { required: true, min: 1 })}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.lessonNo && (
            <span className="text-sm text-red-500">This field is required</span>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Lesson Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <span className="text-sm text-red-500">This field is required</span>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Description</label>
          <textarea
            {...register("description", { required: true })}
            rows={4}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.description && (
            <span className="text-sm text-red-500">This field is required</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isLoading ? (
            <CgSpinner className="animate-spin text-xl" />
          ) : (
            "Add Lesson"
          )}
        </button>
      </form>
    </div>
  );
}
