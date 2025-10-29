import React from 'react';

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 3L9.25 8.75L3.5 10L9.25 11.25L12 17L14.75 11.25L20.5 10L14.75 8.75L12 3Z" />
    <path d="M5 3L6 5" />
    <path d="M19 13L18 15" />
    <path d="M12 17L10 18" />
    <path d="M7 18L5 19" />
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 md:px-6">
        <div className="flex items-center space-x-3">
          <SparklesIcon className="h-8 w-8 text-indigo-400" />
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-50">Gemini Image Studio</h1>
            <p className="text-sm text-slate-400">Create and Edit with the Power of AI</p>
          </div>
        </div>
      </div>
    </header>
  );
};
