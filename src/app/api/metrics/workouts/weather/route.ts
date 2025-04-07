import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    // Find workouts for the current month and year
    const workouts = await prisma.workout.findMany({
      where: {
        date: {
          gte: new Date(`${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`),
          lt: new Date(`${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-01`),
        },
      },
      select: {
        userId: true,
        weather: {
          select: {
            name: true,
          },
        },
      },
    });

    // Group and count users by weather name
    const weatherMap: Record<string, Set<string>> = {};

    workouts.forEach(({ userId, weather }) => {
      if (!weather) return;
      if (!weatherMap[weather.name]) {
        weatherMap[weather.name] = new Set();
      }
      weatherMap[weather.name].add(userId);
    });

    const result = Object.entries(weatherMap).map(([weather, userSet]) => ({
      weather,
      userCount: userSet.size,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching weather workouts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather workouts' },
      { status: 500 }
    );
  }
}
