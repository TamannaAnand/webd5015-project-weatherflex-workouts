import { useEffect, useState } from "react";
import formatUnixTimestamp from "@/utils/formatUnixTimestamp";
import PremiumGemini from "../PremiumGemini";
import FreeGemini from "../FreeGemini";
import { useSession } from "next-auth/react";
import WorkoutTracker from "./WorkoutTracker";

// Weather theme configuration with more realistic colors
const weatherThemes = {
  sunny: {
    background: "bg-yellow-300",
    card: "bg-orange-400",
    accent: "text-red-700",
    shadow: "shadow-orange-500",
    header: "text-yellow-900",
  },
  clear: {
    background: "bg-sky-400",
    card: "bg-blue-500",
    accent: "text-blue-900",
    shadow: "shadow-sky-600",
    header: "text-sky-950",
  },
  cloudy: {
    background: "bg-indigo-300",
    card: "bg-indigo-400",
    accent: "text-indigo-800",
    shadow: "shadow-indigo-500",
    header: "text-indigo-950",
  },
  rainy: {
    background: "bg-blue-500",
    card: "bg-blue-600",
    accent: "text-blue-100",
    shadow: "shadow-blue-700",
    header: "text-blue-50",
  },
  snowy: {
    background: "bg-cyan-300",
    card: "bg-cyan-400",
    accent: "text-cyan-900",
    shadow: "shadow-cyan-500",
    header: "text-cyan-950",
  },
  stormy: {
    background: "bg-purple-700",
    card: "bg-purple-800",
    accent: "text-purple-200",
    shadow: "shadow-purple-900",
    header: "text-purple-100",
  },
  foggy: {
    background: "bg-violet-300",
    card: "bg-violet-400",
    accent: "text-violet-900",
    shadow: "shadow-violet-500",
    header: "text-violet-950",
  },
  mild: {
    background: "bg-emerald-300",
    card: "bg-emerald-400",
    accent: "text-emerald-900",
    shadow: "shadow-emerald-600",
    header: "text-emerald-950",
  },
  default: {
    background: "bg-rose-300",
    card: "bg-pink-400",
    accent: "text-rose-900",
    shadow: "shadow-pink-500",
    header: "text-rose-950",
  },
};


const WeatherInfo = ({ weatherData }: { weatherData: any }) => {
  const [currentTheme, setCurrentTheme] = useState<any>(null);
  const session = useSession();
  const subscriptionStatus = session?.data?.user?.subscriptionStatus;

  useEffect(() => {
    if (!weatherData || !weatherData.currentWeather) return;

    const condition = weatherData.currentWeather.condition.toLowerCase();
    const isDaytime = weatherData.currentWeather.icon?.includes("d") || false;

    let theme = weatherThemes.default;

    if (condition.includes("clear") || condition.includes("sun")) {
      theme = isDaytime ? weatherThemes.sunny : weatherThemes.clear;
    } else if (condition.includes("cloud") || condition.includes("overcast")) {
      theme = weatherThemes.cloudy;
    } else if (condition.includes("rain") || condition.includes("drizzle") || condition.includes("shower")) {
      theme = weatherThemes.rainy;
    } else if (condition.includes("snow") || condition.includes("sleet") || condition.includes("blizzard")) {
      theme = weatherThemes.snowy;
    } else if (condition.includes("thunder") || condition.includes("storm") || condition.includes("lightning")) {
      theme = weatherThemes.stormy;
    } else if (condition.includes("mist") || condition.includes("fog") || condition.includes("haze")) {
      theme = weatherThemes.foggy;
    } else if (condition.includes("mild") || condition.includes("fair") || condition.includes("pleasant")) {
      theme = weatherThemes.mild;
    }

    setCurrentTheme(theme);
  }, [weatherData]);

  // Prevent render until theme is ready
  if (!currentTheme) return null;


  return (
    <div
      className={`min-h-screen p-6 text-black transition-colors duration-500 ${currentTheme.background} rounded-lg`}
    >
      {/* Header: Location & Local Time */}
      <div className="mb-6 text-center">
        <h2 className={`text-2xl font-semibold ${currentTheme.header}`}>
          📍 Halifax, Nova Scotia
        </h2>
        <p className="text-gray-500">
          🕒 {formatUnixTimestamp(weatherData.currentWeather.dateTime)}
        </p>
      </div>

      {/* Weather Section */}
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Current Weather Card */}
        <div
          className={`flex-1 rounded-xl p-6 text-center ${currentTheme.card} ${currentTheme.shadow}`}
        >
          <img
            src={weatherData.currentWeather.icon}
            alt="Weather Icon"
            className="mx-auto size-20"
          />
          <h3 className={`text-xl font-bold ${currentTheme.header}`}>
            {weatherData.currentWeather.condition}
          </h3>
          <p className={`text-2xl font-semibold ${currentTheme.accent}`}>
            {weatherData.currentWeather.temp}°C (Feels like{" "}
            {weatherData.currentWeather.feelsLike}°C)
          </p>
          <div className="mt-2 text-gray-600">
            <p>💨 Wind: {weatherData.currentWeather.windSpeed} km/h</p>
            <p>💧 Humidity: {weatherData.currentWeather.humidity}%</p>
            <p>🔆 UV Index: {weatherData.currentWeather.uvi}</p>
          </div>
        </div>

        <div className="gap-4">
          {weatherData.forecastedWeather.map((day: any, index: any) => (
            <div
              key={index}
              className={`flex flex-1 rounded-lg p-4 ${currentTheme.card} ${currentTheme.shadow} mb-2`}
            >
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt="Weather Icon"
                className="h-12 w-12"
              />
              <div className="ml-4">
                <h4 className={`text-lg font-semibold ${currentTheme.accent}`}>
                  {formatUnixTimestamp(day.dt)}
                </h4>
              </div>

              <div className="ml-4 flex flex-col flex-wrap gap-2">
                <p className="text-nowrap text-gray-600">
                  🌡️ {day.temp.min}°C - {day.temp.max}°C
                </p>
                <p className="text-nowrap text-gray-600">
                  💨 Wind: {(day.wind_speed * 3.6).toFixed(2)} km/h
                </p>
                <p className="text-sm">
                  Conditions:{" "}
                  {day.weather[0].description.charAt(0).toUpperCase() +
                    day.weather[0].description.slice(1)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workout Recommendations */}
      <div className="mt-8 flex flex-col items-start justify-center gap-6 md:flex-row">
        <div
          className={`max-w-3xl flex-1 rounded-xl p-6 text-center ${currentTheme.card} ${currentTheme.shadow}`}
        >
          <h3 className={`mb-2 text-xl font-semibold ${currentTheme.header}`}>
            🔥 AI Generated Workout
          </h3>

          {subscriptionStatus === "Premium" ? (
            <PremiumGemini weatherData={weatherData} />
          ) : (
            <FreeGemini weatherData={weatherData} />
          )}
        </div>

        <div className="flex-2">
          <WorkoutTracker weatherData={weatherData} weatherThemes={weatherThemes} />
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
