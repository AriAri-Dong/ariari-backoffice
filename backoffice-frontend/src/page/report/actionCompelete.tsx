import { useEffect, useState } from 'react';

import RefreshBtn from '../../components/button/iconBtn/refreshBtn';
import Calendar from '../../components/calendar';
import Dropdown from '../../components/dropdown/dropdown';
import PaginatedTable from '../../components/paginatedTable';
import Searchbar from '../../components/searchbar';
import type { Column } from '../../types/table';
import type { ReportResolvedListItem, ReportResolvedListResponse } from '../../types/api/report';
import { REPORT_REASONS } from '../../components/modal/report/commonModal';
import { REPORT_LOC } from '../../constants/report';
import { useReportResolvedList } from '../../hooks/report/useReportResolved';
import formatDateToDot, { formatDateToHyphen } from '../../utils/formatDate';

const columns: Column<ReportResolvedListItem>[] = [
  { key: 'number', title: '번호', width: '10%', align: 'center' },
  {
    key: 'reportDate',
    title: '신고날짜',
    width: '15%',
    align: 'center',
    render: (value) => {
      return <p>{formatDateToDot(value)}</p>;
    },
  },
  {
    key: 'title',
    title: '제목',
    width: '45%',
    align: 'left',
    className: 'text-black',
    render: (value) => {
      return <p>{REPORT_REASONS.find((reason) => reason.value === value)?.label ?? value}</p>;
    },
  },
  {
    key: 'location',
    title: '신고위치',
    width: '10%',
    align: 'center',
    render: (value) => {
      return <p>{REPORT_LOC.find((loc) => loc.value === value)?.label}</p>;
    },
  },
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
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('');
  const [locationType, setLocationType] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const { data } = useReportResolvedList({
    page: page - 1,
    size: 10,
    keyword: debouncedSearch,
    filterType,
    locationType,
    startDate: formatDateToHyphen(startDate),
    endDate: formatDateToHyphen(endDate),
    initialData,
  });

  const handleRefresh = () => {
    setSearch('');
    setFilterType('');
    setLocationType('');
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
              { label: '제목', value: 'title' },
              { label: '신고자', value: 'reporter' },
            ]}
            value={filterType}
            onChange={(option) => {
              setFilterType(option.value);
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
            }}
          />
          <Dropdown
            placeholder='신고위치'
            options={REPORT_LOC}
            value={locationType}
            onChange={(option) => {
              setLocationType(option.value);
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
