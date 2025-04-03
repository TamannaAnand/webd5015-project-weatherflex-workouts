'use client'
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const WorkoutTracker = ({ weatherData }: { weatherData: any }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const { data: session } = useSession();
  const subscriptionStatus = session?.user?.subscriptionStatus;

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      setTimer(interval);
    } else if (timer) {
      clearInterval(timer);
      setTimer(null);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning]);

  const handleCompleteWorkout = () => {
    toast.success(`🔥 Great job completing your ${weatherData?.currentWeather?.condition} workout!`);
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl dark:bg-gray-800 w-full max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-4">
        Workout Tracker
      </h1>

      <div className="flex flex-col items-center space-y-4">
        {/* Timer Display */}
        <div className="flex items-center justify-center w-full py-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-2xl font-bold text-gray-900 dark:text-white">
          ⏱ {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")} min
        </div>

        {/* Buttons */}
        <div className="flex space-x-3">
          <button
            className={`px-5 py-2 text-white font-semibold rounded-lg transition ${
              isRunning
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
            onClick={() => setIsRunning(true)}
            disabled={isRunning}
          >
            Start
          </button>
          <button
            className={`px-5 py-2 text-white font-semibold rounded-lg transition ${
              !isRunning
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
            onClick={() => setIsRunning(false)}
            disabled={!isRunning}
          >
            Stop
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 px-5 py-2 text-white font-semibold rounded-lg transition"
            onClick={handleCompleteWorkout}
          >
            Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutTracker;
