import Card from 'react';

const WorkoutRecommendations = () => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Recommended Workouts - TEST</h3>
    <ul className="list-disc pl-5 space-y-2">
      {workouts.map((workout, index) => (
        <li key={index} >{workout.name}: {workout.description}</li>
      ))}
    </ul>
  </div>
);

export default WorkoutRecommendations;

const workouts = [
  {
    name: "Pushups",
    description: "Do 3 sets of 10 pushups"
  },
  {
    name: "Squats",
    description: "Do 3 sets of 10 squats"
  },
  {
    name: "Planks",
    description: "Hold a plank for 30 seconds"
  }
]