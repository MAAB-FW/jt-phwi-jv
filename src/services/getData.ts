import { LessonFormData } from "@/app/dashboard/add-lessons/page";
import { VucabularyFormData } from "@/app/dashboard/add-vocabularies/page";
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

// get all users
export const getAllUsers = async () => {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/get-all-users`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// update user role
export const updateUserRole = async (_id: string, role: "admin" | "user") => {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/update-role/${_id}`,
      {
        role,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// add vucabulary
export const addVucabulary = async (data: VucabularyFormData) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/add-vucabulary`,
      data
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// get all lessons
export const getAllLessonsNo = async () => {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/get-all-lessons-no`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// get vucabularies for a lesson
export const getVucabulariesOfLesson = async (lessonNo: number) => {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/api/get-vucabularies/${lessonNo}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
