import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { useState, useMemo, useEffect } from 'react';

import vector_left from '../../../assets/icons/vector_btn.svg';
import arrow from '../../../assets/icons/arrow_right.svg';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const generateRandomData = (): [number, number] => [
  Math.floor(Math.random() * 30 + 10), // 생성된
  Math.floor(Math.random() * 30 + 10), // 삭제된
];

const formatDate = (date: Date): string =>
  `${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;

const ClubCreateDeleteChart = () => {
  const [createdData, setCreatedData] = useState<[number, number]>(generateRandomData());
  const [deletedData, setDeletedData] = useState<[number, number]>(generateRandomData());
  const [currentDate, setCurrentDate] = useState(new Date());

  const today = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  }, []);

  const isToday = useMemo(() => {
    const cmp = new Date(currentDate);
    cmp.setHours(0, 0, 0, 0);
    return cmp.getTime() === today.getTime();
  }, [currentDate, today]);

  const handleDateChange = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'prev' ? -1 : 1));
    if (newDate > today) return;
    setCurrentDate(newDate);
  };

  useEffect(() => {
    setCreatedData(generateRandomData());
    setDeletedData(generateRandomData());
  }, [currentDate]);

  const chartData = useMemo(
    () => ({
      labels: ['분야', '지역'],
      datasets: [
        {
          label: '생성된 동아리',
          data: createdData,
          backgroundColor: '#589bff',
          borderRadius: 4,
          barThickness: 120,
        },
        {
          label: '삭제된 동아리',
          data: deletedData,
          backgroundColor: '#E3F0FF',
          borderRadius: 4,
          barThickness: 120,
        },
      ],
    }),
    [createdData, deletedData],
  );

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: '#ffffff',
          titleColor: '#589bff',
          bodyColor: '#7D8595',
          borderColor: '#ddd',
          borderWidth: 1,
          padding: 10,
        },
      },
      scales: {
        x: {
          stacked: true,
          grid: { display: false },
          ticks: { color: '#aaa', font: { size: 12 } },
        },
        y: {
          stacked: true,
          grid: { color: '#eee' },
          ticks: { color: '#aaa', font: { size: 12 }, stepSize: 10 },
        },
      },
    }),
    [],
  );

  return (
    <div className='flex h-full w-full flex-col justify-between'>
      {/* 날짜 */}
      <div className='text-text1 flex items-center justify-between'>
        <button onClick={() => handleDateChange('prev')}>
          <img
            src={vector_left}
            alt='prev'
            className='h-6 w-6 cursor-pointer'
          />
        </button>
        <span className='text-primary text-h3'>{formatDate(currentDate)}</span>
        <button
          onClick={() => handleDateChange('next')}
          disabled={isToday}
          className={isToday ? 'opacity-30' : 'cursor-pointer'}
        >
          <img
            src={vector_left}
            alt='next'
            className='h-6 w-6 rotate-180'
          />
        </button>
      </div>
      {/* 필터 선택 */}
      <div className='flex items-center justify-center gap-5'>
        <button className='flex cursor-pointer items-center gap-2'>
          <span className='text-subtext2 text-body1_m'>분야</span>
          <img
            src={arrow}
            alt='next'
            className='h-7 w-7 rotate-90'
          />
        </button>
        <button className='flex cursor-pointer items-center gap-2'>
          <span className='text-subtext2 text-body1_m'>지역</span>
          <img
            src={arrow}
            alt='next'
            className='h-7 w-7 rotate-90'
          />
        </button>
      </div>
      {/* 차트 */}
      <div className='h-[200px] w-full'>
        <Bar
          data={chartData}
          options={chartOptions}
        />
      </div>
      <div className='flex w-full flex-col gap-2 px-2 pb-1'>
        <div className='flex w-full items-center justify-between gap-2'>
          <div className='flex items-center gap-3'>
            <span className='bg-primary inline-block h-4 w-4 rounded-full' />
            <span className='text-subtext1 text-body2_m'>생성된 동아리</span>
          </div>
          <span className='text-body1_m text-text1'>30개</span>
        </div>
        <div className='flex w-full items-center justify-between gap-2'>
          <div className='flex items-center gap-3'>
            <span className='bg-selectedoption_hover inline-block h-4 w-4 rounded-full' />
            <span className='text-subtext1 text-body2_m'>삭제된 동아리</span>
          </div>
          <span className='text-body1_m text-text1'>02개</span>
        </div>
      </div>
    </div>
  );
};

export default ClubCreateDeleteChart;
