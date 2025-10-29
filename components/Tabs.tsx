import React from 'react';

export type Tab = 'generate' | 'edit';

interface TabsProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { id: Tab; label: string }[] = [
    { id: 'generate', label: 'Generate Image' },
    { id: 'edit', label: 'Edit Image' },
  ];

  return (
    <div className="flex space-x-2 bg-slate-900 p-1 rounded-lg border border-slate-700">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`w-full py-2.5 text-sm font-medium leading-5 rounded-md transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-white
            ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
