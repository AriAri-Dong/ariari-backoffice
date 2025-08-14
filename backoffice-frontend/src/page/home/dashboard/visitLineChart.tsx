import { Line } from 'react-chartjs-2';
import type { TooltipItem } from 'chart.js';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useMemo, useState } from 'react';

// ICONS
import check from '../../../assets/icons/check_active.svg';
import uncheck from '../../../assets/icons/check_inactive.svg';
import arrow from '../../../assets/icons/arrow_right.svg';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const labels = Array.from({ length: 24 }, (_, i) => `${i}`);

const generateRandomData = () => labels.map(() => Math.floor(Math.random() * 100));

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
      backgroundColor: '#ffffff',
      titleColor: '#589bff',
      bodyColor: '#7D8595',
      borderColor: '#ddd',
      borderWidth: 1,
      padding: 10,
      callbacks: {
        title: (tooltipItems: TooltipItem<'line'>[]) => {
          return `${tooltipItems[0].label}시`;
        },
        label: (tooltipItem: TooltipItem<'line'>) => {
          return `${tooltipItem.dataset.label}: ${tooltipItem.formattedValue}명`;
        },
      },
    },
  },
  scales: {
    x: {
      ticks: { color: '#888' },
      grid: { display: false },
    },
    y: {
      ticks: { color: '#888' },
      grid: { color: '#eee' },
    },
  },
  maintainAspectRatio: false,
};

const FILTERS = ['오늘', '어제', '일주일', '한 달'];

const formatDate = (date: Date) =>
  `${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;

const VisitLineChart = () => {
  const [chartData, setChartData] = useState<number[]>(generateRandomData());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeFilter, setActiveFilter] = useState('오늘');

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

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleDateChange = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'prev' ? -1 : 1));
    // 오늘 이후는 이동 불가
    if (newDate > today) return;

    setCurrentDate(newDate);
  };

  useEffect(() => {
    setChartData(generateRandomData());
  }, [currentDate]);

  const data = {
    labels,
    datasets: [
      {
        label: '방문자수',
        data: chartData,
        borderColor: '#589bff',
        backgroundColor: 'rgba(76,145,255,0.1)',
        tension: 0.3,
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  return (
    <div className='flex h-full w-full flex-col justify-between'>
      {/* 타이틀 */}
      <h2 className='text-primary text-h3 mb-2 text-center'>방문자수</h2>

      {/* 날짜 + 필터 영역 */}
      <div className='mb-2 flex items-center justify-between px-2'>
        {/* 날짜 */}
        <div className='text-text1 flex items-center gap-2'>
          <button onClick={() => handleDateChange('prev')}>
            <img
              src={arrow}
              alt='prev'
              className='h-7 w-7 rotate-180 cursor-pointer'
            />
          </button>
          <span className='text-subtext1 text-h4'>{formatDate(currentDate)}</span>
          <button
            onClick={() => handleDateChange('next')}
            disabled={isToday}
            className={isToday ? 'opacity-30' : 'cursor-pointer'}
          >
            <img
              src={arrow}
              alt='next'
              className='h-7 w-7'
            />
          </button>
        </div>

        {/* 체크박스 영역 */}
        <div className='text-subtext1 text-body2_m flex items-center gap-4'>
          {FILTERS.map((filter) => (
            <button
              key={filter}
              className='flex cursor-pointer items-center gap-1'
              onClick={() => handleFilterClick(filter)}
            >
              <img
                src={activeFilter === filter ? check : uncheck}
                alt={filter}
                className='h-5 w-5'
              />
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* 차트 */}
      <div className='h-[200px] w-full'>
        <Line
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default VisitLineChart;
