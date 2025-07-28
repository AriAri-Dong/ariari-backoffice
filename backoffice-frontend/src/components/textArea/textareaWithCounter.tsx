import React from 'react';

interface TextInputWithCounterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength: number;
  className?: string;
}

const TextareaWithCounter: React.FC<TextInputWithCounterProps> = ({
  value,
  onChange,
  placeholder = '',
  maxLength,
  className = '',
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <textarea
        className='bg-searchbar text-mobile_body1_r text-text1 placeholder-subtext2 min-h-[161px] w-full resize-none rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none'
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={handleInputChange}
      />
      <div className='text-unselected text-mobile_body1_r absolute right-4 bottom-4'>
        {value.length}/{maxLength}
      </div>
    </div>
  );
};

export default TextareaWithCounter;
