import { useState } from 'react';
import closeIcon from '../../../assets/icons/close.svg';
import SmallBtn from '../../button/basicBtn/smallBtn';
import QnaModal from './qnaMadal';
import ClubModal from './clubModal';
import ClubReviewModal from './reviewModal';
import PostModal from './postModal';
import RecruitmentModal from './recruitmentModal';
import formatDateToDot from '../../../utils/formatDate';
import { useMutation } from '@tanstack/react-query';
import { deleteReport, resolveReport } from '../../../apis/report/api';
import ResolveConfirmModal from './resolveConfirmModal';
import AlertWithMessage from '../../alert/alertWithMessage';
import { useSearchParams } from 'react-router';
import { REPORT_LOC } from '../../../constants/report';

interface CommonModalProps {
  row: any;
  onClose: () => void;
}
export type rowType =
  | 'ClubQuestionReport'
  | 'ClubReport'
  | 'ClubActivityReport'
  | 'POST'
  | 'ClubReviewReport'
  | 'RecruitmentReport';

export const REPORT_REASONS: { label: string; value: string }[] = [
  { label: '스팸 홍보/도배글 입니다.', value: 'SPAM_ADVERTISEMENT' },
  { label: '음란물입니다.', value: 'PORNOGRAPHY' },
  { label: '불법정보를 포함하고 있습니다.', value: 'ILLEGAL_INFORMATION' },
  { label: '욕설/생명경시/혐오/차별적 표현입니다.', value: 'ABUSIVE_LANGUAGE' },
  { label: '개인정보 노출 게시물입니다.', value: 'PERSONAL_INFORMATION' },
  { label: '불쾌한 표현이 있습니다.', value: 'OFFENSIVE_EXPRESSION' },
  { label: '기타', value: 'ETC' },
];

