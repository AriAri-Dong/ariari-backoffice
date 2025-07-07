interface ButtonProps {
  title: string;
  onClick: () => void;
}

/**
 *
 * @param title 버튼 이름
 * @param onClick 버튼 클릭 핸들러
 * @returns
 */
const SmallButton = ({ title, onClick }: ButtonProps) => {
  return (
    <button
      className='bg-primary text-background hover:bg-primary_hover active:bg-primary_pressed rounded-lg px-[22px] py-3 text-base'
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default SmallButton;
