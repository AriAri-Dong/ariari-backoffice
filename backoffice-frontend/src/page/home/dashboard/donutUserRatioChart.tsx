import { useEffect, useState, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { getMemberRetentionRatio } from '../../../apis/dashboard/api';
import type { MemberRetentionRatioResponse } from '../../../types/api/dashboard';
import { isApiError } from '../../../utils/typeGuard';

ChartJS.register(ArcElement, Tooltip);

// Chart 옵션
const chartOptions = {
  cutout: '60%',
  plugins: {
    legend: {
      display: false,
    },
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
  maintainAspectRatio: false,
};

const DonutUserRatioChart = () => {
  const [dataState, setDataState] = useState<MemberRetentionRatioResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 1) API 호출
  useEffect(() => {
    const fetchRetentionRatio = async () => {
      setLoading(true);
      setErrorMsg(null);

      const res = await getMemberRetentionRatio();

      // API 에러 형태인지 확인
      if (isApiError(res)) {
        setErrorMsg(res.message || '데이터를 불러오지 못했습니다.');
        setDataState(null);
        setLoading(false);
        return;
      }

      // 방어: 우리가 기대한 필드가 실제로 있는지 체크
      if (
        !res ||
        typeof res !== 'object' ||
        Array.isArray(res) ||
        !('newUserRatio' in res) ||
        !('existingUserRatio' in res)
      ) {
        setErrorMsg('서버 응답 형식이 올바르지 않습니다.');
        setDataState(null);
        setLoading(false);
        return;
      }

      setDataState(res as MemberRetentionRatioResponse);
      setLoading(false);
    };

    fetchRetentionRatio();
  }, []);

  // 2) 차트에 넣을 data 계산
  const chartData = useMemo(() => {
    const newRatio = dataState?.newUserRatio ?? 0;
    const existingRatio = dataState?.existingUserRatio ?? 0;

    return {
      datasets: [
        {
          data: [newRatio, existingRatio],
          backgroundColor: ['#589bff', 'rgba(88, 155, 255, 0.2)'],
          borderWidth: 0,
        },
      ],
    };
  }, [dataState]);

  // 3) 범례용 값(퍼센트)
  const newUserPercentText = useMemo(() => {
    if (loading) return '...';
    if (!dataState) return '—';
    return `${dataState.newUserRatio}%`;
  }, [dataState, loading]);

  const existingUserPercentText = useMemo(() => {
    if (loading) return '...';
    if (!dataState) return '—';
    return `${dataState.existingUserRatio}%`;
  }, [dataState, loading]);

  return (
    <div className='flex h-full w-full flex-col justify-between rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm'>
      {/* 상단: 제목 + 도넛 */}
      <div className='flex flex-col items-center gap-4'>
        <h2 className='text-primary text-h3 mb-1'>기존/신규 유저 비율</h2>

        <div className='relative h-[155px] w-[155px]'>
          {errorMsg ? (
            <div className='text-body2_r flex h-full w-full items-center justify-center text-red-500'>
              {errorMsg}
            </div>
          ) : loading ? (
            <div className='text-body2_r text-subtext2 flex h-full w-full items-center justify-center'>
              불러오는 중...
            </div>
          ) : (
            <Doughnut
              data={chartData}
              options={chartOptions}
            />
          )}
        </div>
      </div>

      {/* 하단: 범례 */}
      <div className='flex w-full flex-col gap-2 px-2 pb-1'>
        <div className='flex w-full items-center justify-between gap-2'>
          <div className='flex items-center gap-3'>
            {/* 신규 색상 */}
            <span className='bg-primary inline-block h-4 w-4 rounded-full' />
            <span className='text-subtext1 text-body2_m'>신규 가입자</span>
          </div>
          <span className='text-body1_m text-text1'>{newUserPercentText}</span>
        </div>

        <div className='flex w-full items-center justify-between gap-2'>
          <div className='flex items-center gap-3'>
            <span
              className='inline-block h-4 w-4 rounded-full'
              style={{ backgroundColor: 'rgba(88, 155, 255, 0.2)' }}
            />
            <span className='text-subtext1 text-body2_m'>기존 사용자</span>
          </div>
          <span className='text-body1_m text-text1'>{existingUserPercentText}</span>
        </div>
      </div>
    </div>
  );
};

export default DonutUserRatioChart;
