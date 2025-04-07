'use client'
import { useEffect, useState } from "react";
import WeatherInfo from "./WeatherInfo";
import { fetchWeatherData } from "@/utils/fetchWeatherData";
import useSignOut from "@/utils/useSignOut";
import { useWeatherTheme } from "@/utils/useWeatherTheme";

const Dashboard = () => {
  const handleSignOut = useSignOut();
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const currentTheme = useWeatherTheme(weatherData);

  useEffect(() => {
    const doFetch = async () => {
      try {
        const data = await fetchWeatherData();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    doFetch();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-10 w-24 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 text-black transition-colors duration-500 ${currentTheme.background} rounded-lg`}>
      <div className={`flex items-center justify-between mb-6 ${currentTheme.background}`}>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Weatherflex Workouts</h1>
        <div className="flex items-center space-x-4">
          <button onClick={handleSignOut} className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90">
            Sign Out
          </button>
        </div>
      </div>
    


        <div className={`col-span-1 lg:col-span-2 overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800 ${currentTheme.background}`}>
          <div className={`p-6 ${currentTheme.card} ${currentTheme.shadow}`}>
            <div className="mt-4">
              <WeatherInfo weatherData={weatherData} />
            </div>
          </div>
        </div>
    </div>
  );
};

export default Dashboard;