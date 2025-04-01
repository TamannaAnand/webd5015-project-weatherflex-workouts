import { useEffect, useState } from "react";
import formatUnixTimestamp from "@/utils/formatUnixTimestamp";
import PremiumGemini from "../PremiumGemini";
import FreeGemini from "../FreeGemini";

// Weather theme configuration with more realistic colors
const weatherThemes = {
  // Sunny theme - warm yellows and oranges
  sunny: {
    background: "bg-yellow-50",
    card: "bg-yellow-100",
    accent: "text-orange-500",
    shadow: "shadow-yellow-200",
    header: "text-yellow-800"
  },
  // Clear theme (clear night) - deep blues
  clear: {
    background: "bg-sky-50",
    card: "bg-sky-100",
    accent: "text-sky-600",
    shadow: "shadow-sky-200",
    header: "text-sky-900"
  },
  // Cloudy theme - soft grays
  cloudy: {
    background: "bg-gray-100",
    card: "bg-gray-200",
    accent: "text-gray-700",
    shadow: "shadow-gray-300",
    header: "text-gray-800"
  },

  // Rainy theme - blues
  rainy: {
    background: "bg-blue-100",
    card: "bg-blue-200",
    accent: "text-blue-700",
    shadow: "shadow-blue-300",
    header: "text-blue-900"
  },
  // Snowy theme - cool whites and light blues
  snowy: {
    background: "bg-slate-50",
    card: "bg-white",
    accent: "text-slate-600",
    shadow: "shadow-slate-200",
    header: "text-slate-800"
  },
  // Stormy theme - dark purples and grays
  stormy: {
    background: "bg-slate-200",
    card: "bg-slate-300",
    accent: "text-indigo-700",
    shadow: "shadow-slate-400",
    header: "text-slate-900"
  },

  // Foggy theme - misty grays
  foggy: {
    background: "bg-neutral-100",
    card: "bg-neutral-200",
    accent: "text-neutral-600",
    shadow: "shadow-neutral-300",
    header: "text-neutral-800"
  },
  // Mild theme - gentle greens
  mild: {
    background: "bg-emerald-50",
    card: "bg-emerald-100",
    accent: "text-emerald-600",
    shadow: "shadow-emerald-200",
    header: "text-emerald-800"
  },
  // Default theme (fallback)
  default: {
    background: "bg-white",
    card: "bg-gray-100",
    accent: "text-blue-600",
    shadow: "shadow-lg",
    header: "text-black"
  }
};

const WeatherInfo = ({ weatherData }: { weatherData: any }) => {
  const [subscriptionStatus, setSubscriptionStatus] = useState<"Free" | "Premium">("Free");
  const [currentTheme, setCurrentTheme] = useState(weatherThemes.default);

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        if (!res.ok) throw new Error("Failed to fetch session");
        
        const data = await res.json();
        setSubscriptionStatus(data.user?.subscriptionStatus || "Free");
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchUserSession();
  }, []);

  useEffect(() => {
    // Determine theme based on current weather condition
    if (!weatherData || !weatherData.currentWeather) return;

    const condition = weatherData.currentWeather.condition.toLowerCase();
    const isDaytime = weatherData.currentWeather.icon?.includes("d") || false;
    
    if (condition.includes("clear") || condition.includes("sun")) {
      // Differentiate between sunny day and clear night
      setCurrentTheme(isDaytime ? weatherThemes.sunny : weatherThemes.clear);
    } else if (condition.includes("cloud") || condition.includes("overcast")) {
      setCurrentTheme(weatherThemes.cloudy);
    } else if (condition.includes("rain") || condition.includes("drizzle") || condition.includes("shower")) {
      setCurrentTheme(weatherThemes.rainy);
    } else if (condition.includes("snow") || condition.includes("sleet") || condition.includes("blizzard")) {
      setCurrentTheme(weatherThemes.snowy);
    } else if (condition.includes("thunder") || condition.includes("storm") || condition.includes("lightning")) {
      setCurrentTheme(weatherThemes.stormy);
    } else if (condition.includes("mist") || condition.includes("fog") || condition.includes("haze")) {
      setCurrentTheme(weatherThemes.foggy);
    } else if (condition.includes("mild") || condition.includes("fair") || condition.includes("pleasant")) {
      setCurrentTheme(weatherThemes.mild);
    }
  }, [weatherData]);

  return (
    <div className={`min-h-screen p-6 text-black transition-colors duration-500 ${currentTheme.background}`}>
      {/* Header: Location & Local Time */}
      <div className="mb-6 text-center">
        <h2 className={`text-2xl font-semibold ${currentTheme.header}`}>📍 Halifax, Nova Scotia</h2>
        <p className="text-gray-500">
          🕒 {formatUnixTimestamp(weatherData.currentWeather.dateTime)}
        </p>
      </div>

      {/* Weather Section */}
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Current Weather Card */}
        <div className={`flex-1 rounded-xl p-6 text-center ${currentTheme.card} ${currentTheme.shadow}`}>
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
      <div className={`mx-auto mt-8 max-w-3xl rounded-xl p-6 text-center ${currentTheme.card} ${currentTheme.shadow}`}>
        <h3 className={`mb-2 text-xl font-semibold ${currentTheme.header}`}>🔥 AI Generated Workout</h3>

        {subscriptionStatus === "Premium" ? (
          <PremiumGemini weatherData={weatherData} />
        ) : (
          <FreeGemini weatherData={weatherData} />
        )}
      </div>
    </div>
  );
};

export default WeatherInfo;