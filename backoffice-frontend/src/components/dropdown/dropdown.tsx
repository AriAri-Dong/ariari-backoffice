import { useState, useEffect, useRef } from 'react';
import VectorIcon from '../../assets/icons/mini_vector.svg';

type Option = {
  label: string;
  value: string;
};

type DropdownProps = {
  options: Option[];
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: Option) => void;
};

const Dropdown = ({
  options,
  required = false,
  placeholder = '선택하세요',
  value,
  onChange,
}: DropdownProps) => {
  const [selected, setSelected] = useState<Option | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 필수 선택일 경우 첫 번째 옵션 자동 선택
  useEffect(() => {
    if (required && options.length > 0) {
      setSelected(options[0]);
    }
  }, [required, options]);

  useEffect(() => {
    if (value) {
      const matched = options.find((opt) => opt.value === value) || null;
      setSelected(matched);
    } else {
      setSelected(null);
    }
  }, [value, options]);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleSelect = (option: Option) => {
    setSelected(option);
    setOpen(false);
    onChange?.(option);
  };

  return (
    <div
      className='relative inline-block'
      ref={containerRef}
    >
      {/* 드롭다운 버튼 */}
      <div
        className={`flex cursor-pointer items-center justify-between gap-2 rounded-full border py-2.5 pr-[14px] pl-5 whitespace-nowrap ${
          selected
            ? `bg-selectedoption_default border-selectedoption_border hover:bg-selectedoption_hover focus:bg-selectedoption_pressed`
            : `border-menuborder hover:bg-hover focus:bg-pressed bg-white`
        }`}
        onClick={toggleDropdown}
      >
        <p className={`text-body1_m ${selected ? 'text-primary' : 'text-subtext1'}`}>
          {selected ? selected.label : placeholder}
        </p>
        <img
          src={VectorIcon}
          alt='화살표'
          className='h-6 w-6 shrink-0'
        />
      </div>

      {/* 드롭다운 메뉴 */}
      {open && (
        <ul className='border-menuborder shadow-default absolute left-0 z-10 mt-2 w-full rounded-lg border bg-white'>
          {options.map((option, index) => (
            <li
              key={option.value}
              className={`cursor-pointer px-4 py-2.5 text-center ${index === 0 ? 'rounded-t-lg' : ''} ${index === options.length - 1 ? 'rounded-b-lg' : ''} ${index !== 0 ? 'border-menuborder border-t' : ''} ${
                selected?.value === option.value
                  ? 'bg-selectedoption_default text-primary border-primary border'
                  : 'hover:bg-hover text-subtext1'
              }`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
