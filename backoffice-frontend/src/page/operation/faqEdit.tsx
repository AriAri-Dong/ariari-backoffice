import { useState } from 'react';
import BluePenBtn from '../../components/button/iconBtn/bluePenBtn';
import PenBtn from '../../components/button/iconBtn/penBtn';
import RefreshBtn from '../../components/button/iconBtn/refreshBtn';
import Dropdown from '../../components/dropdown/dropdown';
import PaginatedTable from '../../components/paginatedTable';
import type { Column } from '../../types/table';
import FaqModal from '../../components/modal/FaqModal';

type RowType = {
  id: string;
  category: string;
  title: string;
  tokenColor: 'RED' | 'YELLOW' | 'GREEN' | 'SKYBLUE' | 'BLUE' | 'PRUPLE' | 'PINK';
  description: string;
};

const COLOR_LIST: RowType['tokenColor'][] = [
  'RED',
  'YELLOW',
  'GREEN',
  'SKYBLUE',
  'BLUE',
  'PRUPLE',
  'PINK',
];

const data: RowType[] = Array.from({ length: 17 }).map((_, idx) => {
  const randomColor = COLOR_LIST[Math.floor(Math.random() * COLOR_LIST.length)];
  return {
    id: (idx + 1).toString().padStart(4, '0'),
    category: '일정',
    title: 'FAQ 제목' + (idx + 1).toString().padStart(4, '0'),
    tokenColor: randomColor,
    description: `이것은 ${idx + 1}번 FAQ 설명입니다.`,
  };
});

export default function FaqEdit() {
  const [category, setCategory] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedRowData, setSelectedRowData] = useState<RowType | null>(null);

  const columns: Column<RowType>[] = [
    { key: 'id', title: '번호', width: '10%', align: 'center' },
    { key: 'category', title: '분류', width: '10%', align: 'center' },
    { key: 'title', title: '제목', width: '70%', align: 'left', className: 'text-black' },
    {
      key: 'edit',
      title: '',
      width: '10%',
      align: 'center',
      render: (_, row) => (
        <BluePenBtn
          onClick={() => {
            setSelectedRowData(row);
            setIsEditModalOpen(true);
          }}
        />
      ),
    },
  ];

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

      {/* 작성하기 버튼 */}
      <div className='fixed right-40 bottom-16 z-40 lg:right-60 lg:bottom-28'>
        <PenBtn
          onClick={() => {
            setIsModalOpen(true);
          }}
        />
      </div>

      <FaqModal
        visible={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />

      <FaqModal
        visible={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedRowData(null);
        }}
        mode='edit'
        initialData={selectedRowData || undefined}
      />
    </div>
  );
}
