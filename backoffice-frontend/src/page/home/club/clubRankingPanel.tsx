import { useState } from 'react';
import Tabs from '../../../components/tabs';
import ClubTopList from './clubTopList';

const TABS = [
  { label: '전체', key: 'ALL' },
  { label: '교내', key: 'INTERNAL' },
  { label: '연합', key: 'EXTERNAL' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

const dummyList = Array.from({ length: 5 }).map((_) => ({
  name: '동아리 이름',
  rate: 0,
}));

export default function ClubRankingPanel() {
  const [selectedTab, setSelectedTab] = useState<TabKey>('ALL');

  const handleTabChange = (label: string) => {
    const found = TABS.find((t) => t.label === label);
    if (found) setSelectedTab(found.key);
  };

  return (
    <div className='bg-background flex flex-col rounded-xl p-6'>
      <div className='self-center'>
        <Tabs
          tabs={TABS.map(({ label }) => ({ label }))}
          selected={TABS.find((t) => t.key === selectedTab)?.label || ''}
          onChange={handleTabChange}
        />
      </div>
      <div className='mt-6 grid grid-cols-2 gap-8'>
        <ClubTopList
          title='인기 동아리 Top 5'
          list={dummyList}
        />
        <ClubTopList
          title='신규 동아리 Top 5'
          list={dummyList}
        />
      </div>
    </div>
  );
}
