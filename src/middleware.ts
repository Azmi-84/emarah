import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  // Get the token from the request
  const token = await getToken({ req: request, secret: process.env.SECRET });
  const url = request.nextUrl;

  // If there's a token and the user is trying to access sign-in, sign-up, or home pages
  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify") ||
      url.pathname === "/")
  ) {
    // Redirect authenticated users away from sign-in, sign-up, or home to the dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If there's no token and the user is trying to access a protected route
  if (
    !token &&
    (url.pathname.startsWith("/dashboard") ||
      url.pathname.startsWith("/verify"))
  ) {
    // Redirect unauthenticated users to the sign-in page
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Allow the request to proceed if none of the conditions are met
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/",
    "/dashboard/:path*",
    "/verify/:path*",
    "/about",
    "/blog",
    "/features",
    "/help",
    "/customers",
    "/publicpage/:path*",
  ],
};
