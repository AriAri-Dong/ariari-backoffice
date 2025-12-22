import { useEffect, useMemo, useState, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import arrow from '../../../assets/icons/arrow_right.svg';
import { getMemberRegistrationTrend } from '../../../apis/dashboard/api';
import type { MemberRegistrationSummary } from '../../../types/api/dashboard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// 차트 옵션 (기존 동일)
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

// 화면에 보여줄 날짜 (MM.DD)
const formatDateForDisplay = (date: Date) =>
  `${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;

// API 파라미터용 날짜 (YYYY-MM-DD)
const formatDateForApi = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const SignupBarChart = () => {
  const [summary, setSummary] = useState<MemberRegistrationSummary | null>(null);
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [signupData, setSignupData] = useState<number[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // DatePicker UI 상태
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // 로딩 / 에러 관리(필요하면 UI에 뿌릴 수 있게)
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // "오늘" 기준 (미래로 못 가게 막는 용도)
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

    // 오늘 이후로는 이동 불가
    if (newDate > today) return;

    setCurrentDate(newDate);
  };

  // API 호출
  const fetchRegistrationTrend = useCallback(async (dateObj: Date) => {
    const dateParam = formatDateForApi(dateObj);

    setLoading(true);
    setErrorMsg(null);

    const res = await getMemberRegistrationTrend({ date: dateParam });

    if ('status' in res) {
      // 에러 케이스(ApiError)
      setErrorMsg(res.message || '데이터를 불러오지 못했습니다.');
      setSummary(null);
      setChartLabels([]);
      setSignupData([]);
    } else {
      // 성공 케이스
      setSummary(res.summary);
      setChartLabels(res.chart.labels);
      setSignupData(res.chart.signup);
    }

    setLoading(false);
  }, []);

  // currentDate 바뀔 때마다 API 다시 호출
  useEffect(() => {
    fetchRegistrationTrend(currentDate);
  }, [currentDate, fetchRegistrationTrend]);

  // 차트에 먹일 data 객체
  const data = useMemo(
    () => ({
      labels: chartLabels,
      datasets: [
        {
          label: '가입자 수',
          data: signupData,
          backgroundColor: '#589bff',
          borderRadius: 3,
          barPercentage: 0.35,
        },
      ],
    }),
    [chartLabels, signupData],
  );

  return (
    <div className='flex h-full w-full flex-col gap-10'>
      <h2 className='text-primary text-h3 mb-2 text-center'>회원가입/삭제 추이</h2>

      <div className='flex w-full gap-[30px]'>
        {/* ===== 왼쪽 요약 영역 ===== */}
        <div className='flex w-[70px] flex-col justify-center gap-[30px] whitespace-nowrap'>
          <div className='flex flex-col text-center'>
            <p className='text-subtext2 text-body2_r'>오늘 가입자</p>
            <p className='text-text1 text-body3_sb'>
              {summary ? `${summary.todaySignup}명` : loading ? '...' : '—'}
            </p>
          </div>

          <div className='flex flex-col text-center'>
            <p className='text-subtext2 text-body2_r'>월 가입자</p>
            <p className='text-text1 text-body3_sb'>
              {summary ? `${summary.monthSignup}명` : loading ? '...' : '—'}
            </p>
          </div>

          <div className='flex flex-col text-center'>
            <p className='text-subtext2 text-body2_r'>오늘 탈퇴자</p>
            <p className='text-text1 text-body3_sb'>
              {summary ? `${summary.todayWithdrawal}명` : loading ? '...' : '—'}
            </p>
          </div>

          <div className='flex flex-col text-center'>
            <p className='text-subtext2 text-body2_r'>월 탈퇴자</p>
            <p className='text-text1 text-body3_sb'>
              {summary ? `${summary.monthWithdrawal}명` : loading ? '...' : '—'}
            </p>
          </div>
        </div>

        {/* ===== 오른쪽 차트 영역 ===== */}
        <div className='flex flex-1 flex-col gap-[30px]'>
          {/* 날짜 + 좌우 이동 */}
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
              {formatDateForDisplay(currentDate)}
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
                  value={formatDateForApi(currentDate)}
                  className='rounded-md border border-gray-300 bg-white px-3 py-1 shadow'
                  max={formatDateForApi(today)}
                  onChange={(e) => {
                    // 타임존 이슈 방지: 로컬 날짜로 생성
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

          {/* 차트 */}
          <div className='h-[200px] w-full'>
            {errorMsg ? (
              <div className='text-subtext2 text-body2_r flex h-full w-full items-center justify-center'>
                {errorMsg}
              </div>
            ) : (
              <Bar
                data={data}
                options={options}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupBarChart;
