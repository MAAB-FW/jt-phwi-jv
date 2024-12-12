import { Tutorial } from "@/app/dashboard/manage-tutorials/page";
import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request) => {
  const db = await connectDB();
  const { _id, title, videoId }: Tutorial = await req.json();

  const tutorialsCollection = db.collection("tutorials");
  if (!_id || !title || !videoId) {
    return NextResponse.json({
      message: "All fields are required!",
      status: 400,
    });
  }

  const isExist = await tutorialsCollection.findOne({ _id: new ObjectId(_id) });
  if (!isExist) {
    return NextResponse.json({
      message: "Tutorial doesn't exists!",
      status: 400,
    });
  }

  try {
    const res = await tutorialsCollection.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          title,
          videoId,
        },
      }
    );
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong!", status: 500 });
  }
};
