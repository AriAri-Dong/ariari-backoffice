import { useState } from 'react';

import RefreshBtn from '../../components/button/iconBtn/refreshBtn';
import Calendar from '../../components/calendar';
import Dropdown from '../../components/dropdown/dropdown';
import PaginatedTable from '../../components/paginatedTable';
import Searchbar from '../../components/searchbar';
import type { Column } from '../../types/table';

type RowType = {
  id: string;
  date: string;
  title: string;
  position: string;
  user: string;
};

const columns: Column<RowType>[] = [
  { key: 'id', title: '번호', width: '10%', align: 'center' },
  { key: 'date', title: '분류', width: '10%', align: 'center' },
  { key: 'title', title: '제목', width: '50%', align: 'left', className: 'text-black' },
  { key: 'position', title: '신고위치', width: '10%', align: 'center' },
  { key: 'user', title: '신고자', width: '10%', align: 'center' },
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

const types = ['ACCEPTANCE_REVIEW', 'QNA', 'CLUB', 'CLUB_REVIEW', 'POST', 'RECRUITMENT'];
export const data: RowType[] = Array.from({ length: 45 }).map((_, idx) => ({
  id: (idx + 1).toString().padStart(4, '0'),
  date: '2025.10.21',
  title: '제목',
  position: types[idx % types.length],
  user: 'user',
}));

export default function ActionCompelete({
  setSelectedRow,
}: {
  setSelectedRow: (row: RowType | null) => void;
}) {
  const [search, setSearch] = useState<string>('');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [postStatus, setPostStatus] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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
        data={data}
        pageSize={10}
        rowKey='id'
        onRowClick={(row) => setSelectedRow(row)}
      />
    </div>
  );
}
