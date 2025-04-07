'use client';
import { BarChart2 } from 'lucide-react';
import { MetricCard } from '@/components/Cards/MetricCard';
import { fetchWorkoutCount } from '@/utils/fetchMetricData';
import { useEffect, useState } from 'react';

export const WorkoutCountCard = () => {
  const [workoutCount, setWorkoutCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await fetchWorkoutCount();
      if (data) setWorkoutCount(data.count);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <MetricCard
      title="Completed Workouts"
      value={workoutCount}
      icon={<BarChart2 size={24} color="#10b981" />}
      loading={loading}
      className={""}
    />
  );
};