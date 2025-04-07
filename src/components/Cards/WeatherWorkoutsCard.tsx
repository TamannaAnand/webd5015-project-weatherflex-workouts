'use client';
import { Cloud } from 'lucide-react';
import { fetchWeatherWorkouts } from '@/utils/fetchMetricData';
import { useEffect, useState } from 'react';

export const WeatherWorkoutsCard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await fetchWeatherWorkouts();
      if (data) setWeatherData(data);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md transition hover:shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            Completed Workouts by Weather Condition
          </h3>
        </div>
        <div className="p-3 bg-purple-100 rounded-full">
          <Cloud size={28} color="#8b5cf6" />
        </div>
      </div>

      {loading ? (
        <div className="h-40 bg-gray-100 animate-pulse rounded-lg" />
      ) : (
        <div className="space-y-3">
          {weatherData.length > 0 ? (
            weatherData.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <span className="font-medium text-gray-600">
                  {item.weather.toUpperCase()}
                </span>
                <span className="font-bold text-gray-800">{item.userCount}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No data available</p>
          )}
        </div>
      )}
    </div>
  );
};
