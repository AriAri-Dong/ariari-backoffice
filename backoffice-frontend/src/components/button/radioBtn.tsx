import checkIcon from '../../assets/icons/radio_active.svg';
import uncheckIcon from '../../assets/icons/radio_inactive.svg';

interface RadioButtonProps {
  isChecked: boolean;
  label?: string;
  onClick: () => void;
  className?: string;
  imgClassName?: string;
}

/**
 *
 * @param isChecked 체크 여부
 * @param label 버튼 이름
 * @param onClick 클릭 핸들러
 * @returns
 */
const RadioBtn = ({ isChecked, label, onClick, className, imgClassName }: RadioButtonProps) => {
  return (
    <div
      className={`text-body1_m flex cursor-pointer items-center gap-2.5 p-2.5 pr-4 ${className}`}
      onClick={onClick}
    >
      <img
        src={isChecked ? checkIcon : uncheckIcon}
        alt={isChecked ? 'Checked' : 'Unchecked'}
        className={`h-5 w-5 ${imgClassName}`}
      />
      {label && <p className='text-icon'>{label}</p>}
    </div>
  );
};

export default RadioBtn;
