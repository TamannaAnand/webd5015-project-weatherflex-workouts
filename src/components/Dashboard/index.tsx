'use client'
import { useEffect, useState } from "react";
import WeatherInfo from "./WeatherInfo";
import { fetchWeatherData } from "@/utils/fetchWeatherData";
import useSignOut from "@/utils/useSignOut";
import toast from "react-hot-toast";

const Dashboard = () => {
  // const weatherData = await fetchWeatherData();
  const handleSignOut = useSignOut();

  const [weatherData, setWeatherData] = useState<any>(null);

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
          {/* <button className="rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700" onClick={handleCompleteWorkout}>
            Completed Workout
          </button> */}
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