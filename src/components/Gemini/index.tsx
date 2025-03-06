'use client'
import React, { useState } from 'react';
// import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';


// dotenv.config();
const Gemini = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


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
      
      // Generate content
      const result = await model.generateContent(prompt);
      setResponse(result.response.text());
    } catch (err) {
      setError(`An error occurred: ${err}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">AI Generator Exercises</h1>
      
      <div className="mb-4">
        <label htmlFor="prompt" className="block mb-2">Response:</label>
        <textarea 
          id="prompt"
          className="w-full p-2 border rounded"
          rows={4}
          value={prompt}
          placeholder='The weather today is sunny can you recommend indoor & outdoor exercises.'
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        onClick={generateContent}
        disabled={loading || !prompt.trim()}
      >
        {loading ? 'Generating...' : 'Generate Response'}
      </button>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {response && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Response:</h2>
          <div className="p-3 bg-gray-100 border rounded">
            {response}
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default Gemini;