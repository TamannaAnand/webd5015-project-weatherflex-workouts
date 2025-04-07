// src/styles/weatherTheme.ts

// Weather theme configuration with realistic colors
export const weatherThemes = {
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

export type WeatherThemeType = keyof typeof weatherThemes;

// Helper function to determine theme based on weather condition
export const getWeatherTheme = (
  condition: string = "", 
  isDaytime: boolean = true
): typeof weatherThemes[WeatherThemeType] => {
  const lowercaseCondition = condition.toLowerCase();
  
  if (lowercaseCondition.includes("clear") || lowercaseCondition.includes("sun")) {
    // Differentiate between sunny day and clear night
    return isDaytime ? weatherThemes.sunny : weatherThemes.clear;
  } else if (lowercaseCondition.includes("cloud") || lowercaseCondition.includes("overcast")) {
    return weatherThemes.cloudy;
  } else if (
    lowercaseCondition.includes("rain") ||
    lowercaseCondition.includes("drizzle") ||
    lowercaseCondition.includes("shower")
  ) {
    return weatherThemes.rainy;
  } else if (
    lowercaseCondition.includes("snow") ||
    lowercaseCondition.includes("sleet") ||
    lowercaseCondition.includes("blizzard")
  ) {
    return weatherThemes.snowy;
  } else if (
    lowercaseCondition.includes("thunder") ||
    lowercaseCondition.includes("storm") ||
    lowercaseCondition.includes("lightning")
  ) {
    return weatherThemes.stormy;
  } else if (
    lowercaseCondition.includes("mist") ||
    lowercaseCondition.includes("fog") ||
    lowercaseCondition.includes("haze")
  ) {
    return weatherThemes.foggy;
  } else if (
    lowercaseCondition.includes("mild") ||
    lowercaseCondition.includes("fair") ||
    lowercaseCondition.includes("pleasant")
  ) {
    return weatherThemes.mild;
  }
  
  // Default theme if no condition matches
  return weatherThemes.default;
};

// Example hook for using weather themes in components
import { useState, useEffect } from "react";

export const useWeatherTheme = (weatherData: any) => {
  const [currentTheme, setCurrentTheme] = useState(weatherThemes.default || null);

  useEffect(() => {
    if (!weatherData || !weatherData.currentWeather) return;

    const condition = weatherData.currentWeather.condition;
    const isDaytime = weatherData.currentWeather.icon?.includes("d") || false;
    
    setCurrentTheme(getWeatherTheme(condition, isDaytime));
  }, [weatherData]);

  return currentTheme;
};