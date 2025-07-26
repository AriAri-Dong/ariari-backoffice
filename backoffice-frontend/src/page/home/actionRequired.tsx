import { useState } from 'react';
import RefreshBtn from '../../components/button/iconBtn/refreshBtn';
import Dropdown from '../../components/dropdown/dropdown';
import PaginatedTable from '../../components/paginatedTable';
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
  { key: 'title', title: '제목', width: '60%', align: 'left', className: 'text-black' },
  { key: 'position', title: '신고위치', width: '10%', align: 'center' },
  { key: 'user', title: '신고자', width: '10%', align: 'center' },
];

const data: RowType[] = Array.from({ length: 17 }).map((_, idx) => ({
  id: (idx + 1).toString().padStart(4, '0'),
  date: '2025.03.04',
  title: '불쾌감을 조성하는 사진, 게시글이 올라와요.',
  position: '활동 후기',
  user: '귀엽고닭',
}));

export default function ActionRequired() {
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
            { label: '활동후기', value: '' },
            { label: '활동내역', value: '' },
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
      />
    </div>
  );
}
