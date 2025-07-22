import Trash from '../../../assets/icons/delete_red.svg';

type RedDeleteBtnProps = {
  onClick?: () => void;
};

const RedDeleteBtn = ({ onClick }: RedDeleteBtnProps) => {
  return (
    <button
      onClick={onClick}
      className='bg-token_1_bg flex h-[30px] cursor-pointer items-center gap-0.5 rounded-4xl px-2.5 text-center whitespace-nowrap'
    >
      <p className='text-noti text-body2_sb'>삭제</p>
      <img
        src={Trash}
        alt='삭제'
        className='h-[18px] w-[18px]'
      />
    </button>
  );
};

export default RedDeleteBtn;
