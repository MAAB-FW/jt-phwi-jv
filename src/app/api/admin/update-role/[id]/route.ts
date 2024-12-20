import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const db = await connectDB();
  const { role }: { role: "admin" | "user" } = await req.json();
  const _id = (await params).id;

  const usersCollection = db.collection("users");
  if (role !== "admin" && role !== "user") {
    return NextResponse.json({
      message: "Role must be either admin or user!",
      status: 400,
    });
  }

  try {
    const isExist = await usersCollection.findOne({ _id: new ObjectId(_id) });
    if (!isExist) {
      return NextResponse.json({
        message: "User doesn't exists!",
        status: 400,
      });
    }

    const res = await usersCollection.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          role,
        },
      }
    );

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong!", status: 500 });
  }
};
