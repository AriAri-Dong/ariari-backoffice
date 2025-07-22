import Pencli from '../../../assets/icons/pencli_white.svg';

type PenBtnProps = {
  onClick?: () => void;
};

const PenBtn = ({ onClick }: PenBtnProps) => {
  return (
    <button
      onClick={onClick}
      className='bg-primary cursor-pointer items-center rounded-full p-3'
    >
      <img
        src={Pencli}
        alt='작성하기'
        className='h-7 w-7'
      />
    </button>
  );
};

export default PenBtn;
