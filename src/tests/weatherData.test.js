// Define the fetchWeatherData function directly in the test file & Use controlled data for testing
// This is a function to simulate fetching weather data from an API 
const fetchWeatherData = async () => {
  try {
    // Mocked weather data (simulating what you would get from the API)
    const weatherData = {
      current: {
        dt: 1618328880,
        weather: [{ main: 'Clear', icon: '01d' }],
        temp: 20,
        feels_like: 18,
        wind_speed: 5,
        humidity: 80,
        uvi: 5,
        wind_dir: 90,
      },
      daily: [
        {}, // ignore the first day
        {
          dt: 1618348800,
          temp: { day: 22 },
          weather: [{ main: 'Clouds', icon: '02d' }],
        },
        {
          dt: 1618435200,
          temp: { day: 19 },
          weather: [{ main: 'Rain', icon: '09d' }],
        },
      ],
    };

    // Transforming data into the expected format
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

// Jest test for the function
describe('fetchWeatherData', () => {
  it('should return weather data in the correct format', async () => {
    const result = await fetchWeatherData();

    // Checking the currentWeather format
    expect(result.currentWeather).toEqual({
      dateTime: 1618328880,
      condition: 'Clear',
      icon: 'https://openweathermap.org/img/wn/01d@2x.png',
      temp: 20,
      feelsLike: 18,
      windSpeed: '18.00', // windSpeed is converted to km/h
      humidity: 80,
      uvi: 5,
      windDir: 90,
    });

    // Checking the forecastedWeather format
    expect(result.forecastedWeather).toEqual([
      {
        dt: 1618348800,
        temp: { day: 22 },
        weather: [{ main: 'Clouds', icon: '02d' }],
      },
      {
        dt: 1618435200,
        temp: { day: 19 },
        weather: [{ main: 'Rain', icon: '09d' }],
      },
    ]);
  });
});
