import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const db = await connectDB();
  const userCollection = db.collection("users");
  try {
    const users = await userCollection.find({}).toArray();
    if (!users) {
      return NextResponse.json({ message: "No users found!", status: 404 });
    }
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong!",
      status: 500,
      error,
    });
  }
};
