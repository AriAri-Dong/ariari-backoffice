import { useState, useEffect, useCallback } from 'react';
import BluePenBtn from '../../components/button/iconBtn/bluePenBtn';
import PenBtn from '../../components/button/iconBtn/penBtn';
import RefreshBtn from '../../components/button/iconBtn/refreshBtn';
import Dropdown from '../../components/dropdown/dropdown';
import PaginatedTable from '../../components/paginatedTable';
import type { Column } from '../../types/table';
import FaqModal from '../../components/modal/FaqModal';
import RedDeleteBtn from '../../components/button/iconBtn/redDeleteBtn';
import { getFaqList, deleteFaq } from '../../apis/operate/faqApi';
import AlertWithMessage from '../../components/alert/alertWithMessage';
import type { FaqCategory, FaqListItem } from '../../types/api/faq';

export default function FaqEdit() {
  const [category, setCategory] = useState<FaqCategory | ''>('');
  const [faqList, setFaqList] = useState<FaqListItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedRowData, setSelectedRowData] = useState<FaqListItem | null>(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState<boolean>(false);
  const [deleteFaqId, setDeleteFaqId] = useState<string | null>(null);

  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  const columns: Column<FaqListItem>[] = [
    { key: 'id', title: '번호', width: '10%', align: 'center' },
    { key: 'category', title: '분류', width: '10%', align: 'center' },
    { key: 'title', title: '제목', width: '70%', align: 'left', className: 'text-black' },
    {
      key: 'edit',
      title: '',
      width: '10%',
      align: 'center',
      render: (_, row) => (
        <div className='flex flex-row gap-3'>
          <BluePenBtn
            onClick={() => {
              setSelectedRowData(row);
              setIsEditModalOpen(true);
            }}
          />
          <RedDeleteBtn onClick={() => handleDeleteClick(row)} />
        </div>
      ),
    },
  ];

  const fetchFaqList = useCallback(async () => {
    try {
      const res = await getFaqList({ category, page, pageSize });
      if (res.status === 'success') {
        const list = res.data.faqs.map((faq: FaqListItem) => ({
          id: faq.id,
          category: faq.category,
          title: faq.title,
          tokenColor: faq.tokenColor,
          description: faq.description,
        }));
        setFaqList(list);
      }
    } catch (error) {
      console.error('Error fetching FAQ list:', error);
    }
  }, [category, page, pageSize]);

  useEffect(() => {
    fetchFaqList();
  }, [fetchFaqList]);

  const handleRefresh = () => {
    setCategory('');
    setPage(0);
    setPageSize(10);
    fetchFaqList();
  };

  const handleDeleteClick = (row: FaqListItem) => {
    setDeleteFaqId(row.id);
    setIsDeleteAlertOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteFaqId) {
      try {
        await deleteFaq(deleteFaqId);
        setIsDeleteAlertOpen(false);
        fetchFaqList();
      } catch (error) {
        console.error('Error deleting FAQ:', error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteAlertOpen(false);
  };

  return (
    <div className='relative'>
      {/* Filter & other controls */}
      <div className='mb-5 flex items-center justify-end gap-3'>
        <RefreshBtn onClick={handleRefresh} />
        <Dropdown
          placeholder='분류'
          options={[
            { label: '전체', value: '' },
            { label: 'ACCOUNT', value: 'ACCOUNT' },
            { label: 'CLUB', value: 'CLUB' },
            { label: 'DATA', value: 'DATA' },
            { label: 'GENERAL', value: 'GENERAL' },
            { label: 'LOGIN', value: 'LOGIN' },
            { label: 'MAINTENANCE', value: 'MAINTENANCE' },
            { label: 'POLICY', value: 'POLICY' },
            { label: 'SECURITY', value: 'SECURITY' },
            { label: 'SERVICE', value: 'SERVICE' },
            { label: 'TECHNICAL', value: 'TECHNICAL' },
            { label: 'UPDATE', value: 'UPDATE' },
          ]}
          value={category}
          onChange={(option) => setCategory(option.value as FaqCategory | '')} // Ensure proper type
        />
      </div>

      {/* FAQ Table */}
      <PaginatedTable
        columns={columns}
        data={faqList}
        pageSize={10}
        rowKey='id'
      />

      {/* Add FAQ Button */}
      <div className='fixed right-40 bottom-16 z-40 lg:right-60 lg:bottom-28'>
        <PenBtn
          onClick={() => {
            setIsModalOpen(true);
          }}
        />
      </div>

      {/* FAQ Create/Edit Modal */}
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

      {/* Delete Confirmation Alert */}
      {isDeleteAlertOpen && (
        <AlertWithMessage
          text='정말 삭제하시겠습니까?'
          description='삭제된 FAQ는 복구할 수 없습니다.'
          leftBtnText='취소'
          rightBtnText='삭제'
          onLeftBtnClick={handleDeleteCancel}
          onRightBtnClick={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
