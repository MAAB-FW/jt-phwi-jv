import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { getUserRole } from "./services/getData";

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
  if (token.email) {
    const { role } = await getUserRole(token.email);
    if (role === "admin" && pathname === "/") {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard`
      );
    }
    if (role === "user" && (pathname === "/" || pathname === "/dashboard")) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_API_URL}/lessons`
      );
    }
  }

  return NextResponse.next();
};
