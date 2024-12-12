import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const db = await connectDB();
  const vocabularyCollection = db.collection("vocabulary");
  try {
    const vocabularies = await vocabularyCollection.find({}).toArray();

    return NextResponse.json({ vocabularies });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong!", status: 500 });
  }
};
