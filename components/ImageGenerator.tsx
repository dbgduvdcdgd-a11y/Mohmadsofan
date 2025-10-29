import React, { useState } from 'react';

interface ImageGeneratorProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

export const ImageGenerator: React.FC<ImageGeneratorProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="generate-prompt" className="block text-sm font-medium text-slate-300 mb-2">
          Describe the image you want to create
        </label>
        <textarea
          id="generate-prompt"
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          placeholder="e.g., A majestic lion wearing a crown, photorealistic, 4k"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !prompt.trim()}
        className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : 'Generate'}
      </button>
    </form>
  );
};
