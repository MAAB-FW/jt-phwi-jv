import { LessonFormData } from "@/app/dashboard/add-lessons/page";
import { TutorialFormData } from "@/app/dashboard/add-tutorials/page";
import { VocabularyFormData } from "@/app/dashboard/add-vocabularies/page";
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

// add vocabulary
export const addVocabulary = async (data: VocabularyFormData) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/add-vocabulary`,
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

// get vocabularies for a lesson
export const getVocabulariesOfLesson = async (lessonNo: number) => {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/api/get-vocabularies/${lessonNo}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// get all vocabularies
export const getVocabularies = async () => {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/get-vocabularies`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deleteVocabulary = async (_id: string) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/delete-vocabulary/${_id}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const updateVocabulary = async (data: VocabularyFormData) => {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/update-vocabulary`,
      data
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// get vocabulary count for a lesson
export const getVocabularyCountALesson = async (lessonNo: number) => {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/api/vocabulary-count/${lessonNo}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// add tutorial to database
export const addTutorial = async (data: TutorialFormData) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/add-tutorial`,
      data
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// get all tutorials
export const getAllTutorials = async () => {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/api/get-tutorials`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// delete tutorial
export const deleteTutorial = async (_id: string) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/delete-tutorial/${_id}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const updateTutorial = async (data: {
  _id: string;
  title: string;
  videoId: string;
}) => {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/update-tutorial`,
      data
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};
