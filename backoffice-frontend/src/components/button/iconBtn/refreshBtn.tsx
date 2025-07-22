import RefreshIcon from '../../../assets/icons/refresh.svg';

type RefreshBtnProps = {
  onClick?: () => void;
};

const RefreshBtn = ({ onClick }: RefreshBtnProps) => {
  return (
    <button
      onClick={onClick}
      className='flex cursor-pointer items-center gap-1.5 bg-transparent p-1 pr-1.5'
    >
      <img
        src={RefreshIcon}
        alt='초기화'
        className='h-[18px] w-[18px]'
      />
      <p className='text-body3_m text-icon'>초기화</p>
    </button>
  );
};

export default RefreshBtn;
