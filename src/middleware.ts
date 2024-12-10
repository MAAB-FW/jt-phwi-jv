import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export const middleware = async (request: NextRequest) => {
  const token = await getToken({ req: request, secret });
  const pathname = request.nextUrl.pathname;
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.includes(".") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }
  if (!token) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_API_URL}/login`);
  }
  return NextResponse.next();
};
