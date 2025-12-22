import { useEffect, useMemo, useState, useCallback } from 'react';
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

import check from '../../../assets/icons/check_active.svg';
import uncheck from '../../../assets/icons/check_inactive.svg';
import arrow from '../../../assets/icons/arrow_right.svg';
import { getVisitTrend } from '../../../apis/dashboard/api';
import { isApiError } from '../../../utils/typeGuard';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

// 화면에 보여줄 날짜 (MM.DD)
const formatDateDisplay = (date: Date) =>
  `${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;

// API 파라미터용 날짜 (YYYY-MM-DD)
const formatDateApi = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

// 필터 라벨들 (UI)
const FILTERS = ['오늘', '어제', '일주일', '한 달'] as const;
type UiFilter = (typeof FILTERS)[number];

// UI 필터 → API range 매핑
const FILTER_TO_RANGE: Record<UiFilter, 'today' | 'yesterday' | 'week' | 'month'> = {
  오늘: 'today',
  어제: 'yesterday',
  일주일: 'week',
  '한 달': 'month',
};

const VisitLineChart = () => {
  // 차트 데이터 상태
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [chartValues, setChartValues] = useState<number[]>([]);

  // 날짜/필터 UI 상태
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [activeFilter, setActiveFilter] = useState<UiFilter>('오늘');
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // 로딩/에러
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 오늘 날짜(미래 이동 방지용)
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

  // 날짜 이동 버튼
  const handleDateChange = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'prev' ? -1 : 1));
    // 오늘 이후는 이동 불가
    if (newDate > today) return;
    setCurrentDate(newDate);
  };

  // 필터 클릭
  const handleFilterClick = (filter: UiFilter) => {
    setActiveFilter(filter);
  };

  // 실제 API 호출
  const fetchVisitTrend = useCallback(async (dateObj: Date, filter: UiFilter) => {
    setLoading(true);
    setErrorMsg(null);

    const params = {
      date: formatDateApi(dateObj), // "2025-09-03"
      range: FILTER_TO_RANGE[filter], // "today" | "yesterday" | "week" | "month"
    };

    const res = await getVisitTrend(params);

    if (isApiError(res)) {
      setErrorMsg(res.message || '방문자 수 데이터를 불러오지 못했습니다.');
      setChartLabels([]);
      setChartValues([]);
      setLoading(false);
      return;
    }

    if (
      !res ||
      typeof res !== 'object' ||
      Array.isArray(res) ||
      !('labels' in res) ||
      !('values' in res)
    ) {
      setErrorMsg('서버 응답 형식이 올바르지 않습니다.');
      setChartLabels([]);
      setChartValues([]);
      setLoading(false);
      return;
    }

    setChartLabels(res.labels);
    setChartValues(res.values);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchVisitTrend(currentDate, activeFilter);
  }, [currentDate, activeFilter, fetchVisitTrend]);

  // 툴팁 옵션: "오늘"/"어제"일 때만 라벨 뒤에 "시"
  const chartOptions = useMemo(() => {
    const isHourlyView = activeFilter === '오늘' || activeFilter === '어제';

    return {
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
              const label = tooltipItems[0]?.label ?? '';
              return isHourlyView ? `${label}시` : label;
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
  }, [activeFilter]);

  // 차트 data
  const data = useMemo(
    () => ({
      labels: chartLabels,
      datasets: [
        {
          label: '방문자수',
          data: chartValues,
          borderColor: '#589bff',
          backgroundColor: 'rgba(76,145,255,0.1)',
          tension: 0.3,
          pointRadius: 0,
          fill: false,
        },
      ],
    }),
    [chartLabels, chartValues],
  );

  return (
    <div className='flex h-full w-full flex-col justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm'>
      {/* 타이틀 */}
      <h2 className='text-primary text-h3 mb-2 text-center'>방문자수</h2>

      {/* 날짜 + 필터 영역 */}
      <div className='mb-2 flex items-center justify-between px-2'>
        {/* 날짜 컨트롤 */}
        <div className='text-text1 relative flex items-center gap-2'>
          <button onClick={() => handleDateChange('prev')}>
            <img
              src={arrow}
              alt='prev'
              className='h-7 w-7 rotate-180 cursor-pointer'
            />
          </button>

          {/* 날짜 클릭 시 DatePicker 열림 */}
          <span
            className='text-subtext1 text-h4 cursor-pointer'
            onClick={() => setShowDatePicker((prev) => !prev)}
          >
            {formatDateDisplay(currentDate)}
          </span>

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

          {/* DatePicker (input date) */}
          {showDatePicker && (
            <div className='absolute top-10 left-1/2 z-20 -translate-x-1/2'>
              <input
                type='date'
                value={formatDateApi(currentDate)}
                className='rounded-md border border-gray-300 bg-white px-3 py-1 shadow'
                max={formatDateApi(today)}
                onChange={(e) => {
                  const [y, m, d] = e.target.value.split('-').map(Number);
                  const newDate = new Date(y, m - 1, d);
                  newDate.setHours(0, 0, 0, 0);
                  setCurrentDate(newDate);
                  setShowDatePicker(false);
                }}
              />
            </div>
          )}
        </div>

        {/* 기간 필터 (오늘 / 어제 / 일주일 / 한 달) */}
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

      {/* 차트 영역 */}
      <div className='h-[200px] w-full'>
        {errorMsg ? (
          <div className='text-body2_r flex h-full w-full items-center justify-center text-red-500'>
            {errorMsg}
          </div>
        ) : loading ? (
          <div className='text-body2_r text-subtext2 flex h-full w-full items-center justify-center'>
            불러오는 중...
          </div>
        ) : (
          <Line
            data={data}
            options={chartOptions}
          />
        )}
      </div>
    </div>
  );
};

export default VisitLineChart;
