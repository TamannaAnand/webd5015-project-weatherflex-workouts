
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
    name?: string | null;
    email?: string | null;
    subscriptionStatus?: string; // Add subscription status to user
  }
}


declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
    name?: string;
    email?: string;
    subscriptionStatus?: string; // Add subscription status to JWT
  }

  // Define a type for the credentials
  interface Credentials {
    email: string;
    password: string;
    name?: string;
  }
}

