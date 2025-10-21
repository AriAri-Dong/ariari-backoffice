import { useState } from 'react';
import RefreshBtn from '../../components/button/iconBtn/refreshBtn';
import Dropdown from '../../components/dropdown/dropdown';
import PaginatedTable from '../../components/paginatedTable';
import type { Column } from '../../types/table';
import { data } from './actionCompelete';

export type RowType = {
  id: string;
  date: string;
  title: string;
  position: string;
  user: string;
};

const columns: Column<RowType>[] = [
  { key: 'id', title: '번호', width: '10%', align: 'center' },
  { key: 'date', title: '분류', width: '10%', align: 'center' },
  { key: 'title', title: '제목', width: '60%', align: 'left', className: 'text-black' },
  { key: 'position', title: '신고위치', width: '10%', align: 'center' },
  { key: 'user', title: '신고자', width: '10%', align: 'center' },
];

export default function ActionRequired({
  setSelectedRow,
}: {
  setSelectedRow: (row: RowType | null) => void;
}) {
  const [category, setCategory] = useState<string>('');

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
        data={data}
        pageSize={10}
        rowKey='id'
        onRowClick={(row) => setSelectedRow(row)}
      />
    </div>
  );
}