const CommonModal = ({ row, onClose }: CommonModalProps) => {
  const [searchParams] = useSearchParams();

  const [modalType, setModalType] = useState<rowType | null>(null);
  const [showResolveConfirmAlert, setShowResolvConfirmAlert] = useState<boolean>(false);
  const [showDeleteConfirmAlert, setShowDeleteConfirmAlert] = useState<boolean>(false);
  const handleClick = () => {
    setModalType(row.location);
    console.log(modalType);
  };

  const tabKey = searchParams.get('tab');

  const { mutate: resolveMutate } = useMutation({
    mutationFn: resolveReport,
    onSuccess: () => setShowResolvConfirmAlert(false),
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteReport,
    onSuccess: () => setShowDeleteConfirmAlert(false),
  });

  return (
    <div className='flex w-full flex-col items-start justify-start gap-5 self-stretch rounded-xl bg-white p-8 shadow-md'>
      <div className='flex w-full flex-col items-start justify-start gap-5 self-stretch'>
        <div className='inline-flex items-center justify-between self-stretch'>
          <div className="justify-start font-['Pretendard'] text-lg leading-relaxed font-semibold text-black">
            {REPORT_REASONS.find((reason) => reason.value === row.title)?.label}
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
            {formatDateToDot(row.reportDate)}
          </div>
        </div>
        {row.resolvedDate && (
          <div className='flex flex-col items-start justify-start gap-2.5 self-stretch'>
            <div className="justify-start font-['Pretendard'] text-lg leading-relaxed font-semibold text-black">
              조치 날짜
            </div>
            <div className="justify-center self-stretch font-['Pretendard'] text-base leading-snug font-normal text-slate-500">
              {formatDateToDot(row.resolvedDate)}
            </div>
          </div>
        )}
        <div className='flex flex-col items-start justify-start self-stretch'>
          <div className='flex flex-col items-start justify-start gap-2.5 self-stretch'>
            <div className="justify-start font-['Pretendard'] text-lg leading-relaxed font-semibold text-black">
              신고 위치
            </div>
            <div className='inline-flex items-center justify-start gap-12 rounded-lg bg-slate-50 py-2.5 pr-3 pl-4 outline outline-offset-[-1px] outline-slate-200'>
              <div className="justify-center font-['Pretendard'] text-base leading-snug font-normal text-slate-500">
                {REPORT_LOC.find((loc) => loc.value === row.location)?.label}
              </div>
              <div
                data-corner='Rounded'
                data-size='Small'
                data-state='Default'
                data-style='Line'
                data-text-parallel='false'
                data-type='Text'
                className='flex h-11 items-center justify-center gap-2.5 rounded-3xl bg-blue-400/10 px-5 py-3 outline outline-offset-[-1px] outline-blue-400'
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
            {row.reporter}
          </div>
        </div>
        <div className='flex flex-col items-start justify-start gap-6 self-stretch'>
          <div className='flex flex-col items-start justify-start gap-2.5 self-stretch'>
            <div className="justify-start font-['Pretendard'] text-lg leading-relaxed font-semibold text-black">
              신고사유
            </div>
            <div className="justify-center self-stretch font-['Pretendard'] text-base leading-snug font-normal text-slate-500">
              {REPORT_REASONS.find((reason) => reason.value === row.title)?.label}
            </div>
            {/* <div className="justify-center self-stretch font-['Pretendard'] text-base leading-snug font-normal text-slate-500">
              신고시 선택한 항목
            </div> */}
          </div>
          {row.body && (
            <div className='flex flex-col items-start justify-start gap-4 self-stretch overflow-hidden rounded-xl bg-gray-100 px-5 py-3'>
              <div className="justify-start self-stretch font-['Pretendard'] text-base leading-snug font-normal text-slate-500">
                {row.body || ''}
              </div>
            </div>
          )}
        </div>
        {row.resolveBody && (
          <div className='flex flex-col items-start justify-start gap-4 self-stretch'>
            <div className="justify-start font-['Pretendard'] text-lg leading-relaxed font-semibold text-black">
              조치 내용
            </div>
            <div className='flex flex-col items-start justify-start gap-4 self-stretch overflow-hidden rounded-xl bg-gray-100 px-5 py-3'>
              <div className="justify-start self-stretch font-['Pretendard'] text-base leading-snug font-normal text-slate-500">
                {row.resolveBody || ''}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='flex w-full items-center justify-center gap-3'>
        {tabKey === 'required' && (
          <SmallBtn
            title={'조치완료'}
            onClick={() => setShowResolvConfirmAlert(true)}
            className='bg-red'
          />
        )}

        <SmallBtn
          title={'삭제하기'}
          onClick={() => setShowDeleteConfirmAlert(true)}
          className='!bg-noti'
        />
      </div>

      {modalType == 'ClubQuestionReport' && (
        <QnaModal
          visible={modalType == 'ClubQuestionReport'}
          onClose={() => setModalType(null)}
        />
      )}
      {modalType == 'ClubReport' && (
        <ClubModal
          visible={modalType == 'ClubReport'}
          onClose={() => setModalType(null)}
        />
      )}
      {modalType == 'ClubReviewReport' && (
        <ClubReviewModal
          visible={modalType == 'ClubReviewReport'}
          onClose={() => setModalType(null)}
        />
      )}
      {modalType == 'ClubActivityReport' && (
        <PostModal
          visible={modalType == 'ClubActivityReport'}
          onClose={() => setModalType(null)}
        />
      )}
      {modalType == 'RecruitmentReport' && (
        <RecruitmentModal
          visible={modalType == 'RecruitmentReport'}
          onClose={() => setModalType(null)}
        />
      )}

      <ResolveConfirmModal
        visible={!!showResolveConfirmAlert}
        onConfirm={(body) =>
          resolveMutate({
            reportId: row.id,
            resolveBody: body,
          })
        }
        onClose={() => setShowResolvConfirmAlert(false)}
      />
      {showDeleteConfirmAlert && (
        <AlertWithMessage
          text='삭제하기'
          description='해당 신고 내역을 삭제할까요?'
          leftBtnText='아니오'
          rightBtnText='예'
          onLeftBtnClick={() => setShowDeleteConfirmAlert(false)}
          onRightBtnClick={() =>
            deleteMutate({
              reportId: row.id,
              deleteBody: 'test',
            })
          }
        />
      )}
    </div>
  );
};

export default CommonModal;
