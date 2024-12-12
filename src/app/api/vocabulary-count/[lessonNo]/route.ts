import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ lessonNo: string }> }
) => {
  const db = await connectDB();
  const lessonNo = (await params).lessonNo;
  const vocabularyCollection = db.collection("vocabulary");
  if (!lessonNo) {
    return NextResponse.json(
      { error: "Lesson number is required" },
      { status: 400 }
    );
  }

  try {
    const count = await vocabularyCollection.countDocuments({
      lessonNo: Number(lessonNo),
    });
    return NextResponse.json({ count });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
