import axios from "axios";

export const fetchWeatherData = async () => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=44.6488&lon=-63.5752&exclude=hourly,minutely&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY!}&units=metric`,
    );

    const weatherData = await response.data;
    const currentWeather = {
      dateTime: weatherData.current.dt,
      condition: weatherData.current.weather[0].main,
      icon: `https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`,
      temp: weatherData.current.temp,
      feelsLike: weatherData.current.feels_like,
      windSpeed: (weatherData.current.wind_speed * 3.6).toFixed(2),
      humidity: weatherData.current.humidity,
      uvi: weatherData.current.uvi,
      windDir: weatherData.current.wind_dir,
    };

    const forecastedWeather = [weatherData.daily[1], weatherData.daily[2]];

    return {
      currentWeather,
      forecastedWeather,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};
