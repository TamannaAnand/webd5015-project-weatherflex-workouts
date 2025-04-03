import { NextResponse } from "next/server";
import { prisma } from "@/utils/prismaDB";
//add weather condition to db
export async function POST(req: Request) {
  try {
    const body = await req.json(); // Properly parse the request body
    const newCondition = await prisma.weather.create({ data: body });
    return NextResponse.json(newCondition, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating condition", error }, { status: 500 });
  }
}
