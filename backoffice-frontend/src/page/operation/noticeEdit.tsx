import { useState } from 'react';

import BluePenBtn from '../../components/button/iconBtn/bluePenBtn';
import PenBtn from '../../components/button/iconBtn/penBtn';
import RefreshBtn from '../../components/button/iconBtn/refreshBtn';
import Calendar from '../../components/calendar';
import Dropdown from '../../components/dropdown/dropdown';
import PaginatedTable from '../../components/paginatedTable';
import Searchbar from '../../components/searchbar';
import type { Column } from '../../types/table';
import AnnouncementModal from '../../components/modal/announcementModal';

// 테이블용 데이터 타입
type RowType = {
  id: string;
  date: string;
  title: string;
  status: string;
  author: string;
  views: string;
};

// 모달용 데이터 타입
type AnnouncementModalData = {
  title: string;
  popupEnabled: boolean;
  popupOption: boolean;
  dateRange: [Date | null, Date | null];
  description: string;
  images: File[];
  postStatus: 'posted' | 'unposted';
};

// 변환 함수: RowType → AnnouncementModalData
const convertToModalData = (row: RowType): AnnouncementModalData => ({
  title: row.title,
  popupEnabled: false,
  popupOption: false,
  dateRange: [null, null],
  description: '',
  images: [],
  postStatus: row.status === '게시중' ? 'posted' : 'unposted',
});

// 더미 데이터
const data: RowType[] = Array.from({ length: 34 }).map((_, idx) => ({
  id: (idx + 1).toString().padStart(4, '0'),
  date: '2024.03.09',
  title: `공지사항 제목 ${idx + 1}`,
  status: '게시중',
  author: '작성자',
  views: '123',
}));

export default function NoticeEdit() {
  const [search, setSearch] = useState<string>('');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [postStatus, setPostStatus] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedRowData, setSelectedRowData] = useState<RowType | null>(null);

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
    setSearch('');
    setSearchFilter('');
    setPostStatus('');
    setStartDate(null);
    setEndDate(null);
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
              { label: '작성자', value: 'author' },
            ]}
            value={searchFilter}
            onChange={(option) => setSearchFilter(option.value)}
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
            placeholder='게시유무'
            options={[
              { label: '전체', value: 'all' },
              { label: '게시중', value: 'active' },
              { label: '비게시', value: 'inactive' },
            ]}
            value={postStatus}
            onChange={(option) => setPostStatus(option.value)}
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

      {/* 작성하기 버튼 */}
      <div className='fixed right-40 bottom-16 z-40 lg:right-60 lg:bottom-28'>
        <PenBtn onClick={() => setIsModalOpen(true)} />
      </div>

      {/* 작성 모달 */}
      <AnnouncementModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode='create'
      />

      {/* 수정 모달 */}
      <AnnouncementModal
        visible={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedRowData(null);
        }}
        mode='edit'
        initialData={selectedRowData ? convertToModalData(selectedRowData) : undefined}
      />
    </div>
  );
}
