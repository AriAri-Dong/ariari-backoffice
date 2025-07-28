import { useState } from 'react';
import Dropdown from '../../components/dropdown/dropdown';
import PaginatedTable from '../../components/paginatedTable';
import Searchbar from '../../components/searchbar';
import type { Column } from '../../types/table';
import RedDeleteBtn from '../../components/button/iconBtn/redDeleteBtn';
import SmallBtn from '../../components/button/basicBtn/smallBtn';
import NoData from '../../assets/icons/noData.svg';
import CurdModal from '../../components/modal/crudModal';

type RowType = {
  id: string;
};

const data: RowType[] = Array.from({ length: 34 }).map((_, idx) => ({
  id: (idx + 1).toString().padStart(4, '0'),
}));

export default function CrudPage() {
  const [search, setSearch] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [table, setTable] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{ field: string; value: string }[]>([]);

  const filteredData = data.filter((row) => {
    if (!search) return true;
    return row.id.includes(search);
  });

  const columns: Column<RowType>[] = [
    {
      key: 'id',
      title: 'ID',
      width: '90%',
      align: 'left',
      render: (value) => (
        <button
          className='cursor-pointer hover:underline'
          onClick={() => {
            setModalData([
              { field: 'Field 1', value: value },
              { field: 'Field 2', value: value },
              { field: 'Field 3', value: value },
              { field: 'Field 4', value: value },
              { field: 'Field 5', value: value },
              { field: 'Field 6', value: value },
              { field: 'Field 7', value: value },
              { field: 'Field 8', value: value },
            ]);
            setModalOpen(true);
          }}
        >
          {value}
        </button>
      ),
    },
    {
      key: 'edit',
      title: '',
      align: 'right',
      render: () => <RedDeleteBtn onClick={() => alert('삭제')} />,
    },
  ];

  return (
    <div className='relative'>
      {/* 상단 필터 바 */}
      <div className='mb-5 flex w-full items-center gap-3'>
        <Dropdown
          placeholder='Table'
          options={[
            { label: 'GET', value: 'get' },
            { label: 'POST', value: 'post' },
            { label: 'PUT', value: 'put' },
            { label: 'DELETE', value: 'delete' },
          ]}
          value={table}
          onChange={(option) => setTable(option.value)}
        />
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
        <SmallBtn
          round
          title='검색'
          onClick={() => {}}
        />
      </div>

      {/* 결과 영역 */}
      {filteredData.length === 0 ? (
        <div className='mt-20 flex flex-col items-center justify-center'>
          <img
            src={NoData}
            alt='데이터 없음'
            className='h-[124px] w-[124px]'
          />
          <p className='text-text1 text-h1_contents_title'>조회된 ID가 없어요.</p>
        </div>
      ) : (
        <PaginatedTable
          columns={columns}
          data={filteredData}
          pageSize={10}
          rowKey='id'
        />
      )}

      {/* 모달 */}
      <CurdModal
        visible={modalOpen}
        title='Title'
        subtitle='Table : Text'
        data={modalData}
        onClose={() => setModalOpen(false)}
        onReset={() => {
          console.log('초기화');
        }}
      />
    </div>
  );
}
