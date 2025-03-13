import axios from "axios";

/**
 * Fetches weather data for Halifax, Canada, including:
 * - Current weather conditions
 * - Forecasted weather for the next two days
 * 
 * @returns {Promise<Object>} An object containing location, current weather, and forecasted weather data.
 */
export const fetchWeatherData = async () => {
  try {
    // API request to fetch weather data
    const response = await axios.get(
      "http://api.weatherapi.com/v1/forecast.json",
      {
        params: {
          key: process.env.WEATHER_API_KEY, // API key stored securely in environment variables
          q: "Halifax, Canada", // Location for weather data
          days: 3, // Fetching forecast for the next three days
        },
      }
    );

    // Extracting relevant data from the API response
    const weatherData = response.data;
    const location = weatherData["location"]; // Location metadata (name, region, country, timezone)
    const currentWeather = weatherData["current"]; // Current weather conditions

    // Extracting forecasted weather for the next two days
    const forecastedWeather = [
      weatherData["forecast"]["forecastday"][1], // Forecast for tomorrow
      weatherData["forecast"]["forecastday"][2], // Forecast for the day after tomorrow
    ];

    console.log(forecastedWeather[1]["date"]); // Debug log for validation

    return {
      location,
      currentWeather,
      forecastedWeather,
    };
  } catch (error) {
    console.error("Error fetching forecasted weather:", error);
    return null; // Returning null in case of an error to avoid app crashes
  }
};

/**
 * Formats a given date or datetime string into a human-readable format.
 * - If the input is a full datetime (YYYY-MM-DD HH:mm), it remains unchanged.
 * - If the input is a date-only string (YYYY-MM-DD), a default time of 00:00:00 is appended.
 * 
 * @param {string} localtime - The local date or datetime string (format: "YYYY-MM-DD" or "YYYY-MM-DD HH:mm").
 * @returns {string} A formatted string displaying the full date (e.g., "Saturday, March 15, 2025").
 */
export const formatLocalTime = (localtime: string) => {
  // Ensure proper datetime format by appending a default time if missing
  const dateString = localtime.includes(" ") ? localtime.replace(" ", "T") : `${localtime}T00:00:00`;

  const date = new Date(dateString); // Convert to a JavaScript Date object

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long", // Display full weekday name (e.g., "Saturday")
    year: "numeric", // Display full year (e.g., "2025")
    month: "long", // Display full month name (e.g., "March")
    day: "numeric", // Display day of the month (e.g., "15")
  }).format(date);
};
