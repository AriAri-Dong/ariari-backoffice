import ClubRankingPanel from './club/clubRankingPanel';
import ClubCreateDeleteChart from './dashboard/clubCreateDeleteChart';

import DonutUserRatioChart from './dashboard/donutUserRatioChart';
import SignupBarChart from './dashboard/signupBarChart';
import VisitLineChart from './dashboard/visitLineChart';

export default function HomePage() {
  return (
    <div className='grid grid-cols-12 gap-3'>
      {/* 도넛 차트 */}
      <div className='col-span-3 h-[330px] rounded-lg bg-white p-4'>
        <DonutUserRatioChart />
      </div>

      {/* 방문자수 라인차트 */}
      <div className='col-span-6 h-[330px] rounded-lg bg-white p-4'>
        <VisitLineChart />
      </div>

      {/* 클럽 랭킹 */}
      <div className='col-span-3 h-[330px]'>
        <ClubRankingPanel />
      </div>

      {/* 동아리 생성/삭제 */}
      <div className='col-span-3 h-[412px] rounded-lg bg-white p-4'>
        <ClubCreateDeleteChart />
      </div>

      {/* 회원가입/삭제 추이 */}
      <div className='col-span-9 h-[412px] rounded-lg bg-white p-4'>
        <SignupBarChart />
      </div>
    </div>
  );
}
