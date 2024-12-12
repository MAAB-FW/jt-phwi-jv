import { TutorialFormData } from "@/app/dashboard/add-tutorials/page";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const db = await connectDB();
  const { title, videoId }: TutorialFormData = await req.json();
  const tutorialsCollection = db.collection("tutorials");
  if (!title || !videoId) {
    return NextResponse.json({
      message: "All fields are required!",
      status: 400,
    });
  }

  const isExist = await tutorialsCollection.findOne({ videoId });
  if (isExist) {
    return NextResponse.json({
      message: "Tutorial already exists!",
      status: 400,
    });
  }

  try {
    const res = await tutorialsCollection.insertOne({
      title,
      videoId,
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong!", status: 500 });
  }
};
