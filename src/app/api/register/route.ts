import { hashSync } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../lib/connectDB";

interface UserData {
  email: string;
  password: string;
  name: string;
  photoUrl: string;
}

export const POST = async (request: NextRequest) => {
  const db = await connectDB();
  const userData: UserData = await request.json();
  const userCollection = await db.collection("users");
  try {
    const user = await db
      .collection("users")
      .findOne({ email: userData.email });
    if (user) {
      return NextResponse.json({ message: "User already exists", status: 400 });
    }
    const hashedPassword = hashSync(userData.password, 10);
    await userCollection.insertOne({
      ...userData,
      password: hashedPassword,
      role: "user",
      createdAt: new Date(),
      isActive: true,
    });

    return NextResponse.json({
      message: "Registration Successful",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong!",
      error,
      status: 500,
    });
  }
};
