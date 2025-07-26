import { useState } from 'react';

import Dropdown from '../../components/dropdown/dropdown';
import PaginatedTable from '../../components/paginatedTable';
import Searchbar from '../../components/searchbar';
import type { Column } from '../../types/table';
import RedDeleteBtn from '../../components/button/iconBtn/redDeleteBtn';
import SmallBtn from '../../components/button/basicBtn/smallBtn';
import NoData from '../../assets/icons/noData.svg';

type RowType = {
  id: string;
};

const columns: Column<RowType>[] = [
  { key: 'id', title: 'ID', width: '90%', align: 'left' },
  {
    key: 'edit',
    title: '',
    align: 'right',
    render: () => <RedDeleteBtn onClick={() => alert('삭제')} />,
  },
];

const data: RowType[] = Array.from({ length: 34 }).map((_, idx) => ({
  id: (idx + 1).toString().padStart(4, '0'),
}));

export default function CrudPage() {
  const [search, setSearch] = useState<string>('');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [table, setTable] = useState<string>('');

  // 간단히 id 기준 검색
  const filteredData = data.filter((row) => {
    if (!search) return true;
    return row.id.includes(search);
  });

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
          onChange={(option) => {
            setTable(option.value);
          }}
        />
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
    </div>
  );
}
