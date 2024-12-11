import { connectDB } from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) => {
  const db = await connectDB();
  const email = (await params).email;

  try {
    const user = await db.collection("users").findOne({
      email: email,
    });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "user not found", status: 400 })
      );
    }
    return new NextResponse(
      JSON.stringify({
        _id: user._id.toString(),
        role: user.role,
        name: user.name,
        email: user.email,
        image: user.photoUrl,
      })
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: error, status: 400 }));
  }
};
