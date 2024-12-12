import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const db = await connectDB();
  const tutorialsCollection = db.collection("tutorials");
  try {
    const tutorials = await tutorialsCollection.find({}).toArray();
    return NextResponse.json({ tutorials });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong!", status: 500 });
  }
};
