import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (!req.nextauth.token) {
      const loginUrl = new URL("/auth/signup", req.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized() {
        return true;
      },
    },
    pages: {
      signIn: "/auth/signup",
    },
  }
);

export const config = { matcher: ["/", "/account", "/list"] };
