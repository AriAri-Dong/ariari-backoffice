import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

const data = {
  datasets: [
    {
      data: [30, 70],
      backgroundColor: ['#589bff', 'rgba(88, 155, 255, 0.2)'],
      borderWidth: 0,
    },
  ],
};

const options = {
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
  return (
    <div className='flex h-full w-full flex-col justify-between text-center'>
      {/* 상단: 제목 + 도넛 */}
      <div className='flex flex-col items-center gap-4'>
        <h2 className='text-primary text-h3 mb-1'>기존/신규 유저 비율</h2>
        <div className='h-[155px] w-[155px]'>
          <Doughnut
            data={data}
            options={options}
          />
        </div>
      </div>

      {/* 하단: 범례 (항상 아래쪽으로) */}
      <div className='flex w-full flex-col gap-2 px-2 pb-1'>
        <div className='flex w-full items-center justify-between gap-2'>
          <div className='flex items-center gap-3'>
            <span className='bg-primary inline-block h-4 w-4 rounded-full' />
            <span className='text-subtext1 text-body2_m'>신규 가입자</span>
          </div>
          <span className='text-body1_m text-text1'>30%</span>
        </div>
        <div className='flex w-full items-center justify-between gap-2'>
          <div className='flex items-center gap-3'>
            <span className='bg-selectedoption_hover inline-block h-4 w-4 rounded-full' />
            <span className='text-subtext1 text-body2_m'>기존 사용자</span>
          </div>
          <span className='text-body1_m text-text1'>70%</span>
        </div>
      </div>
    </div>
  );
};

export default DonutUserRatioChart;
