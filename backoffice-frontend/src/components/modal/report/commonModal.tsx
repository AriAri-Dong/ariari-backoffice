import { useState } from 'react';
import closeIcon from '../../../assets/icons/close.svg';
import SmallBtn from '../../button/basicBtn/smallBtn';
import AcceptanceModal from './acceptanceModal';
import QnaModal from './qnaMadal';
import ClubModal from './clubModal';
import ClubReviewModal from './activityModal';
import PostModal from './postModal';
import RecruitmentModal from './recruitmentModal';

interface CommonModalProps {
  row: any;
  onClose: () => void;
}
export type rowType = 'ACCEPTANCE_REVIEW' | 'QNA' | 'CLUB' | 'CLUB_REVIEW' | 'POST' | 'RECRUITMENT';
const CommonModal = ({ row, onClose }: CommonModalProps) => {
  const [modalType, setModalType] = useState<rowType | null>(null);
  const handleClick = () => {
    setModalType(row.position);
    console.log(modalType);
  };
  return (
    <div className='flex w-full flex-col items-start justify-start gap-5 self-stretch rounded-xl bg-white p-8 shadow-md'>
      <div className='flex w-full flex-col items-start justify-start gap-5 self-stretch'>
        <div className='inline-flex items-center justify-between self-stretch'>
          <div className="justify-start font-['Pretendard'] text-lg leading-relaxed font-semibold text-black">
            {row.title}
          </div>
          <img
            src={closeIcon}
            alt='닫기'
            className='h-6 w-6 cursor-pointer'
            onClick={onClose}
          />
        </div>
        <div className='h-0 self-stretch outline outline-1 outline-offset-[-0.50px] outline-neutral-200' />
      </div>
      <div className='flex flex-col items-start justify-start gap-7 self-stretch'>
        <div className='flex flex-col items-start justify-start gap-2.5 self-stretch'>
          <div className="justify-start font-['Pretendard'] text-lg leading-relaxed font-semibold text-black">
            신고 접수 날짜
          </div>
          <div className="justify-center self-stretch font-['Pretendard'] text-base leading-snug font-normal text-slate-500">
            {row.date}
          </div>
        </div>
        <div className='flex flex-col items-start justify-start self-stretch'>
          <div className='flex flex-col items-start justify-start gap-2.5 self-stretch'>
            <div className="justify-start font-['Pretendard'] text-lg leading-relaxed font-semibold text-black">
              신고 위치
            </div>
            <div className='inline-flex items-center justify-start gap-12 rounded-lg bg-slate-50 py-2.5 pr-3 pl-4 outline outline-1 outline-offset-[-1px] outline-slate-200'>
              <div className="justify-center font-['Pretendard'] text-base leading-snug font-normal text-slate-500">
                {row.position}
              </div>
              <div
                data-corner='Rounded'
                data-size='Small'
                data-state='Default'
                data-style='Line'
                data-text-parallel='false'
                data-type='Text'
                className='flex h-11 items-center justify-center gap-2.5 rounded-3xl bg-blue-400/10 px-5 py-3 outline outline-1 outline-offset-[-1px] outline-blue-400'
              >
                <div
                  className="justify-start font-['Pretendard'] text-base leading-snug font-semibold text-blue-400"
                  onClick={handleClick}
                >
                  열람하기
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-start justify-start gap-2.5 self-stretch'>
          <div className="justify-start font-['Pretendard'] text-lg leading-relaxed font-semibold text-black">
            신고인
          </div>
          <div className="justify-center self-stretch font-['Pretendard'] text-base leading-snug font-normal text-slate-500">
            {row.user}
          </div>
        </div>
        <div className='flex flex-col items-start justify-start gap-6 self-stretch'>
          <div className='flex flex-col items-start justify-start gap-2.5 self-stretch'>
            <div className="justify-start font-['Pretendard'] text-lg leading-relaxed font-semibold text-black">
              신고사유
            </div>
            <div className="justify-center self-stretch font-['Pretendard'] text-base leading-snug font-normal text-slate-500">
              신고시 선택한 항목
            </div>
          </div>
          <div className='flex flex-col items-start justify-start gap-4 self-stretch overflow-hidden rounded-xl bg-gray-100 px-5 py-3'>
            <div className="justify-start self-stretch font-['Pretendard'] text-base leading-snug font-normal text-slate-500">
              신고사유 상세 내용
            </div>
          </div>
        </div>
      </div>
      <div className='flex w-full items-center justify-center gap-3'>
        <SmallBtn
          title={'조치완료'}
          onClick={() => {}}
          className='bg-red'
        />

        <SmallBtn
          title={'삭제하기'}
          onClick={() => {}}
          className='!bg-noti'
        />
      </div>
      {modalType == 'ACCEPTANCE_REVIEW' && (
        <AcceptanceModal
          visible={modalType == 'ACCEPTANCE_REVIEW'}
          onClose={() => setModalType(null)}
        />
      )}
      {modalType == 'QNA' && (
        <QnaModal
          visible={modalType == 'QNA'}
          onClose={() => setModalType(null)}
        />
      )}
      {modalType == 'CLUB' && (
        <ClubModal
          visible={modalType == 'CLUB'}
          onClose={() => setModalType(null)}
        />
      )}
      {modalType == 'CLUB_REVIEW' && (
        <ClubReviewModal
          visible={modalType == 'CLUB_REVIEW'}
          onClose={() => setModalType(null)}
        />
      )}
      {modalType == 'POST' && (
        <PostModal
          visible={modalType == 'POST'}
          onClose={() => setModalType(null)}
        />
      )}
      {modalType == 'RECRUITMENT' && (
        <RecruitmentModal
          visible={modalType == 'RECRUITMENT'}
          onClose={() => setModalType(null)}
        />
      )}
    </div>
  );
};

export default CommonModal;
