import { useState } from 'react';
import { useSearchParams } from 'react-router';
import Tabs from '../../components/tabs';
import ActionRequired from './actionRequired';
import ActionCompelete from './actionCompelete';
import CommonModal from '../../components/modal/report/commonModal';
import type { ReportPendingListItem, ReportResolvedListItem } from '../../types/api/report';
import { useQuery } from '@tanstack/react-query';
import { getReportPendingList, getReportResolvedList } from '../../apis/report/api';
import { isApiError } from '../../utils/typeGuard';

// 탭 목록
const TABS = [
  { label: '조치필요', key: 'required' },
  { label: '조치완료', key: 'compelete' },
] as const;

export default function ReportPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRow, setSelectedRow] = useState<
    ReportPendingListItem | ReportResolvedListItem | null
  >(null);

  // 쿼리에서 탭 추출
  const tabKey = searchParams.get('tab');

  const tab = TABS.find((t) => t.key === tabKey) ?? TABS[0];

  const pendingQuery = useQuery({
    queryKey: ['reportPendingList', { page: 0, size: 10 }],
    queryFn: async () => {
      const res = await getReportPendingList({ page: 0, size: 10 });
      if (isApiError(res)) throw new Error(res.message);
      return res;
    },
  });

  const resolvedQuery = useQuery({
    queryKey: ['reportResolvedList', { page: 0, size: 10 }],
    queryFn: async () => {
      const res = await getReportResolvedList({ page: 0, size: 10 });
      if (isApiError(res)) throw new Error(res.message);
      return res;
    },
  });

  // 탭에 보여줄 개수 (totalSize 기준)
  const pendingCount = pendingQuery.data?.reportPageInfo.totalSize ?? 0;
  const resolvedCount = resolvedQuery.data?.reportPageInfo.totalSize ?? 0;

  const TABS_COUNT = [
    { ...TABS[0], count: pendingCount },
    { ...TABS[1], count: resolvedCount },
  ];

  // 탭 클릭 시 쿼리 갱신
  const handleTabChange = (label: string) => {
    const found = TABS.find((t) => t.label === label);
    if (found) setSearchParams({ tab: found.key });
  };

  return (
    <div className='w-full'>
      {!selectedRow && (
        <>
          <Tabs
            tabs={TABS_COUNT.map(({ label, count }) => ({ label, count }))}
            selected={tab.label}
            onChange={handleTabChange}
          />
          <div className='mt-6'>
            {tab.key === 'required' && (
              <ActionRequired
                setSelectedRow={setSelectedRow}
                initialData={pendingQuery.data}
              />
            )}
            {tab.key === 'compelete' && (
              <ActionCompelete
                setSelectedRow={setSelectedRow}
                initialData={resolvedQuery.data}
              />
            )}
          </div>
        </>
      )}
      {selectedRow && (
        <CommonModal
          row={selectedRow}
          onClose={() => setSelectedRow(null)}
        />
      )}
    </div>
  );
}
