import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const db = await connectDB();
  const id = (await params).id;
  if (!id) {
    return NextResponse.json({ message: "Invalid id", status: 400 });
  }

  try {
    const res = await db
      .collection("tutorials")
      .deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 400 });
  }
};