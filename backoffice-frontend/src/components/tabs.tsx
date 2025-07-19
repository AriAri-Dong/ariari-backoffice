import React from 'react';
import clsx from 'clsx';

type TabsProps = {
  tabs: string[];
  selected: string;
  onChange: (tab: string) => void;
};

const Tabs: React.FC<TabsProps> = ({ tabs, selected, onChange }) => {
  return (
    <div className='bg-searchbar inline-flex items-center gap-2.5 rounded-full p-1'>
      {tabs.map((tab) => {
        const isActive = tab === selected;

        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={clsx(
              'text-h4_sb cursor-pointer rounded-full px-4 py-2 whitespace-nowrap transition-all duration-200',
              isActive ? 'text-primary bg-white shadow-sm' : 'text-unselected',
            )}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
