import { formatLocalTime } from "@/utils/fetchWeatherData";
import Gemini from "@/components/Gemini"; // Adjust the import path as needed

const WeatherInfo = async ({ weatherData }:{weatherData:any}) => {
  return (
    <div className="min-h-screen bg-white text-black p-6">
      
      {/* Header: Location & Local Time */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold">
          📍 {weatherData.location.name}, {weatherData.location.region}
        </h2>
        <p className="text-gray-500">
          🕒 {formatLocalTime(weatherData.location.localtime)}
        </p>
      </div>

      {/* Weather Section */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 gap-6">
        {/* Current Weather Card */}
        {/* ... your existing code ... */}
        
        {/* Forecast Section */}
        {/* ... your existing code ... */}
      </div>

      {/* Add Gemini component here */}
      <Gemini weatherCondition={weatherData.currentWeather.condition.text} />
      
      {/* You can remove your old static recommendations section */}
      
      {/* Call-to-Action Button (if you want to keep it) */}
      <div className="flex justify-center mt-6">
        <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-blue-700">
          Plan My Workout →
        </button>
      </div>
      
    </div>
  );
};

export default WeatherInfo;