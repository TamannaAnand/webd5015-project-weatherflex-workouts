import { NextResponse } from "next/server";
import { prisma } from "@/utils/prismaDB";

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
export async function POST(req: Request) {
  try {
    const body = await req.json(); // Properly parse the request body
    const newUser = await prisma.user.create({ data: body });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating user", error }, { status: 500 });
  }
}

