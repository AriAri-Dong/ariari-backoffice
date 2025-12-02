import { useEffect, useState } from 'react';
import Dropdown from '../../components/dropdown/dropdown';
import PaginatedTable from '../../components/paginatedTable';
import Searchbar from '../../components/searchbar';
import type { Column } from '../../types/table';
import RedDeleteBtn from '../../components/button/iconBtn/redDeleteBtn';
import SmallBtn from '../../components/button/basicBtn/smallBtn';
import NoData from '../../assets/icons/noData.svg';
import CurdModal from '../../components/modal/crudModal';
import Alert from '../../components/alert/alert';
import { CRUD_TABLE, CRUD_TABLE_COLUMN_MAP } from '../../constants/crud';
import { deleteData, getDataDetail, getDataList } from '../../apis/crud/api';
import { isApiError } from '../../utils/typeGuard';
import type { CrudItem } from '../../types/api/crud';

type RowType = {
  id: string;
  deletedDateTime?: string | null;
};

type FieldData = {
  field: string;
  value: string;
};

const PAGE_SIZE = 10;

export default function CrudPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [table, setTable] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [dataList, setDataList] = useState<RowType[] | null>(null);
  const [data, setData] = useState<FieldData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number | undefined>(undefined);
  const [selectedId, setSelectedId] = useState<string>('');
  const [alertText, setAlertText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mapIdsToObjects = (items: CrudItem[]): RowType[] => {
    return items.map((item) => ({
      id: item.id,
      deletedDateTime: item.deletedDateTime ?? null,
    }));
  };

  const convertFieldsToArray = (fields: Record<string, any>): FieldData[] => {
    return Object.entries(fields).map(([key, val]) => ({
      field: key,
      value: val,
    }));
  };

  // 데이터 리스트 조회 API 호출
  const fetchData = async (targetPage: number = 1) => {
    if (!table) return;

    setIsLoading(true);

    const params = {
      table,
      page: targetPage,
      pageSize: PAGE_SIZE,
      ...(filter?.trim() && { filter: filter.trim() }),
      ...(search?.trim() && { keyword: search.trim() }),
    };

    const res = await getDataList(params);

    // API 에러 형태인지 확인
    if (isApiError(res)) {
      setDataList(null);
      setTotal(undefined);
      setIsLoading(false);
      return;
    }

    const _data = mapIdsToObjects(res.data.items || []);
    setDataList(_data);
    setTotal(res.data.total);
    setPage(targetPage);
    setIsLoading(false);
  };

  //데이터 상세 조회 API 호출
  const fetchDataDetail = async (id: string) => {
    const res = await getDataDetail(table, id);

    // API 에러 형태인지 확인
    if (isApiError(res)) {
      setData([]);
      return;
    }

    const fields = res.data.fields;
    const formatted = convertFieldsToArray(fields);

    setData(formatted);
  };

  //데이터 상세 조회 API 호출
  const handleDelete = async (id: string) => {
    const res = await deleteData(table, id);
    setAlertText(res.message);
    setModalOpen(false);

    if (res.status === 'success') {
      fetchData(page);
    }
  };

  useEffect(() => {
    if (table) {
      fetchData(1);
    } else {
      setDataList(null);
      setTotal(undefined);
      setPage(1);
    }
  }, [table]);

  useEffect(() => {
    if (table && filter && search) {
      fetchData(1);
    }
  }, [filter]);

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
            fetchDataDetail(value);
            setModalOpen(true);
            setSelectedId(value);
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
      render: (_value, row) =>
        row.deletedDateTime ? (
          <div className='flex h-[30px] min-w-[60px] cursor-pointer items-center gap-0.5 rounded-4xl px-2.5 text-center whitespace-nowrap'>
            <p className='text-noti text-body2_sb'>삭제됨</p>
          </div>
        ) : (
          <RedDeleteBtn
            onClick={() => {
              handleDelete(row.id);
            }}
          />
        ),
    },
  ];

  return (
    <div className='relative'>
      {/* 상단 필터 바 */}
      <div className='mb-5 flex w-full items-center gap-3'>
        <Dropdown
          placeholder='Table'
          options={CRUD_TABLE}
          value={table}
          onChange={(option) => {
            setTable(option.value);
            setFilter('');
            setSearch('');
          }}
        />
        <Dropdown
          placeholder='검색 필터'
          options={CRUD_TABLE_COLUMN_MAP[table]}
          value={filter}
          onChange={(option) => setFilter(option.value)}
        />
        <Searchbar
          value={search}
          onChange={setSearch}
          placeholder={filter ? '검색어 입력' : '검색 필터를 먼저 선택해주세요.'}
          disabled={!filter}
          onSearch={() => {
            fetchData();
          }}
        />
        <SmallBtn
          round
          title='검색'
          onClick={() => {
            fetchData();
          }}
        />
        <SmallBtn
          round
          title='초기화'
          onClick={() => {
            setTable('');
            setFilter('');
            setSearch('');
            setDataList(null);
          }}
        />
      </div>

      {/* 결과 영역 */}
      {isLoading ? (
        <div className='mt-40 flex flex-col items-center justify-center'>
          <p className='text-mobile_h4_r text-subtext1'>Loading...</p>
        </div>
      ) : dataList?.length == 0 ? (
        <div className='mt-40 flex flex-col items-center justify-center'>
          <img
            src={NoData}
            alt='데이터 없음'
            className='h-[124px] w-[124px]'
          />
          <p className='text-text1 text-h1_contents_title'>검색결과가 없습니다.</p>
        </div>
      ) : (
        <PaginatedTable<RowType>
          columns={columns}
          data={dataList || []}
          page={page}
          pageSize={PAGE_SIZE}
          total={total}
          rowKey='id'
          onPageChange={(newPage) => {
            fetchData(newPage);
          }}
        />
      )}

      {/* 모달 */}
      <CurdModal
        visible={modalOpen}
        title={table}
        subtitle={`ID: ${selectedId}`}
        data={data || []}
        onClose={() => {
          setModalOpen(false);
          setData([]);
        }}
        onReset={() => {
          handleDelete(selectedId);
        }}
      />
      {alertText && (
        <Alert
          text={alertText}
          onClose={() => setAlertText('')}
        />
      )}
    </div>
  );
}
