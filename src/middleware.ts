import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    const publicPaths = ['/signin', '/signup', '/forgot-password'];

    // Redirect logged-in users away from public pages
    if (publicPaths.includes(pathname) && token) {
      return NextResponse.redirect(new URL('/weatherflex', req.url));
    }

    // Restrict access to /adminDashboard for users who are not admins
    if (pathname.startsWith('/adminDashboard')) {
      if (token?.role !== 'Admin') {
        return NextResponse.redirect(new URL('/weatherflex', req.url)); // Or redirect elsewhere
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/signin',
    },
  }
);

// Specify protected routes
export const config = {
  matcher: ['/weatherflex', '/adminDashboard', '/profile/:path*', '/adminDashboard/:path*', '/weatherflex/:path*'],
};
