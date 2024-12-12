import { connectDB } from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ lessonNo: number }> }
) => {
  const db = await connectDB();
  const lessonNo = Number((await params).lessonNo);
  if (!lessonNo) {
    return NextResponse.json({ message: "Invalid lesson number", status: 400 });
  }

  try {
    const res = await db.collection("lessons").deleteOne({ lessonNo });
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 400 });
  }
};
