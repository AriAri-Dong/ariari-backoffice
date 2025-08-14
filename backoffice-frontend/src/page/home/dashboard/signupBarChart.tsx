import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

import arrow from '../../../assets/icons/arrow_right.svg';
import { useEffect, useMemo, useState } from 'react';

const labels = Array.from({ length: 31 }, (_, i) => `${i + 1}`);

const options = {
  responsive: true,
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

const generateRandomData = () => labels.map(() => Math.floor(Math.random() * 100));

const formatDate = (date: Date) =>
  `${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;

const SignupBarChart = () => {
  const [chartData, setChartData] = useState<number[]>(generateRandomData());
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
        label: '가입자 수',
        data: chartData,
        backgroundColor: '#589bff',
        borderRadius: 3,
        barPercentage: 0.35,
      },
    ],
  };

  return (
    <div className='flex h-full w-full flex-col gap-10'>
      <h2 className='text-primary text-h3 mb-2 text-center'>회원가입/삭제 추이</h2>

      <div className='flex w-full gap-[30px]'>
        {/* 왼쪽 요약 영역 - 고정 너비 */}
        <div className='flex w-[70px] flex-col justify-center gap-[30px] whitespace-nowrap'>
          <div className='flex flex-col text-center'>
            <p className='text-subtext2 text-body2_r'>오늘 가입자</p>
            <p className='text-text1 text-body3_sb'>000명</p>
          </div>
          <div className='flex flex-col text-center'>
            <p className='text-subtext2 text-body2_r'>월 가입자</p>
            <p className='text-text1 text-body3_sb'>000명</p>
          </div>
          <div className='flex flex-col text-center'>
            <p className='text-subtext2 text-body2_r'>오늘 탈퇴자</p>
            <p className='text-text1 text-body3_sb'>000명</p>
          </div>
          <div className='flex flex-col text-center'>
            <p className='text-subtext2 text-body2_r'>월 탈퇴자</p>
            <p className='text-text1 text-body3_sb'>000명</p>
          </div>
        </div>

        {/* 오른쪽 차트 영역 - 남은 공간 모두 사용 */}
        <div className='flex flex-1 flex-col gap-[30px]'>
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

          <div className='h-[200px] w-full'>
            <Bar
              data={data}
              options={options}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupBarChart;
