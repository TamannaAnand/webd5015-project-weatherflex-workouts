'use client';
// Monthly workouts chart component
import { fetchMonthlyWorkouts } from '@/utils/fetchMetricData';
import { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


export const MonthlyWorkoutsChart = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await fetchMonthlyWorkouts();
      if (data) setMonthlyData(data as any);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-700">Workouts by Month</h3>
        <div className="p-2 bg-orange-100 rounded-full">
          <Calendar size={24} color="#f59e0b" />
        </div>
      </div>
      
      {loading ? (
        <div className="h-64 bg-gray-200 animate-pulse rounded"></div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} workouts`, 'Workouts']}
                labelFormatter={(label) => `${label}`}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};