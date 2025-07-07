import SmallBtn from '../button/basicBtn/smallBtn';

export interface AlertProps {
  text: string;
  description: string;
  leftBtnText: string;
  rightBtnText: string;
  onLeftBtnClick?: () => void;
  onRightBtnClick?: () => void;
}

/**
 * AlertWithMessage component
 * @param text 메인 텍스트
 * @param description 서브 텍스트
 * @param leftBtnText 왼쪽 버튼 텍스트
 * @param rightBtnText 오른쪽 버튼 텍스트
 * @param onLeftBtnClick 왼쪽 버튼 클릭 핸들러
 * @param onRightBtnClick 오른쪽 버튼 클릭 핸들러
 */
const AlertWithMessage = ({
  text,
  description,
  leftBtnText,
  rightBtnText,
  onLeftBtnClick = () => {},
  onRightBtnClick = () => {},
}: AlertProps) => {
  return (
    <div className='bg-black_50 fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500'>
      <div className='shadow-default flex w-[300px] flex-col gap-4 rounded-xl bg-white px-3 py-4 md:w-[320px] md:px-4'>
        <div className='flex flex-col gap-2 md:gap-3'>
          <h1 className='text-mobile_body1_sb text-text1 md:text-body1_sb'>{text}</h1>
          <p className='text-mobile_body2_r text-subtext1 md:text-body2_r whitespace-pre-wrap'>
            {description}
          </p>
        </div>
        {/* 버튼 영역 */}
        <div className='text-mobile_body2_sb md:text-body1_sb flex items-center justify-end gap-5'>
          <button
            className='text-primary cursor-pointer'
            onClick={onLeftBtnClick}
          >
            {leftBtnText}
          </button>
          <SmallBtn
            title={rightBtnText}
            onClick={onRightBtnClick}
            round
          />
        </div>
      </div>
    </div>
  );
};

export default AlertWithMessage;
