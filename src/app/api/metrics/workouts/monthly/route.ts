import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const currentYear = new Date().getFullYear();

    const workouts = await prisma.workout.findMany({
      where: {
        date: {
          gte: new Date(`${currentYear}-01-01`),
          lte: new Date(`${currentYear}-12-31`)
        }
      },
      select: {
        date: true
      }
    });

    const monthlyCounts: Record<number, number> = {};

    workouts.forEach((workout) => {
      const month = new Date(workout.date).getMonth() + 1; // Months are 0-indexed
      monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
    });

    const formatted = Array.from({ length: 12 }, (_, i) => ({
      name: new Date(0, i).toLocaleString('default', { month: 'short' }),
      count: monthlyCounts[i + 1] || 0
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Error fetching monthly workouts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch monthly workouts' },
      { status: 500 }
    );
  }
}
