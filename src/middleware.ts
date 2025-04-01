// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // Get the pathname of the request
    const path = req.nextUrl.pathname;
    
    // Get the token from the request 
    const token = req.nextauth.token;
    
    // Define public paths that don't require authentication
    const publicPaths = ['/signin', '/signup', '/forgot-password'];
    
    // If the path is public and the user is logged in, redirect to dashboard
    if (publicPaths.includes(path) && token) {
      return NextResponse.redirect(new URL('/weatherflex', req.url));
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      // Return true if the user is authenticated, false otherwise
      authorized: ({ token }) => !!token,
    },
    // List of pages that don't require authentication
    pages: {
      signIn: '/signin',
    },
  }
);

// Specify the paths that should be protected
export const config = {
  matcher: ['/weatherflex', '/adminDashboard', '/profile/:path*', '/adminDashboard/:path*', '/weatherflex/:path*'],
};