import { useState, useEffect, useCallback } from 'react';
import BluePenBtn from '../../components/button/iconBtn/bluePenBtn';
import RedDeleteBtn from '../../components/button/iconBtn/redDeleteBtn';
import PaginatedTable from '../../components/paginatedTable';
import TermsModal from '../../components/modal/termsModal';
import { getTermsList, getTermDetail, deleteTerm, updateTerm } from '../../apis/operate/termsApi';
import type { TermDetail } from '../../types/api/terms';
import type { Column } from '../../types/table';
import AlertWithMessage from '../../components/alert/alertWithMessage';

type RowType = {
  id: number;
  date: string;
  title: string;
  author: string;
};

export default function TermsEdit() {
  const [rows, setRows] = useState<RowType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [selectedBody, setSelectedBody] = useState<string>('');

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState<boolean>(false);

  // 목록 조회
  const fetchTermsList = useCallback(async () => {
    const res = await getTermsList({ page, pageSize });

    if (typeof res.status === 'number') {
      console.error(res.message);
      return;
    }

    if (res.status !== 'success') {
      console.error('status !== success:', res);
      return;
    }

    setTotal(res.total);

    const mapped = res.items.map((item) => ({
      id: item.id,
      date: item.createdAt,
      title: item.title,
      author: item.author,
    }));

    setRows(mapped);
  }, [page, pageSize]);

  useEffect(() => {
    fetchTermsList();
  }, [fetchTermsList]);

  // 상세 조회 → 수정 모달 열기
  const handleEditClick = async (row: RowType) => {
    setSelectedId(row.id);
    setSelectedTitle(row.title);
    setSelectedBody('');

    const res = await getTermDetail(row.id);

    if (typeof res.status === 'number') {
      console.error(res.message);
      return;
    }

    if (res.status === 'success') {
      const detail: TermDetail = res.data;
      setSelectedTitle(detail.title);
      setSelectedBody(detail.body);
      setIsModalOpen(true);
    }
  };

  // 수정 API 호출
  const handleSave = async (newBody: string) => {
    if (!selectedId) return;

    const res = await updateTerm(selectedId, {
      title: selectedTitle,
      body: newBody,
    });

    if (typeof res.status === 'number') {
      console.error(res.message);
      return;
    }

    // 성공
    await fetchTermsList();
  };

  // 삭제
  const handleDeleteClick = (row: RowType) => {
    setDeleteId(row.id);
    setIsDeleteAlertOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;

    const res = await deleteTerm(deleteId);

    if (typeof res.status === 'number') {
      console.error(res.message);
      return;
    }

    setIsDeleteAlertOpen(false);
    setDeleteId(null);
    fetchTermsList();
  };

  const handleDeleteCancel = () => {
    setIsDeleteAlertOpen(false);
    setDeleteId(null);
  };

  // 컬럼
  const columns: Column<RowType>[] = [
    { key: 'id', title: '번호', width: '10%', align: 'center' },
    { key: 'date', title: '수정일', width: '20%', align: 'left' },
    { key: 'title', title: '약관명칭', width: '40%', align: 'left', className: 'text-black' },
    { key: 'author', title: '수정자', width: '20%', align: 'right' },
    {
      key: 'edit',
      title: '',
      width: '10%',
      align: 'center',
      render: (_, row) => (
        <div className='flex flex-row gap-3'>
          <BluePenBtn onClick={() => handleEditClick(row)} />
          <RedDeleteBtn onClick={() => handleDeleteClick(row)} />
        </div>
      ),
    },
  ];

  return (
    <div className='relative'>
      <PaginatedTable
        columns={columns}
        data={rows}
        page={page}
        pageSize={pageSize}
        total={total}
        rowKey='id'
        onPageChange={(newPage) => setPage(newPage)}
      />

      {/* 수정 모달 */}
      <TermsModal
        visible={isModalOpen}
        title={selectedTitle}
        body={selectedBody}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />

      {/* 삭제 팝업 */}
      {isDeleteAlertOpen && (
        <AlertWithMessage
          text='정말 삭제하시겠습니까?'
          description='삭제된 약관은 복구할 수 없습니다.'
          leftBtnText='취소'
          rightBtnText='삭제'
          onLeftBtnClick={handleDeleteCancel}
          onRightBtnClick={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
