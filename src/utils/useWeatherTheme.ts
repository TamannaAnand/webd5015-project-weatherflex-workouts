export const weatherThemes = {
  sunny: {
    background: "bg-amber-200/70",
    card: "bg-amber-300/80",
    accent: "text-orange-600",
    shadow: "shadow-amber-400/50",
    header: "text-amber-800",
  },
  clear: {
    background: "bg-sky-200/70",
    card: "bg-sky-300/80",
    accent: "text-blue-600",
    shadow: "shadow-sky-400/50",
    header: "text-sky-800",
  },
  cloudy: {
    background: "bg-indigo-200/70",
    card: "bg-indigo-300/80",
    accent: "text-indigo-600",
    shadow: "shadow-indigo-400/50",
    header: "text-indigo-800",
  },
  rainy: {
    background: "bg-blue-200/70",
    card: "bg-blue-300/80",
    accent: "text-blue-600",
    shadow: "shadow-blue-400/50",
    header: "text-blue-800",
  },
  snowy: {
    background: "bg-teal-200/70",
    card: "bg-teal-300/80",
    accent: "text-teal-700",
    shadow: "shadow-teal-400/50",
    header: "text-teal-800",
  },
  stormy: {
    background: "bg-purple-300/70",
    card: "bg-purple-400/80",
    accent: "text-purple-600",
    shadow: "shadow-purple-500/50",
    header: "text-purple-800",
  },
  foggy: {
    background: "bg-gray-200/70",
    card: "bg-gray-300/80",
    accent: "text-orange-500",
    shadow: "shadow-gray-400/50",
    header: "text-gray-700",
  },
  mild: {
    background: "bg-emerald-200/70",
    card: "bg-emerald-300/80",
    accent: "text-emerald-600",
    shadow: "shadow-emerald-400/50",
    header: "text-emerald-800",
  },
  default: {
    background: "bg-rose-200/70",
    card: "bg-rose-300/80",
    accent: "text-rose-600",
    shadow: "shadow-rose-400/50",
    header: "text-rose-800",
  }
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

export const useWeatherTheme = (weatherData: any) => {

  if (!weatherData) return weatherThemes.default;

  const condition = weatherData.currentWeather.condition;
  const isDaytime = weatherData.currentWeather.icon?.includes("d") || false;
  const theme = getWeatherTheme(condition, isDaytime)

  return theme;
};