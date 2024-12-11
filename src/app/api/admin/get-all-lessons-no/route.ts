import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const db = await connectDB();
  const lessonsCollection = db.collection("lessons");
  try {
    const lessons = await lessonsCollection
      .find({}, { projection: { lessonNo: 1, _id: 1 } })
      .toArray();
    return NextResponse.json({ lessons });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong!", status: 500 });
  }
};
