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
