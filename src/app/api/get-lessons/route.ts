import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req: Request) => {
  const db = await connectDB();
  const lessonsCollection = db.collection("lessons");
  try {
    const lessons = await lessonsCollection.find({}).toArray();
    return NextResponse.json({ lessons: lessons });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong!", status: 500 });
  }
};
