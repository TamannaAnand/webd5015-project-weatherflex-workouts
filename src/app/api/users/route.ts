import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/utils/prismaDB";
import bcrypt from "bcrypt";

// GET all users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching users", error }, { status: 500 });
  }
}

// POST a new user
export async function POST(req: NextRequest) {
  const { name, email, subscriptionStatus, password } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  // Then save user with hashedPassword in your DB
  await prisma.user.create({
    data: {
      name,
      email,
      subscriptionStatus,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ message: "User created" });
}


