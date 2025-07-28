import { useState, useEffect } from 'react';
import closeIcon from '../../assets/icons/close.svg';
import SmallBtn from '../button/basicBtn/smallBtn';

type TermsModalProps = {
  visible: boolean;
  title: string;
  body: string;
  onClose: () => void;
  onSave?: (newBody: string) => void; // 선택적으로 저장 처리
};

const TermsModal = ({ visible, title, body, onClose, onSave }: TermsModalProps) => {
  const [editedBody, setEditedBody] = useState(body);

  // 모달 열릴 때 body 초기화
  useEffect(() => {
    if (visible) {
      setEditedBody(body);
    }
  }, [visible, body]);

  if (!visible) return null;

  return (
    <div className='bg-black_50 fixed inset-0 z-40 flex items-center transition-opacity duration-500'>
      <div
        className='bg-background flex h-4/5 w-[760px] flex-col rounded-2xl p-5'
        style={{
          position: 'absolute',
          left: 'calc(50% + 140px)',
          transform: 'translateX(-50%)',
        }}
      >
        {/* 헤더 */}
        <div className='border-menuborder mb-5 flex items-center justify-between border-b pb-5'>
          <h1 className='text-text1 text-h1_contents_title'>{title}</h1>
          <img
            src={closeIcon}
            alt='닫기'
            className='h-6 w-6 cursor-pointer'
            onClick={onClose}
          />
        </div>

        {/* 본문 (수정 가능한 textarea) */}
        <div className='flex-grow overflow-y-auto pr-1'>
          <textarea
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
            className='text-body1_r text-subtext1 focus:outline-searchbarborder h-full w-full resize-none rounded-md bg-white p-3 focus:border'
          />
        </div>

        {/* 하단 버튼 */}
        <div className='self-end pt-6 pb-1'>
          <SmallBtn
            title='수정완료'
            onClick={() => {
              console.log('수정 완료:', editedBody);
              onSave?.(editedBody); // 저장 콜백이 있으면 호출
              onClose(); // 닫기
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
