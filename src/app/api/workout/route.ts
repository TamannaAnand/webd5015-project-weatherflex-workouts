// src/app/api/workout/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { prisma } from "@/utils/prismaDB";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId, duration, weatherId } = await request.json();

    if (!userId || duration === undefined || !weatherId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Convert weatherId to string if it's a number
    const weatherIdStr = String(weatherId);
    
    const newWorkout = await prisma.workout.create({
      data: {
        userId,
        duration,
        weatherId: weatherIdStr,
        date: new Date(),
      },
    });

    return NextResponse.json(newWorkout, { status: 201 });
  } catch (error) {
    console.error("Workout creation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}