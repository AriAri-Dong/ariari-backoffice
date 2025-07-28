import React from 'react';

interface TextInputWithCounterProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength: number;
  className?: string;
}

const TextInputWithCounter: React.FC<TextInputWithCounterProps> = ({
  value,
  onChange,
  placeholder = '',
  maxLength,
  className = '',
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <input
        className='bg-searchbar text-mobile_body1_r text-text1 placeholder-subtext2 md:text-body1_r w-full rounded-xl px-4 py-3 focus:border focus:border-blue-500 focus:outline-none md:px-[22px] md:py-[13px]'
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
      />
      <div className='text-unselected text-mobile_body1_r absolute top-1/2 right-[22px] -translate-y-1/2'>
        {value.length}/{maxLength}
      </div>
    </div>
  );
};

export default TextInputWithCounter;
