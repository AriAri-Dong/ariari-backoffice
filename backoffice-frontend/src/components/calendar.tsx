import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import CalendarIcon from '../assets/icons/calendar.svg';

const formatDate = (date: Date | null) =>
  date ? date.toISOString().slice(0, 10).replace(/-/g, '.') : '';

type Props = {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (range: [Date | null, Date | null]) => void;
};

const Calendar = ({ startDate, endDate, onChange }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className='relative inline-block'
    >
      <div
        onClick={() => setOpen((prev) => !prev)}
        className='bg-background border-menuborder flex cursor-pointer items-center gap-3 rounded-full border py-2.5 pr-[14px] pl-5'
      >
        <p className='text-body1_m text-subtext1'>
          {startDate && endDate ? `${formatDate(startDate)} ~ ${formatDate(endDate)}` : '조회 기간'}
        </p>
        <img
          src={CalendarIcon}
          alt='달력'
          className='h-6 w-6'
        />
      </div>

      {open && (
        <div className='absolute left-0 z-10 mt-2 rounded-lg bg-white shadow-lg'>
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={(range: [Date | null, Date | null]) => {
              onChange(range);
              if (range[0] && range[1]) {
                setOpen(false);
              }
            }}
            inline
          />
        </div>
      )}
    </div>
  );
};

export default Calendar;
