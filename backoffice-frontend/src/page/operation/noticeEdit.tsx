import { useState } from 'react';

import BluePenBtn from '../../components/button/iconBtn/bluePenBtn';
import PenBtn from '../../components/button/iconBtn/penBtn';
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
  status: string;
  author: string;
  views: string;
};

const columns: Column<RowType>[] = [
  { key: 'id', title: '번호', width: '10%', align: 'center' },
  { key: 'date', title: '신고날짜', width: '15%', align: 'left' },
  { key: 'title', title: '제목', width: '30%', align: 'left', className: 'text-black' },
  { key: 'status', title: '게시유무', width: '10%', align: 'center' },
  { key: 'author', title: '작성자', width: '15%', align: 'center' },
  { key: 'views', title: '조회수', width: '10%', align: 'center' },
  {
    key: 'edit',
    title: '',
    width: '10%',
    align: 'center',
    render: () => <BluePenBtn onClick={() => alert('수정')} />,
  },
];

const data: RowType[] = Array.from({ length: 34 }).map((_, idx) => ({
  id: (idx + 1).toString().padStart(4, '0'),
  date: '2024.03.09',
  title: '공지사항 제목',
  status: '게시중',
  author: '작성자',
  views: 'nnnnn',
}));

export default function NoticeEdit() {
  const [search, setSearch] = useState<string>('');
  const [searchFilter, setSearchFilter] = useState<string>(''); // 'title' or 'author' 나중에 수정해야함
  const [postStatus, setPostStatus] = useState<string>(''); // 'all' | 'active' | 'inactive'

  const handleRefresh = () => {
    setSearch('');
    setSearchFilter('');
    setPostStatus('');
    console.log('설정 초기화됨');
  };

  return (
    <div className='relative'>
      {/* 상단 필터 바 */}
      <div className='mb-5 flex items-center justify-between'>
        <div className='flex gap-3'>
          <Dropdown
            placeholder='검색 필터'
            options={[
              { label: '제목', value: 'title' },
              { label: '작성자', value: 'author' },
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
          <Calendar />
          <Dropdown
            placeholder='게시유무'
            options={[
              { label: '전체', value: 'all' },
              { label: '게시중', value: 'active' },
              { label: '비게시', value: 'inactive' },
            ]}
            value={postStatus}
            onChange={(option) => {
              setPostStatus(option.value);
              console.log('게시유무:', option.value);
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
      />

      {/* 작성 버튼 (고정 위치) */}
      <div className='fixed right-10 bottom-10 z-50'>
        <PenBtn onClick={() => alert('작성 버튼 클릭됨')} />
      </div>
    </div>
  );
}
