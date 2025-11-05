import { useEffect, useState, useCallback } from 'react';

import BluePenBtn from '../../components/button/iconBtn/bluePenBtn';
import PenBtn from '../../components/button/iconBtn/penBtn';
import RefreshBtn from '../../components/button/iconBtn/refreshBtn';
import Calendar from '../../components/calendar';
import Dropdown from '../../components/dropdown/dropdown';
import PaginatedTable from '../../components/paginatedTable';
import Searchbar from '../../components/searchbar';
import type { Column } from '../../types/table';
import AnnouncementModal, {
  type AnnouncementModalData,
} from '../../components/modal/announcementModal';
import { getNoticeList, getNoticeDetail } from '../../apis/operate/noticeApi';
import type { NoticeDetailResponse } from '../../types/api/notice';
import { formatDateToHyphen } from '../../utils/formatDate';

// 테이블 행 타입
type RowType = {
  id: string;
  date: string;
  title: string;
  status: 'POSTED' | 'UNPOSTED';
  author: string;
  views: number;
};

// 공지 상세 → 모달 데이터로 변환
function convertDetailToModalData(detail: NoticeDetailResponse['data']): AnnouncementModalData {
  return {
    title: detail.title,
    popupEnabled: detail.popupEnabled ?? false,
    popupOption: false,
    dateRange: [
      detail.popupStartDate ? new Date(detail.popupStartDate) : null,
      detail.popupEndDate ? new Date(detail.popupEndDate) : null,
    ],
    description: detail.body ?? '',
    images: detail.images ?? [],
    postStatus: detail.status === 'POSTED' ? 'POSTED' : 'UNPOSTED',
  };
}

export default function NoticeEdit() {
  // 필터 상태
  const [search, setSearch] = useState<string>('');
  const [searchFilter, setSearchFilter] = useState<'title' | 'author' | ''>('');
  const [postStatus, setPostStatus] = useState<'POSTED' | 'UNPOSTED' | ''>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // 페이지네이션 상태
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  // 데이터 상태
  const [rows, setRows] = useState<RowType[]>([]);
  const [total, setTotal] = useState<number>(0);

  // 모달 상태
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editNoticeId, setEditNoticeId] = useState<string | null>(null);
  const [editInitialData, setEditInitialData] = useState<AnnouncementModalData | undefined>();

  // 기본 조회기간: 최근 7일
  useEffect(() => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    setStartDate(sevenDaysAgo);
    setEndDate(today);
  }, []);

  // 공지 목록 불러오기
  const fetchList = useCallback(async () => {
    try {
      const res = await getNoticeList({
        search: search || undefined,
        filter: searchFilter || undefined,
        status: postStatus || undefined,
        startDate: formatDateToHyphen(startDate),
        endDate: formatDateToHyphen(endDate),
        page,
        pageSize,
      });

      if (res.status === 'success') {
        // 백엔드 구조 방어적 대응
        const rawData = (res as any).data?.data ?? (res as any).data ?? res;
        const list = Array.isArray(rawData.notices)
          ? rawData.notices
          : Array.isArray(rawData.items)
            ? rawData.items
            : [];

        const mapped: RowType[] = list.map((n: any) => ({
          id: String(n.id ?? ''),
          date: n.date ? n.date.split('-').join('.') : '',
          title: n.title ?? '',
          status: n.status === 'POSTED' || n.status === 'active' ? 'POSTED' : 'UNPOSTED',
          author: n.author ?? '-',
          views: n.views ?? 0,
        }));

        setRows(mapped);
        setTotal(rawData.total ?? 0);
      } else {
        console.error('공지 목록 조회 실패: status !== success', res);
        setRows([]);
        setTotal(0);
      }
    } catch (error) {
      console.error('공지 목록 조회 실패:', error);
      setRows([]);
      setTotal(0);
    }
  }, [search, searchFilter, postStatus, startDate, endDate, page, pageSize]);

  useEffect(() => {
    if (startDate && endDate) fetchList();
  }, [fetchList, startDate, endDate]);

  // 수정 버튼 클릭 → 상세조회 + 모달
  const handleEditClick = async (row: RowType) => {
    try {
      const res = await getNoticeDetail(row.id);
      if (res.status === 'success') {
        const detail = res.data;
        setEditNoticeId(row.id);
        setEditInitialData(convertDetailToModalData(detail));
        setIsEditModalOpen(true);
      } else {
        console.error('공지 상세 조회 실패: status !== success', res);
      }
    } catch (error) {
      console.error('공지 상세 조회 실패:', error);
    }
  };

  // 필터 리셋
  const handleRefresh = () => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    setSearch('');
    setSearchFilter('');
    setPostStatus('');
    setStartDate(sevenDaysAgo);
    setEndDate(today);
    setPage(0);
    setPageSize(10);
  };

  // 테이블 컬럼 정의
  const columns: Column<RowType>[] = [
    { key: 'id', title: '번호', width: '10%', align: 'center' },
    { key: 'date', title: '등록일', width: '15%', align: 'center' },
    { key: 'title', title: '제목', width: '30%', align: 'left', className: 'text-black' },
    {
      key: 'status',
      title: '게시유무',
      width: '10%',
      align: 'center',
      render: (_, row) => (row.status === 'POSTED' ? '게시중' : '미게시'),
    },
    { key: 'author', title: '작성자', width: '15%', align: 'center' },
    { key: 'views', title: '조회수', width: '10%', align: 'center' },
    {
      key: 'edit',
      title: '',
      width: '10%',
      align: 'center',
      render: (_, row) => <BluePenBtn onClick={() => handleEditClick(row)} />,
    },
  ];

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
            onChange={(option) => setSearchFilter(option.value as 'title' | 'author' | '')}
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
              { label: '전체', value: '' },
              { label: '게시중', value: 'POSTED' },
              { label: '미게시', value: 'UNPOSTED' },
            ]}
            value={postStatus}
            onChange={(option) => setPostStatus(option.value as 'POSTED' | 'UNPOSTED' | '')}
          />
        </div>
      </div>

      {/* 테이블 */}
      <PaginatedTable
        columns={columns}
        data={rows}
        page={page}
        pageSize={pageSize}
        total={total}
        rowKey='id'
        onPageChange={(newPage: number) => setPage(newPage)}
        onPageSizeChange={(newSize: number) => {
          setPageSize(newSize);
          setPage(0);
        }}
      />

      {/* 작성 버튼 */}
      <div className='fixed right-40 bottom-16 z-40 lg:right-60 lg:bottom-28'>
        <PenBtn onClick={() => setIsCreateModalOpen(true)} />
      </div>

      {/* 등록 모달 */}
      <AnnouncementModal
        key={'create'}
        visible={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        mode='create'
        onSubmitSuccess={fetchList}
      />

      {/* 수정 모달 */}
      <AnnouncementModal
        key={'modify'}
        visible={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditNoticeId(null);
          setEditInitialData(undefined);
        }}
        mode='edit'
        noticeId={editNoticeId ?? undefined}
        initialData={editInitialData}
        onSubmitSuccess={fetchList}
      />
    </div>
  );
}
