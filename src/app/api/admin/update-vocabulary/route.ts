import { VocabularyFormData } from "@/app/dashboard/add-vocabularies/page";
import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

interface NewVoc extends VocabularyFormData {
  _id: string;
}

export const PATCH = async (req: Request) => {
  const db = await connectDB();
  const {
    _id,
    lessonNo,
    word,
    meaning,
    pronunciation,
    whenToSay,
    example,
    exampleMeaning,
    adminMail,
  }: NewVoc = await req.json();

  const vocabularyCollection = db.collection("vocabulary");
  if (
    !_id ||
    !lessonNo ||
    !word ||
    !meaning ||
    !pronunciation ||
    !whenToSay ||
    !example ||
    !adminMail ||
    !exampleMeaning
  ) {
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

  const isExist = await vocabularyCollection.findOne({
    _id: new ObjectId(_id),
  });
  if (!isExist) {
    return NextResponse.json({
      message: "Lesson doesn't exists!",
      status: 400,
    });
  }

  try {
    const res = await vocabularyCollection.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          lessonNo,
          word,
          meaning,
          pronunciation,
          whenToSay,
          example,
          exampleMeaning,
          adminMail,
        },
      }
    );
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong!", status: 500 });
  }
};
