import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { getUserInfo } from "./services/getData";

const secret = process.env.NEXTAUTH_SECRET;

export const middleware = async (request: NextRequest) => {
  const token = await getToken({ req: request, secret });
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.includes(".") ||
    pathname.startsWith("/api/user-info") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/register")
  ) {
    return NextResponse.next();
  }
  if (!token) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_API_URL}/login`);
  }
  if (token.email) {
    const { role } = await getUserInfo(token.email);
    if (role === "admin" && pathname === "/") {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard`
      );
    }
    if (pathname.startsWith("/api/admin") && role !== "admin") {
      return NextResponse.json({
        message: "You are not authorized!",
        status: 401,
      });
    }
    if (
      role === "user" &&
      (pathname === "/" || pathname.startsWith("/dashboard"))
    ) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_API_URL}/lesson`);
    }
  }

  return NextResponse.next();
};
