import { hashSync } from "bcrypt";
import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/connectDB";

export const POST = async (request) => {
  const db = await connectDB();
  const userData = await request.json();
  const userCollection = await db.collection("users");
  try {
    const user = await db
      .collection("users")
      .findOne({ email: userData.email });
    if (user) {
      return new NextResponse(
        JSON.stringify({ message: "User already exists", status: 400 })
      );
    }
    const hashedPassword = hashSync(userData.password, 10);
    await userCollection.insertOne({
      ...userData,
      password: hashedPassword,
      role: "user",
      createdAt: new Date(),
      isActive: true,
    });

    return new NextResponse(
      JSON.stringify({
        message: "Registration Successful",
        status: 200,
      })
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong!",
        error,
        status: 500,
      })
    );
  }
};
