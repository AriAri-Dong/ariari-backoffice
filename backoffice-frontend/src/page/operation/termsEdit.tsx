import BluePenBtn from '../../components/button/iconBtn/bluePenBtn';
import PaginatedTable from '../../components/paginatedTable';
import { OPERATION_DATA } from '../../data/operation';
import type { Column } from '../../types/table';

type RowType = {
  id: number;
  date: string;
  title: string;
  author: string;
};

const columns: Column<RowType>[] = [
  { key: 'id', title: '번호', width: '10%', align: 'center' },
  { key: 'date', title: '수정일', width: '20%', align: 'left' },
  { key: 'title', title: '약관명칭', width: '40%', align: 'left', className: 'text-black' },
  { key: 'author', title: '수정자', width: '20%', align: 'right' },
  {
    key: 'edit',
    title: '',
    width: '20%',
    align: 'center',
    render: () => <BluePenBtn onClick={() => alert('수정')} />,
  },
];

export default function TermsEdit() {
  return (
    <PaginatedTable
      columns={columns}
      data={OPERATION_DATA}
      pageSize={10}
      rowKey='id'
    />
  );
}
