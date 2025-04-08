'use client';
import { UserCountCard } from "@/components/Cards/UserCountCard";
import { WorkoutCountCard } from "@/components/Cards/WorkoutCountCard";
import { MonthlyWorkoutsChart } from "@/components/Charts/MonthlyWorkoutsChart";
import { WeatherWorkoutsCard } from "@/components/Cards/WeatherWorkoutsCard";

export const MetricsDashboard = () => {
  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <UserCountCard />
        <WorkoutCountCard />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MonthlyWorkoutsChart />
        </div>
        <div>
          <WeatherWorkoutsCard />
        </div>
      </div>
    </div>
  );
};