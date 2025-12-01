import { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import vector_left from '../../../assets/icons/vector_btn.svg';
import arrow from '../../../assets/icons/arrow_right.svg';
import { getClubStatistics } from '../../../apis/dashboard/api';
import type {
  ClubCategory,
  ClubRegion,
  ClubStatisticsResponse,
  GetClubStatisticsParams,
} from '../../../types/api/dashboard';
import { isApiError } from '../../../utils/typeGuard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const formatDateDisplay = (date: Date): string =>
  `${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;

const formatDateApi = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

const CATEGORY_OPTIONS: { label: string; value: ClubCategory }[] = [
  { label: '전체', value: 'All' },
  { label: '문화', value: 'CULTURE' },
  { label: '봉사', value: 'VOLUNTEER' },
  { label: '스터디', value: 'STUDY' },
  { label: '창업', value: 'STARTUP' },
  { label: '취업', value: 'EMPLOYMENT' },
  { label: '체육', value: 'SPORTS' },
  { label: '친목', value: 'AMITY' },
  { label: '기타', value: 'ETC' },
];

const REGION_OPTIONS: { label: string; value: ClubRegion }[] = [
  { label: '전체', value: 'All' },
  { label: '서울/경기', value: 'SEOUL_GYEONGGI' },
  { label: '충청', value: 'CHUNGCHEONG' },
  { label: '경남', value: 'GYEONGNAM' },
  { label: '경북', value: 'GYEONGBUK' },
  { label: '전남', value: 'JEONNAM' },
  { label: '전북', value: 'JEONBUK' },
  { label: '강원', value: 'GANGWON' },
  { label: '제주', value: 'JEJU' },
  { label: '해외', value: 'FOREIGN' },
];

export default function ClubCreateDeleteChart() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [category, setCategory] = useState<ClubCategory>('All');
  const [region, setRegion] = useState<ClubRegion>('All');
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const [labels, setLabels] = useState<string[]>([]);
  const [created, setCreated] = useState<number[]>([]);
  const [deleted, setDeleted] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);

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

  const handleDateChange = (dir: 'prev' | 'next') => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + (dir === 'prev' ? -1 : 1));
    if (nextDate > today) return;
    setCurrentDate(nextDate);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);

    const params: GetClubStatisticsParams = {
      date: formatDateApi(currentDate),
      category: category,
      region: region,
    };

    console.log('[getClubStatistics params]', params);
    const res = await getClubStatistics(params);

    if (isApiError(res)) {
      setErrorMsg(res.message || '데이터를 불러올 수 없습니다.');
      setLoading(false);
      return;
    }

    if (!res || typeof res !== 'object' || Array.isArray(res)) {
      setErrorMsg('응답 형식이 잘못되었습니다.');
      setLoading(false);
      return;
    }

    const data = res as ClubStatisticsResponse;
    setLabels(data.labels || []);
    setCreated(data.createdCount || []);
    setDeleted(data.deletedCount || []);
    setLoading(false);
  }, [currentDate, category, region]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: '생성된 동아리',
          data: created,
          backgroundColor: '#589bff',
          borderRadius: 4,
          barThickness: 120,
        },
        {
          label: '삭제된 동아리',
          data: deleted,
          backgroundColor: '#E3F0FF',
          borderRadius: 4,
          barThickness: 120,
        },
      ],
    }),
    [labels, created, deleted],
  );

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: '#fff',
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

  const totalCreated = sum(created);
  const totalDeleted = sum(deleted);

  return (
    <div className='relative flex h-full w-full flex-col justify-between'>
      {/* 날짜 */}
      <div className='text-text1 relative flex items-center justify-between'>
        {/* 이전 날짜 버튼 */}
        <button onClick={() => handleDateChange('prev')}>
          <img
            src={vector_left}
            alt='prev'
            className='h-6 w-6 cursor-pointer'
          />
        </button>

        {/* 날짜 클릭 시 DatePicker 열림 */}
        <span
          className='text-primary text-h3 cursor-pointer'
          onClick={() => setShowDatePicker((prev) => !prev)}
        >
          {formatDateDisplay(currentDate)}
        </span>

        {/* 다음 날짜 버튼 */}
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

        {/* DatePicker (input date) */}
        {showDatePicker && (
          <div className='absolute top-10 left-1/2 z-20 -translate-x-1/2'>
            <input
              type='date'
              value={formatDateApi(currentDate)}
              className='rounded-md border border-gray-300 bg-white px-3 py-1 shadow'
              max={formatDateApi(today)}
              onChange={(e) => {
                const newDate = new Date(e.target.value);
                setCurrentDate(newDate);
                setShowDatePicker(false);
              }}
            />
          </div>
        )}
      </div>

      {/* 필터 영역 */}
      <div className='relative mt-2 flex items-center justify-center gap-8'>
        {/* 분야 */}
        <div className='relative'>
          <button
            className='flex items-center gap-2'
            onClick={() => setShowCategoryDropdown((prev) => !prev)}
          >
            <span className='text-subtext2 text-body1_m'>
              {CATEGORY_OPTIONS.find((opt) => opt.value === category)?.label || '분야'}
            </span>
            <img
              src={arrow}
              alt='category'
              className='h-7 w-7 rotate-90'
            />
          </button>
          {showCategoryDropdown && (
            <ul
              className='absolute top-8 left-0 z-10 w-28 rounded-lg border border-gray-200 bg-white shadow-md'
              onMouseLeave={() => setShowCategoryDropdown(false)}
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <li
                  key={opt.value}
                  className={`cursor-pointer px-3 py-2 text-sm hover:bg-blue-50 ${
                    opt.value === category ? 'text-primary font-medium' : ''
                  }`}
                  onClick={() => {
                    setCategory(opt.value);
                    setShowCategoryDropdown(false);
                  }}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 지역 */}
        <div className='relative'>
          <button
            className='flex items-center gap-2'
            onClick={() => setShowRegionDropdown((prev) => !prev)}
          >
            <span className='text-subtext2 text-body1_m'>
              {REGION_OPTIONS.find((opt) => opt.value === region)?.label || '지역'}
            </span>
            <img
              src={arrow}
              alt='region'
              className='h-7 w-7 rotate-90'
            />
          </button>
          {showRegionDropdown && (
            <ul
              className='absolute top-8 left-0 z-10 w-28 rounded-lg border border-gray-200 bg-white shadow-md'
              onMouseLeave={() => setShowRegionDropdown(false)}
            >
              {REGION_OPTIONS.map((opt) => (
                <li
                  key={opt.value}
                  className={`cursor-pointer px-3 py-2 text-sm hover:bg-blue-50 ${
                    opt.value === region ? 'text-primary font-medium' : ''
                  }`}
                  onClick={() => {
                    setRegion(opt.value);
                    setShowRegionDropdown(false);
                  }}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 차트 */}
      <div className='mt-3 h-[200px] w-full'>
        {loading ? (
          <div className='text-subtext2 text-body2_r flex h-full items-center justify-center'>
            불러오는 중...
          </div>
        ) : errorMsg ? (
          <div className='text-body2_r flex h-full items-center justify-center text-red-500'>
            {errorMsg}
          </div>
        ) : (
          <Bar
            data={chartData}
            options={chartOptions}
          />
        )}
      </div>

      {/* 하단 요약 */}
      <div className='mt-2 flex w-full flex-col gap-2 px-2 pb-1'>
        <div className='flex w-full items-center justify-between gap-2'>
          <div className='flex items-center gap-3'>
            <span className='bg-primary inline-block h-4 w-4 rounded-full' />
            <span className='text-subtext1 text-body2_m'>생성된 동아리</span>
          </div>
          <span className='text-body1_m text-text1'>{loading ? '...' : `${totalCreated}개`}</span>
        </div>
        <div className='flex w-full items-center justify-between gap-2'>
          <div className='flex items-center gap-3'>
            <span
              className='inline-block h-4 w-4 rounded-full'
              style={{ backgroundColor: '#E3F0FF' }}
            />
            <span className='text-subtext1 text-body2_m'>삭제된 동아리</span>
          </div>
          <span className='text-body1_m text-text1'>{loading ? '...' : `${totalDeleted}개`}</span>
        </div>
      </div>
    </div>
  );
}
