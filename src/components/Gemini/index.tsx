'use client'
import React, { useState, useEffect, useCallback, ReactElement } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
 
const Gemini = () => {
  const [response, setResponse] = useState('');
  const [formattedResponse, setFormattedResponse] = useState<ReactElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [exerciseType, setExerciseType] = useState('both');
  const [weatherCondition, setWeatherCondition] = useState('');
 
  useEffect(() => {
    const storedWeather = localStorage.getItem('weatherCondition');
    if (storedWeather) {
      setWeatherCondition(storedWeather);
    } else {
      // Fallback weather if none is stored
      setWeatherCondition('sunny');
      localStorage.setItem('weatherCondition', 'sunny');
    }
  }, []);
 
  // Format the response to improve readability
  const formatResponse = (text: string): ReactElement => {
    // Remove markdown asterisks
    let formatted = text.replace(/\*\*\*/g, '');
    formatted = formatted.replace(/\*\*/g, '');
    formatted = formatted.replace(/\*/g, '');
    // Split by categories
    const sections = formatted.split(/(?=\b(?:Cardio|Strength Training|Other))/g);
    // Create HTML with proper formatting
    return (
      <div className="space-y-4">
        {sections.map((section, index) => {
          if (!section.trim()) return null;
          // Split the section title from content
          const sectionParts = section.trim().split(':');
          const title = sectionParts[0];
          const content = sectionParts.slice(1).join(':');
          // If this is not a section with a title, just return the content
          if (sectionParts.length === 1) {
            return <p key={index}>{section}</p>;
          }
          // Split exercises into list items
          const exercises = content.split(/(?=\b[A-Z][a-z]+:)/g)
            .filter(ex => ex.trim());
          return (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-blue-600 mb-2">{title}</h3>
              <ul className="space-y-2">
                {exercises.map((exercise, exIdx) => {
                  // Split the exercise name from description
                  const exerciseParts = exercise.trim().split(':');
                  const exName = exerciseParts[0];
                  const exDesc = exerciseParts.slice(1).join(':');
                  return (
                    <li key={exIdx} className="ml-4">
                      <span className="font-semibold">{exName}:</span>
                      {exDesc}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    );
  };
 
  const generateContent = useCallback(async () => {
    if (!weatherCondition) {
      setError('Weather condition not available');
      return;
    }
 
    setLoading(true);
    setError('');
    try {
      // Get API key from environment variables
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
          maxOutputTokens: 500,
          candidateCount: 1
        }
      });
      // Enhanced prompt to request better formatting
      const prompt = `
      The weather today is ${weatherCondition}. Please provide ${
        exerciseType === 'indoor' ? 'indoor' : 
        exerciseType === 'outdoor' ? 'outdoor' : 
        'indoor & outdoor'
      } exercises appropriate for this weather.
 
      Structure your response with these clear categories:
      - Cardio: List exercises with brief descriptions
      - Strength Training: List exercises with brief descriptions
      - Other: List additional activities with brief descriptions
 
      For each exercise, include a name followed by a brief description.
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
  }, [exerciseType, weatherCondition]);
 
  // Handle exercise type button clicks
  const handleExerciseTypeChange = (type: string) => {
    setExerciseType(type);
    // We don't automatically generate content here anymore
  };
 
  return (
    <div className="p-4 bg-white shadow-lg rounded-xl max-w-3xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Exercise Recommendations for {weatherCondition} Weather</h2>
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
            className={`px-4 py-2 text-sm font-medium ${
              exerciseType === 'both' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            onClick={() => handleExerciseTypeChange('both')}
          >
            Both
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
      {/* Debug information */}
      <div className="mb-4 p-3 bg-gray-100 border rounded-lg text-sm">
        <p><strong>Weather:</strong> {weatherCondition || 'Not set'}</p>
        <p><strong>Exercise Type:</strong> {exerciseType}</p>
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
 
export default Gemini;