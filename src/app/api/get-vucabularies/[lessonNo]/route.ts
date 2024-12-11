import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ lessonNo: string }> }
) => {
  const db = await connectDB();
  const lessonNo = Number((await params).lessonNo);

  const vucabularyCollection = db.collection("vucabulary");
  try {
    const vucabularies = await vucabularyCollection
      .find({ lessonNo })
      .toArray();
    return NextResponse.json({ vucabularies });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong!", status: 500 });
  }
};
