import { useState } from 'react';
import BluePenBtn from '../../components/button/iconBtn/bluePenBtn';
import PaginatedTable from '../../components/paginatedTable';
import Tabs from '../../components/tabs';
import { OPERATION_DATA } from '../../data/operation';
import type { Column } from '../../types/table';

type RowType = {
  id: number;
  date: string;
  title: string;
  author: string;
};

const columns: Column<RowType>[] = [
  { key: 'id', title: '번호', width: '10%', align: 'center' },
  { key: 'date', title: '수정일', width: '20%', align: 'left' },
  { key: 'title', title: '약관명칭', width: '40%', align: 'left', className: 'text-black' },
  { key: 'author', title: '수정자', width: '20%', align: 'right' },
  {
    key: 'edit',
    title: '',
    width: '20%',
    align: 'center',
    render: () => (
      <BluePenBtn
        onClick={() => {
          alert('수정');
        }}
      />
    ),
  },
];

export default function OperationPage() {
  const [selectedTab, setSelectedTab] = useState<string>('약관수정');

  return (
    <div className='w-full'>
      <Tabs
        tabs={[
          { label: '약관수정' },
          { label: '공지수정' },
          { label: 'FAQ수정' },
          { label: '알림전송' },
        ]}
        selected={selectedTab}
        onChange={setSelectedTab}
      />

      <div className='mt-6'>
        <PaginatedTable
          columns={columns}
          data={OPERATION_DATA}
          pageSize={10}
          rowKey='id'
        />
      </div>
    </div>
  );
}
