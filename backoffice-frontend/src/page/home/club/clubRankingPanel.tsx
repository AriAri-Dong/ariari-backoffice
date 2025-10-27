import { useEffect, useMemo, useState, useCallback } from 'react';
import Tabs from '../../../components/tabs';
import ClubTopList from './clubTopList';
import { getClubRanking } from '../../../apis/dashboard/api';
import type { ClubRankingResponse, ClubItem } from '../../../types/api/dashboard';
import { isApiError } from '../../../utils/typeGuard';

const TABS = [
  { label: '전체', key: 'ALL' },
  { label: '교내', key: 'INTERNAL' },
  { label: '연합', key: 'EXTERNAL' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

// selectedTab('ALL' | 'INTERNAL' | 'EXTERNAL') -> API 응답 키('all' | 'internal' | 'external')
function tabKeyToScopeKey(tabKey: TabKey): 'all' | 'internal' | 'external' {
  switch (tabKey) {
    case 'ALL':
      return 'all';
    case 'INTERNAL':
      return 'internal';
    case 'EXTERNAL':
      return 'external';
    default:
      return 'all';
  }
}

export default function ClubRankingPanel() {
  const [selectedTab, setSelectedTab] = useState<TabKey>('ALL');

  // API 데이터
  const [rankingData, setRankingData] = useState<ClubRankingResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 탭 바꿀 때 호출
  const handleTabChange = (label: string) => {
    const found = TABS.find((t) => t.label === label);
    if (found) setSelectedTab(found.key);
  };

  // 랭킹 불러오기
  const fetchRanking = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);

    const res = await getClubRanking();

    if (isApiError(res)) {
      setErrorMsg(res.message || '동아리 랭킹을 불러오지 못했습니다.');
      setRankingData(null);
      setLoading(false);
      return;
    }

    // 방어: 최소한 구조 체크
    if (
      !res ||
      typeof res !== 'object' ||
      Array.isArray(res) ||
      !('all' in res) ||
      !('internal' in res) ||
      !('external' in res)
    ) {
      setErrorMsg('서버 응답 형식이 올바르지 않습니다.');
      setRankingData(null);
      setLoading(false);
      return;
    }

    setRankingData(res as ClubRankingResponse);
    setLoading(false);
  }, []);

  // 최초 마운트 시 1번 호출
  useEffect(() => {
    fetchRanking();
  }, [fetchRanking]);

  // 현재 선택된 탭의 popular / latest 리스트 뽑기
  const { popularList, latestList } = useMemo(() => {
    if (!rankingData) {
      return {
        popularList: [] as ClubItem[],
        latestList: [] as ClubItem[],
      };
    }

    const scopeKey = tabKeyToScopeKey(selectedTab); // 'all' | 'internal' | 'external'
    const scopeData = rankingData[scopeKey];

    return {
      popularList: scopeData?.popular ?? [],
      latestList: scopeData?.latest ?? [],
    };
  }, [rankingData, selectedTab]);

  return (
    <div className='bg-background flex flex-col rounded-xl border border-gray-200 p-6 shadow-sm'>
      {/* 탭 영역 */}
      <div className='self-center'>
        <Tabs
          tabs={TABS.map(({ label }) => ({ label }))}
          selected={TABS.find((t) => t.key === selectedTab)?.label || ''}
          onChange={handleTabChange}
        />
      </div>

      {/* 내용 영역 */}
      <div className='mt-6 grid grid-cols-2 gap-8'>
        <ClubTopList
          title='인기 동아리 Top 5'
          list={popularList.slice(0, 5)}
          loading={loading}
          errorMsg={errorMsg}
        />
        <ClubTopList
          title='신규 동아리 Top 5'
          list={latestList.slice(0, 5)}
          loading={loading}
          errorMsg={errorMsg}
        />
      </div>
    </div>
  );
}
