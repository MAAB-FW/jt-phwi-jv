import { Lesson } from "@/app/dashboard/manage-lessons/page";
import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request) => {
  const db = await connectDB();
  const { _id, lessonNo, name, description }: Lesson = await req.json();

  const lessonCollection = db.collection("lessons");
  if (!_id || !lessonNo || !name || !description) {
    return NextResponse.json({
      message: "All fields are required!",
      status: 400,
    });
  }

  if (typeof lessonNo !== "number") {
    return NextResponse.json({
      message: "Lesson number must be a number!",
      status: 400,
    });
  }

  const isExist = await lessonCollection.findOne({ _id: new ObjectId(_id) });
  if (!isExist) {
    return NextResponse.json({
      message: "Lesson doesn't exists!",
      status: 400,
    });
  }

  try {
    const res = await lessonCollection.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          name,
          lessonNo,
          description,
        },
      }
    );
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong!", status: 500 });
  }
};
