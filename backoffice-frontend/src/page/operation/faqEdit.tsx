import { useState } from 'react';
import BluePenBtn from '../../components/button/iconBtn/bluePenBtn';
import PenBtn from '../../components/button/iconBtn/penBtn';
import RefreshBtn from '../../components/button/iconBtn/refreshBtn';
import Dropdown from '../../components/dropdown/dropdown';
import PaginatedTable from '../../components/paginatedTable';
import type { Column } from '../../types/table';

type RowType = {
  id: string;
  category: string;
  title: string;
};

const columns: Column<RowType>[] = [
  { key: 'id', title: '번호', width: '10%', align: 'center' },
  { key: 'category', title: '분류', width: '10%', align: 'center' },
  { key: 'title', title: '제목', width: '70%', align: 'left', className: 'text-black' },
  {
    key: 'edit',
    title: '',
    width: '10%',
    align: 'center',
    render: () => <BluePenBtn onClick={() => alert('수정')} />,
  },
];

const data: RowType[] = Array.from({ length: 17 }).map((_, idx) => ({
  id: (idx + 1).toString().padStart(4, '0'),
  category: '최대 5자',
  title: 'FAQ 제목',
}));

export default function FaqEdit() {
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
          placeholder='분류'
          options={[
            { label: '전체', value: 'all' },
            { label: '분류1', value: 'category1' },
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

      {/* 작성하기 버튼 - 오른쪽 아래 고정 */}
      <div className='fixed right-40 bottom-16 z-50 lg:right-60 lg:bottom-28'>
        <PenBtn onClick={() => alert('작성 버튼 클릭됨')} />
      </div>
    </div>
  );
}
