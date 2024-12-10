import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    return NextResponse.json("working");
  } catch (error) {
    console.log(error);
  }
};
