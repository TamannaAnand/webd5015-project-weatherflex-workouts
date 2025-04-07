import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const workoutCount = await prisma.workout.count();
    return NextResponse.json({ count: workoutCount });
  } catch (error) {
    console.error('Error fetching workout count:', error);
    return NextResponse.json(
      { error: 'Failed to fetch workout count' },
      { status: 500 }
    );
  }
}