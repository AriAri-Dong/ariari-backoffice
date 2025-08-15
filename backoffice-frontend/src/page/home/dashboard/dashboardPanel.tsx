import DonutUserRatioChart from './donutUserRatioChart';
import SignupBarChart from './signupBarChart';
import VisitLineChart from './visitLineChart';

const DashboardPanel = () => {
  return (
    <div className='grid grid-cols-3 gap-4 rounded-xl bg-white p-4'>
      <div className='col-span-1 rounded-lg bg-white p-4 shadow'>
        <h2 className='text-primary text-h3 mb-2'>기존/신규 유저 비율</h2>
        <DonutUserRatioChart />
      </div>
      <div className='col-span-2 rounded-lg bg-white p-4 shadow'>
        <h2 className='text-primary text-h3 mb-2'>방문자수</h2>
        <VisitLineChart />
      </div>
      <div className='col-span-3 rounded-lg bg-white p-4 shadow'>
        <h2 className='text-primary text-h3 mb-2'>회원가입/삭제 추이</h2>
        <SignupBarChart />
      </div>
    </div>
  );
};

export default DashboardPanel;
