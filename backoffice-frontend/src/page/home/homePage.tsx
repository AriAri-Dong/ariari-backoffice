import { useSearchParams } from 'react-router';
import Tabs from '../../components/tabs';
import ActionRequired from './actionRequired';
import ActionCompelete from './actionCompelete';

// 탭 목록
const TABS = [
  { label: '조치필요', key: 'required', count: 14 },
  { label: '조치완료', key: 'compelete', count: 12 },
] as const;

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // 쿼리에서 탭 추출
  const tabKey = searchParams.get('tab');

  const tab = TABS.find((t) => t.key === tabKey) ?? TABS[0];

  // 탭 클릭 시 쿼리 갱신
  const handleTabChange = (label: string) => {
    const found = TABS.find((t) => t.label === label);
    if (found) setSearchParams({ tab: found.key });
  };

  return (
    <div className='w-full'>
      <Tabs
        tabs={TABS.map(({ label, count }) => ({ label, count }))}
        selected={tab.label}
        onChange={handleTabChange}
      />

      <div className='mt-6'>
        {/* <div className='mt-6 min-h-[600px]'> */}
        {tab.key === 'required' && <ActionRequired />}
        {tab.key === 'compelete' && <ActionCompelete />}
      </div>
    </div>
  );
}
