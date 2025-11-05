import BluePencli from '../../../assets/icons/pencli_blue.svg';

type BluePenBtnProps = {
  onClick?: () => void;
};

const BluePenBtn = ({ onClick }: BluePenBtnProps) => {
  return (
    <button
      onClick={onClick}
      className='bg-selectedoption_default flex h-[30px] min-w-[60px] cursor-pointer items-center gap-0.5 rounded-4xl px-2.5 text-center whitespace-nowrap'
    >
      <p className='text-primary text-body2_sb'>수정</p>
      <img
        src={BluePencli}
        alt='수정'
        className='h-[18px] w-[18px]'
      />
    </button>
  );
};

export default BluePenBtn;
