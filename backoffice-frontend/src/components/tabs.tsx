import React from 'react';
import clsx from 'clsx';

type TabItem = {
  label: string;
  count?: number;
};

type TabsProps = {
  tabs: TabItem[];
  selected: string;
  onChange: (tab: string) => void;
};

const Tabs: React.FC<TabsProps> = ({ tabs, selected, onChange }) => {
  return (
    <div className='bg-searchbar inline-flex items-center gap-2.5 rounded-full p-1'>
      {tabs.map(({ label, count }) => {
        const isActive = label === selected;

        return (
          <button
            key={label}
            onClick={() => onChange(label)}
            className={clsx(
              'text-h4_sb flex cursor-pointer items-center gap-1 rounded-full px-4 py-2 whitespace-nowrap transition-all duration-200',
              isActive ? 'text-primary bg-white shadow-sm' : 'text-unselected',
            )}
          >
            <span>{label}</span>
            {typeof count === 'number' && (
              <span
                className={clsx(
                  'ml-1 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-medium',
                  isActive ? 'bg-selectedoption_default text-primary' : 'text-subtext2 bg-token_bg',
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
