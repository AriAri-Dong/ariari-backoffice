import trashIcon from '../../assets/icons/delete.svg';
import closeIcon from '../../assets/icons/close.svg';

type ModalData = {
  field: string;
  value: string;
}[];

type CurdModalProps = {
  visible: boolean;
  title: string;
  subtitle: string;
  data: ModalData;
  onClose: () => void;
  onReset?: () => void;
};

const CurdModal = ({ visible, title, subtitle, data, onClose, onReset }: CurdModalProps) => {
  if (!visible) return null;

  return (
    <div className='bg-black_50 fixed inset-0 z-40 flex items-center justify-center transition-opacity duration-500'>
      <div className='flex w-[760px] flex-col gap-3'>
        {/* Title */}
        <div className='bg-background flex items-center justify-between rounded-full px-5 py-3'>
          <h1 className='text-text1 text-h3'>
            {title}
            <span className='text-subtext2 text-body2_r ml-2'>{subtitle}</span>
          </h1>
          <img
            src={closeIcon}
            alt='닫기'
            className='h-6 w-6 cursor-pointer'
            onClick={onClose}
          />
        </div>
        {/* Body */}
        <div></div>
        {/* 리스트 */}
        <div className='bg-background max-h-[420px] overflow-y-auto rounded-2xl px-5 pt-[3px] pb-2.5'>
          {data.map((item, idx) => (
            <div
              key={idx}
              className={`border-menuborder flex items-center justify-between border-b pt-[15px] pb-2.5 text-sm last:border-none`}
            >
              <span className='text-h4_sb text-black'>{item.field}</span>
              <span className='text-body1_r text-subtext1'>{item.value}</span>
            </div>
          ))}
        </div>

        {/* 하단 휴지통 버튼 */}
        {onReset && (
          <div className='mt-3 flex justify-center'>
            <button
              onClick={onReset}
              className='bg-background flex h-11 w-11 cursor-pointer items-center justify-center rounded-full'
            >
              <img
                src={trashIcon}
                alt='초기화'
                className='h-6 w-6'
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurdModal;
