import { NextResponse } from "next/server";
import { prisma } from "@/utils/prismaDB";

// GET user details by ID
export async function GET(req: Request, { params }:  { params?: { id?: string } }) {
  try {
    // Ensure params and id exist
    if (!params || !params.id) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// PUT (Edit) user details
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: body,
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating user", error }, { status: 500 });
  }
}

// DELETE a user by id 
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json(); // Extract user ID from request body
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting user", error }, { status: 500 });
  }
}
