'use client'
import { useEffect, useState } from "react";
import WeatherInfo from "./WeatherInfo";
import { fetchWeatherData } from "@/utils/fetchWeatherData";
import useSignOut from "@/utils/useSignOut";

const Dashboard = () => {
  // const weatherData = await fetchWeatherData();
  const handleSignOut = useSignOut();

  const [weatherData, setWeatherData] = useState<{ currentWeather: { dateTime: any; condition: any; icon: string; temp: any; feelsLike: any; windSpeed: string; humidity: any; uvi: any; windDir: any; }; forecastedWeather: any[]; } | undefined>(undefined);

  useEffect(() => {
    const doFetch = async () => {
      const data = await fetchWeatherData();

      setWeatherData(data);
    }


    doFetch()
  }, []);

  if (!weatherData) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Weatherflex Workouts</h1>
        <div className="flex items-center space-x-4">
          <button className="rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            <svg className="mr-1 -ml-1 inline h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Widget
          </button>
          <button onClick={handleSignOut} className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90">
            Sign Out
          </button>
        </div>
      </div>
    


        <div className="col-span-1 lg:col-span-2 overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
          <div className="p-5">
            <div className="mt-4">
              <WeatherInfo weatherData={weatherData} />
            </div>
          </div>
        </div>


    </div>
  );
};

export default Dashboard;