'use client'
import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Define proper TypeScript props interface
interface GeminiProps {
  weatherCondition: string;
}

const Gemini: React.FC<GeminiProps> = ({ weatherCondition }) => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [exerciseType, setExerciseType] = useState('both'); // 'indoor', 'outdoor', or 'both'

  // Auto-generate the prompt based on weather condition
  const generatePrompt = () => {
    return `The weather today is ${weatherCondition}. Can you recommend ${
      exerciseType === 'indoor' ? 'indoor' : 
      exerciseType === 'outdoor' ? 'outdoor' : 
      'indoor & outdoor'
    } exercises that would be appropriate for this weather?`;
  };

  const generateContent = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Use environment variable for API key
      const apiKey = process.env.NEXT_PUBLIC_API_KEY!;
      
      if (!apiKey) {
        throw new Error('API key not found.');
      }
      
      // Initialize the Gemini API
      const genAI = new GoogleGenerativeAI(apiKey);
      
      // Create the model with configuration
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-pro',
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
          candidateCount: 1
        }
      });
      
      // Generate content using auto-generated prompt
      const prompt = generatePrompt();
      const result = await model.generateContent(prompt);
      setResponse(result.response.text());
    } catch (err: any) {
      setError(`An error occurred: ${err}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Generate content when exercise type changes
  useEffect(() => {
    if (weatherCondition) {
      generateContent();
    }
  }, [exerciseType, weatherCondition]);

  return (
    <div className="p-4 bg-white shadow-lg rounded-xl max-w-3xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Exercise Recommendations</h2>
      
      {/* Exercise Type Selection */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              exerciseType === 'indoor' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            onClick={() => setExerciseType('indoor')}
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
            onClick={() => setExerciseType('both')}
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
            onClick={() => setExerciseType('outdoor')}
          >
            Outdoor Exercises
          </button>
        </div>
      </div>
      
      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      
      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {/* AI Response */}
      {response && !loading && (
        <div className="mt-4">
          <div className="p-4 bg-gray-100 border rounded-lg">
            <div className="prose max-w-none">
              {response}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gemini;