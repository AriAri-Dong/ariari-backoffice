import { useState, useEffect, useCallback } from 'react';
import PaginatedTable from '../../components/paginatedTable';
import type { Column } from '../../types/table';
import PenBtn from '../../components/button/iconBtn/penBtn';
import AlertModal from '../../components/modal/alertModal';
import { getSystemAlarmList } from '../../apis/operate/systemAlarmApi';

type RowType = {
  id: number;
  title: string;
  views: number;
  target: string;
  createdAt: string;
};

const columns: Column<RowType>[] = [
  { key: 'id', title: '번호', width: '10%', align: 'center' },
  { key: 'title', title: '제목', width: '55%', align: 'left', className: 'text-black' },
  { key: 'views', title: '조회수', width: '10%', align: 'center' },
  { key: 'target', title: '대상', width: '15%', align: 'center' },
  { key: 'createdAt', title: '등록일', width: '10%', align: 'center' },
];

export default function NotificationSend() {
  // 리스트 데이터
  const [rows, setRows] = useState<RowType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  // 등록 모달
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 리스트 조회 API 연결
  const fetchAlarmList = useCallback(async () => {
    const res = await getSystemAlarmList({
      page,
      pageSize,
      search: '',
      filter: '',
    });

    if ('error' in res) {
      return;
    }

    if (res.status !== 'success') {
      console.error('status !== success', res);
      return;
    }

    setTotal(res.total);

    const mapped: RowType[] = res.items.map((item) => ({
      id: item.id,
      title: item.title,
      views: item.views,
      target: item.target,
      createdAt: item.createdAt,
    }));

    setRows(mapped);
  }, [page, pageSize]);

  useEffect(() => {
    fetchAlarmList();
  }, [fetchAlarmList]);

  return (
    <div className='relative'>
      {/* 테이블 */}
      <PaginatedTable
        columns={columns}
        data={rows}
        page={page}
        pageSize={pageSize}
        total={total}
        rowKey='id'
        onPageChange={(newPage) => setPage(newPage)}
      />

      {/* 작성 버튼 */}
      <div className='fixed right-40 bottom-16 z-40 lg:right-60 lg:bottom-28'>
        <PenBtn
          onClick={() => {
            setIsModalOpen(true);
          }}
        />
      </div>

      {/* 등록 모달 */}
      <AlertModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchAlarmList}
      />
    </div>
  );
}
