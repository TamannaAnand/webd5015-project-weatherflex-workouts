
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
  }
}


declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
    name?: string;
    email?: string;
  }

  // Define a type for the credentials
  interface Credentials {
    email: string;
    password: string;
    name?: string;
  }
}

