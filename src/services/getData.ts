import { LessonFormData } from "@/app/dashboard/add-lessons/page";
import axios from "axios";

export const getUserInfo = async (email: string) => {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user-info/${email}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// add lesson post func
export const addLesson = async (data: LessonFormData) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/add-lessons`,
      data
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// get all lessons

export const getLessons = async () => {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/api/get-lessons`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// delete a lesson
export const deleteLesson = async (lessonNo: number) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/delete-lesson/${lessonNo}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// update lesson
export const updateLesson = async (lesson: LessonFormData) => {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/update-lesson`,
      lesson
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};
