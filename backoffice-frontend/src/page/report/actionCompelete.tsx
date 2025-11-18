import { useState } from 'react';

import RefreshBtn from '../../components/button/iconBtn/refreshBtn';
import Calendar from '../../components/calendar';
import Dropdown from '../../components/dropdown/dropdown';
import PaginatedTable from '../../components/paginatedTable';
import Searchbar from '../../components/searchbar';
import type { Column } from '../../types/table';
import type { ReportResolvedListItem, ReportResolvedListResponse } from '../../types/api/report';
import { useQuery } from '@tanstack/react-query';
import { getReportResolvedList } from '../../apis/report/api';
import { isApiError } from '../../utils/typeGuard';
import { REPORT_REASONS } from '../../components/modal/report/commonModal';

const columns: Column<ReportResolvedListItem>[] = [
  { key: 'number', title: '번호', width: '10%', align: 'center' },
  { key: 'reportDate', title: '신고날짜', width: '10%', align: 'center' },
  {
    key: 'title',
    title: '제목',
    width: '50%',
    align: 'left',
    className: 'text-black',
    render: (value) => {
      return <p>{REPORT_REASONS.find((reason) => reason.value === value)?.label}</p>;
    },
  },
  { key: 'location', title: '신고위치', width: '10%', align: 'center' },
  { key: 'reporter', title: '신고자', width: '10%', align: 'center' },
  {
    key: 'treatment',
    title: '처리',
    width: '20%',
    align: 'center',
    render: () => (
      <button
        onClick={() => {
          console.log('삭제 완료');
        }}
      >
        <p className='text-token_1 bg-token_1_bg px-2.5 py-1'>삭제완료</p>
      </button>
    ),
  },
];

export default function ActionCompelete({
  setSelectedRow,
  initialData,
}: {
  setSelectedRow: (row: ReportResolvedListItem | null) => void;
  initialData?: ReportResolvedListResponse;
}) {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [postStatus, setPostStatus] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { data } = useQuery({
    queryKey: ['reportResolvedList', { page: page - 1, size: 10 }],
    queryFn: async () => {
      const res = await getReportResolvedList({ page: page - 1, size: 10 });
      if (isApiError(res)) {
        throw new Error(res.message);
      }
      return res;
    },
    initialData: page === 1 && initialData ? initialData : undefined,
  });

  const handleRefresh = () => {
    setSearch('');
    setSearchFilter('');
    setPostStatus('');
    setStartDate(null);
    setEndDate(null);
    console.log('설정 초기화됨');
  };

  return (
    <div className='relative'>
      {/* 상단 필터 바 */}
      <div className='mb-5 flex items-center justify-between'>
        <div className='flex w-[60%] gap-3'>
          <Dropdown
            placeholder='검색 필터'
            options={[
              { label: '전체', value: 'all' },
              { label: '활동후기', value: 'review' },
              { label: '모집공고', value: 'recruitment' },
            ]}
            value={searchFilter}
            onChange={(option) => {
              setSearchFilter(option.value);
              console.log('검색 필터:', option.value);
            }}
          />

          <Searchbar
            value={search}
            onChange={setSearch}
            placeholder='검색어 입력'
          />
        </div>

        <div className='flex gap-3'>
          <RefreshBtn onClick={handleRefresh} />
          <Calendar
            startDate={startDate}
            endDate={endDate}
            onChange={([start, end]) => {
              setStartDate(start);
              setEndDate(end);
              console.log('선택된 기간:', start, end);
            }}
          />
          <Dropdown
            placeholder='신고위치'
            options={[
              { label: '전체', value: 'all' },
              { label: '활동후기', value: 'review' },
              { label: '활동내역', value: 'history' },
            ]}
            value={postStatus}
            onChange={(option) => {
              setPostStatus(option.value);
            }}
          />
        </div>
      </div>

      {/* 테이블 */}
      <PaginatedTable
        columns={columns}
        data={data?.resolvedReportData || []}
        page={page}
        onPageChange={(page) => setPage(page)}
        pageSize={10}
        rowKey='id'
        onRowClick={(row) => setSelectedRow(row)}
      />
    </div>
  );
}
