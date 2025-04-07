// utils/metricData.ts

// Function to fetch total number of users
export const fetchUserCount = async () => {
  try {
    const response = await fetch("/api/metrics/users/count");
    
    if (!response.ok) {
      throw new Error(`Failed to fetch user count: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user count:", error);
    return null;
  }
};

// Function to fetch total number of workouts
export const fetchWorkoutCount = async () => {
  try {
    const response = await fetch("/api/metrics/workouts/count");
    
    if (!response.ok) {
      throw new Error(`Failed to fetch workout count: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching workout count:", error);
    return null;
  }
};

// Function to fetch monthly workouts for the current year
export const fetchMonthlyWorkouts = async () => {
  try {
    const response = await fetch("/api/metrics/workouts/monthly");

    if (!response.ok) {
      throw new Error(`Failed to fetch monthly workouts: ${response.status}`);
    }

    const data = await response.json();
    return data; // Already formatted correctly
  } catch (error) {
    console.error("Error fetching monthly workouts:", error);
    return [];
  }
};


// Function to fetch workouts by weather condition for the current month
export const fetchWeatherWorkouts = async () => {
  try {
    const response = await fetch("/api/metrics/workouts/weather");
    
    if (!response.ok) {
      throw new Error(`Failed to fetch weather workouts: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather workouts:", error);
    return [];
  }
};