'use client'
import React, { useState, useCallback, ReactElement } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
 
const FreeGemini = ({ weatherData }: { weatherData?: any }) => {
  const [response, setResponse] = useState('');
  const [formattedResponse, setFormattedResponse] = useState<ReactElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [exerciseType, setExerciseType] = useState('indoor');
  
  // Extract weather condition from props or use default
  const getWeatherCondition = () => {
    if (!weatherData || !weatherData.currentWeather) {
      return 'mild';
    }
    
    const condition = weatherData.currentWeather.condition.toLowerCase();
    
    if (condition.includes('rain') || condition.includes('drizzle')) {
      return 'rainy';
    } else if (condition.includes('snow')) {
      return 'snowy';
    } else if (condition.includes('cloud')) {
      return 'cloudy';
    } else if (condition.includes('clear') || condition.includes('sun')) {
      return 'sunny';
    } else if (condition.includes('fog') || condition.includes('mist')) {
      return 'foggy';
    } else if (condition.includes('storm') || condition.includes('thunder')) {
      return 'stormy';
    } else {
      return 'mild';
    }
  };
  
  // Updated format response to handle structured response
  const formatResponse = (text: string): ReactElement => {
    // Remove markdown formatting
    let formatted = text.replace(/\*\*\*/g, '').replace(/\*\*/g, '').replace(/\*/g, '');
    
    // Split the response into individual exercises
    const exercises = formatted.split('\n').filter(line => line.trim() !== '');
    
    return (
      <div className="space-y-4">
        <ul className="bg-gray-50 p-4 rounded-lg space-y-3">
          {exercises.map((exercise, index) => {
            // Split each exercise into name and description
            const [name, description] = exercise.split(':').map(part => part.trim());
            return (
              <li key={index} className="bg-white p-3 rounded shadow-sm">
                <span className="font-semibold block mb-1">{name}:</span>
                <span className="text-gray-700">{description}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
 
  const generateContent = useCallback(async () => {
    const weatherCondition = getWeatherCondition();
    if (!weatherCondition) {
      setError('Weather condition not available');
      return;
    }
 
    setLoading(true);
    setError('');
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      if (!apiKey) {
        setError('API key not found. Make sure NEXT_PUBLIC_GEMINI_API_KEY is set in your environment variables.');
        console.error('API key not found');
        setLoading(false);
        return;
      }
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-pro',
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
          candidateCount: 1
        }
      });
      
      const temperature = weatherData?.currentWeather?.temp 
        ? `${weatherData.currentWeather.temp}°C` 
        : 'moderate';
      
      const prompt = `
      IMPORTANT: Provide a detailed response following this EXACT format:

      EXERCISE NAME: Write a comprehensive description that includes:
      1. What the exercise involves
      2. Specific steps to perform the exercise
      3. Benefits of the exercise
      4. Any modifications or tips for performing the exercise safely

      Context:
      - Weather condition: ${weatherCondition}
      - Temperature: ${temperature}
      - Exercise type: ${exerciseType === 'indoor' ? 'Indoor' : 'Outdoor'}

      Detailed Instructions:
      - Provide EXACTLY 3 different exercises
      - Each exercise MUST have a full, detailed description
      - Descriptions should be 3-4 sentences long
      - Tailor exercises to the current weather and indoor/outdoor preference
      - Focus on exercises that are safe and effective given the weather conditions

      STRICT FORMATTING REQUIREMENT:
      Ensure your response uses this EXACT format:
      Exercise Name: Full, comprehensive description explaining what the exercise is, how to do it, its benefits, and any important tips.
      Next Exercise Name: Full, comprehensive description explaining what the exercise is, how to do it, its benefits, and any important tips.
      Final Exercise Name: Full, comprehensive description explaining what the exercise is, how to do it, its benefits, and any important tips.
      `;
      
      console.log('Sending prompt to Gemini API:', prompt);
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      console.log('Received response:', responseText);
      setResponse(responseText);
      setFormattedResponse(formatResponse(responseText));
    } catch (err: any) {
      setError(`Error: ${err.message || 'Unknown error occurred'}`);
      console.error('Gemini API error:', err);
    } finally {
      setLoading(false);
    }
  }, [exerciseType, weatherData]);
 
  // Handle exercise type button clicks
  const handleExerciseTypeChange = (type: string) => {
    setExerciseType(type);
  };
 
  return (
    <div className="bg-white shadow-lg rounded-xl max-w-3xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Exercise Recommendations for {getWeatherCondition()} Weather</h2>
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              exerciseType === 'indoor' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            onClick={() => handleExerciseTypeChange('indoor')}
          >
            Indoor Exercises
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              exerciseType === 'outdoor' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            onClick={() => handleExerciseTypeChange('outdoor')}
          >
            Outdoor Exercises
          </button>
        </div>
      </div>
      
      {/* Generate button */}
      <div className="mb-4">
        <button 
          onClick={generateContent}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Generate Recommendations
        </button>
      </div>
      
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {!loading && formattedResponse && (
        <div className="mt-4">
          <div className="p-4 bg-gray-100 border rounded-lg">
            {formattedResponse}
          </div>
        </div>
      )}
    </div>
  );
}
 
export default FreeGemini;