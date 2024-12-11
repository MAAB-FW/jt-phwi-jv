import { VucabularyFormData } from "@/app/dashboard/add-vocabularies/page";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const db = await connectDB();
  const {
    word,
    meaning,
    pronunciation,
    whenToSay,
    lessonNo,
    adminMail,
    example,
    exampleMeaning,
  }: VucabularyFormData = await req.json();
  const vucabularyCollection = db.collection("vucabulary");

  if (
    !lessonNo ||
    !word ||
    !meaning ||
    !pronunciation ||
    !whenToSay ||
    !example ||
    !adminMail ||
    !exampleMeaning
  ) {
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

  const isExist = await vucabularyCollection.findOne({ word });
  if (isExist) {
    return NextResponse.json({
      message: "Vucabulary already exists!",
      status: 400,
    });
  }

  try {
    const res = await vucabularyCollection.insertOne({
      word,
      meaning,
      pronunciation,
      whenToSay,
      lessonNo,
      adminMail,
      example,
      exampleMeaning,
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong!", status: 500 });
  }
};
