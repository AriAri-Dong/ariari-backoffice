import { useState } from 'react';
import RefreshBtn from '../../components/button/iconBtn/refreshBtn';
import Dropdown from '../../components/dropdown/dropdown';
import PaginatedTable from '../../components/paginatedTable';
import type { Column } from '../../types/table';
import { useQuery } from '@tanstack/react-query';
import { getReportPendingList } from '../../apis/report/api';
import { isApiError } from '../../utils/typeGuard';
import type { ReportPendingListItem, ReportPendingListResponse } from '../../types/api/report';
import { REPORT_REASONS } from '../../components/modal/report/commonModal';
import { REPORT_LOC } from '../../constants/report';
import formatDateToDot from '../../utils/formatDate';

const columns: Column<ReportPendingListItem>[] = [
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
    width: '15%',
    align: 'center',
    render: (value) => {
      return <p>{REPORT_LOC.find((loc) => loc.value === value)?.label}</p>;
    },
  },
  { key: 'reporter', title: '신고자', width: '15%', align: 'center' },
];

export default function ActionRequired({
  setSelectedRow,
  initialData,
}: {
  setSelectedRow: (row: ReportPendingListItem | null) => void;
  initialData?: ReportPendingListResponse;
}) {
  const [category, setCategory] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const { data } = useQuery({
    queryKey: ['reportPendingList', { page: page - 1, size: 10 }],
    queryFn: async () => {
      const res = await getReportPendingList({ page: page - 1, size: 10 });
      if (isApiError(res)) {
        throw new Error(res.message);
      }
      return res;
    },
    initialData: page === 1 ? initialData : undefined,
  });

  const handleRefresh = () => {
    setCategory('');
    console.log('설정 초기화됨');
  };

  return (
    <div className='relative'>
      <div className='mb-5 flex items-center justify-end gap-3'>
        <RefreshBtn onClick={handleRefresh} />
        <Dropdown
          placeholder='신고 위치'
          options={[
            { label: '전체', value: 'all' },
            { label: '활동후기', value: 'review' },
            { label: '모집공고', value: 'recruitment' },
            { label: '합격후기', value: 'history' },
            { label: '게시글', value: 'history' },
            { label: '동아리', value: 'club' },
            { label: 'Q&A', value: 'club' },
          ]}
          value={category}
          onChange={(option) => {
            setCategory(option.value);
          }}
        />
      </div>

      {/* 테이블 */}
      <PaginatedTable
        columns={columns}
        data={data?.reportDataList || []}
        page={page}
        onPageChange={(page) => setPage(page)}
        pageSize={10}
        rowKey='id'
        onRowClick={(row) => setSelectedRow(row)}
      />
    </div>
  );
}
