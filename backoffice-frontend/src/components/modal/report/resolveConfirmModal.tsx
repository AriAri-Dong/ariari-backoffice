import { useState } from "react";
import CustomTextArea from "../../textArea/customTextArea";
import SmallBtn from "../../button/basicBtn/smallBtn";
import WhiteButton from "../../button/basicBtn/whiteBtn";

type ModalProps = {
  visible: boolean;
  onConfirm: (text: string) => void;
  onClose: () => void;
};

const ResolveConfirmModal = ({ visible, onConfirm,onClose }: ModalProps) => {
  if (!visible) return null;
  const [text, setText] = useState<string>('');

  return (
    <div className='bg-black_50 fixed inset-0 z-40 flex items-center transition-opacity duration-500'>
      <div
        className='flex w-[430px] flex-col gap-3 bg-white py-9 px-5 rounded-2xl'
        style={{
          position: 'absolute',
          left: 'calc(50% + 140px)',
          transform: 'translateX(-50%)',
        }}
      >
        <div className="flex flex-col gap-8">
          <p className="text-xl font-semibold text-center">조치방법 작성</p>
          <CustomTextArea
            value={text}
            onChange={(e) => setText(e.currentTarget.value || '')}
            className='h-[150px]'
            placeholder='조치 방법을 작성해 주세요. (최대 100자)'
            maxLength={100}
            
          />
          <div className='flex w-full flex-col gap-3'>
            <SmallBtn
              title='작성완료'
              onClick={() => onConfirm(text)}
            />
            <WhiteButton
              title='취소'
              onClick={onClose}
              className='h-[44px]!'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResolveConfirmModal;
