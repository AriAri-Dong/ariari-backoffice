import { useState } from 'react';

import PaginatedTable from '../../components/paginatedTable';
import type { Column } from '../../types/table';
import PenBtn from '../../components/button/iconBtn/penBtn';
import AlertModal from '../../components/modal/alertModal';
import type { FaqCategory } from '../../types/api/faq';

type RowType = {
  id: string;
  category: FaqCategory;
  title: string;
  views: string;
  target: string;
};

const columns: Column<RowType>[] = [
  { key: 'id', title: '번호', width: '10%', align: 'center' },
  { key: 'category', title: '분류', width: '10%', align: 'center' },
  { key: 'title', title: '제목', width: '55%', align: 'left', className: 'text-black' },
  { key: 'views', title: '조회수', width: '10%', align: 'center' },
  { key: 'target', title: '대상', width: '15%', align: 'center' },
];

const data: RowType[] = Array.from({ length: 25 }).map((_, i) => ({
  id: String(i + 1).padStart(4, '0'),
  category: 'ACCOUNT',
  title: '공지사항 제목',
  views: 'nnn',
  target: '동아리 관리자',
}));

export default function NotificationSend() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className='relative'>
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
      <AlertModal
        visible={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
