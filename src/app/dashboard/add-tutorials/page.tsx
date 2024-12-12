"use client";

import { addTutorial } from "@/services/getData";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";

export interface TutorialFormData {
  title: string;
  videoId: string;
}

const Page = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TutorialFormData>();
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (data: TutorialFormData) => {
    setIsLoading(true);

    try {
      const response = await addTutorial(data);

      if (response.insertedId) {
        toast.success("Tutorial added successfully!");
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
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
          Add New Tutorial
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Title
              </label>
              <input
                type="text"
                {...register("title", { required: true })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 transition duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter tutorial title"
              />
              {errors.title && (
                <span className="mt-1 text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Video ID
              </label>
              <input
                type="text"
                {...register("videoId", { required: true })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 transition duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter YouTube video ID"
              />
              {errors.videoId && (
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
              </div>
            ) : (
              "Add Tutorial"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
