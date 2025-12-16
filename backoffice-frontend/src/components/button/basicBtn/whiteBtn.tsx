import type { ButtonWithTextProps } from '../../../types/button';

const WhiteButton = ({ title, onClick, className }: ButtonWithTextProps) => {
  return (
    <button
      className={`text-icon text-15 active:bg-hover md:hover:bg-hover md:active:bg-pressed font-medium' rounded-lg px-2 py-1 ${className}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default WhiteButton;
