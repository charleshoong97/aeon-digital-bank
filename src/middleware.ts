import { NextRequest, NextResponse } from "next/server"
import { privateRoute, publicRoute } from "./constants/route"

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")
  const pathname = request.nextUrl.pathname

  if (publicRoute.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/home", request.url))
  } else if (privateRoute.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)",
    "/api/:path*",
  ],
}
