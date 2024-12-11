import { LessonFormData } from "@/app/dashboard/add-lessons/page";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const db = await connectDB();
  const { lessonNo, name, description }: LessonFormData = await req.json();
  const lessonCollection = db.collection("lessons");
  if (!lessonNo || !name || !description) {
    return NextResponse.json({
      message: "All fields are required!",
      status: 400,
    });
  }
  if (typeof lessonNo !== "number") {
    return NextResponse.json({
      message: "Lesson number must be a number!",
      status: 400,
    });
  }

  const isExist = await lessonCollection.findOne({ lessonNo });
  if (isExist) {
    return NextResponse.json({
      message: "Lesson already exists!",
      status: 400,
    });
  }

  try {
    const res = await lessonCollection.insertOne({
      lessonNo,
      name,
      description,
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong!", status: 500 });
  }
};
