import { useEffect, useState } from 'react';
import closeIcon from '../../assets/icons/close.svg';
import PlusIcon from '../../assets/icons/plus_round.svg';
import deleteIcon from '../../assets/icons/close_round.svg';
import SmallBtn from '../button/basicBtn/smallBtn';
import RadioBtn from '../button/radioBtn';
import Calendar from '../calendar';
import CustomInput from '../input/customInput';
import CustomTextArea from '../textArea/customTextArea';
import Alert from '../alert/alert';
import { updateNotice, createNotice } from '../../apis/operate/noticeApi';
import type { UpdateNoticePayload, CreateNoticePayload } from '../../types/api/notice';
import { sevenDaysAfter, today, formatDateToHyphen } from '../../utils/formatDate';

export type AnnouncementModalData = {
  title: string;
  popupEnabled: boolean;
  popupOption: boolean;
  dateRange: [Date | null, Date | null];
  description: string;
  images: (string | File)[];
  postStatus: 'POSTED' | 'UNPOSTED';
};

type AnnouncementModalProps = {
  visible: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  initialData?: AnnouncementModalData;
  noticeId?: string;
  onSubmitSuccess?: () => void;
};

// 중복 제거 유틸: 같은 URL 또는 동일 파일(이름/크기/수정시간 기준)을 하나로
function dedupeImages(arr: (string | File)[]) {
  const seenUrl = new Set<string>();
  const seenFile = new Set<string>();
  const out: (string | File)[] = [];
  for (const x of arr) {
    if (typeof x === 'string') {
      if (seenUrl.has(x)) continue;
      seenUrl.add(x);
      out.push(x);
    } else {
      const key = [x.name, x.size, (x as any).lastModified ?? 0].join('|');
      if (seenFile.has(key)) continue;
      seenFile.add(key);
      out.push(x);
    }
  }
  return out;
}

const AnnouncementModal = ({
  visible,
  onClose,
  mode,
  initialData,
  noticeId,
  onSubmitSuccess,
}: AnnouncementModalProps) => {
  if (!visible) return null;

  const isEditMode = mode === 'edit';

  const [title, setTitle] = useState(initialData?.title ?? '');
  const [popupEnabled, setPopupEnabled] = useState(initialData?.popupEnabled ?? false);
  const [popupOption, setPopupOption] = useState(initialData?.popupOption ?? false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(
    initialData?.dateRange ?? [today, sevenDaysAfter],
  );
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [images, setImages] = useState<(string | File)[]>(initialData?.images ?? []);
  const [postStatus, setPostStatus] = useState<'POSTED' | 'UNPOSTED'>(
    initialData?.postStatus ?? 'POSTED',
  );

  const [originalUrls, setOriginalUrls] = useState<string[]>([]);

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // 모달이 열릴 때마다 props로 폼을 완전히 덮어써서 이전 세션 state 누적 방지
  useEffect(() => {
    if (!visible) return;
    const init = initialData ?? {
      title: '',
      popupEnabled: false,
      popupOption: false,
      dateRange: [today, sevenDaysAfter] as [Date | null, Date | null],
      description: '',
      images: [],
      postStatus: 'POSTED' as const,
    };

    setTitle(init.title ?? '');
    setPopupEnabled(init.popupEnabled ?? false);
    setPopupOption(init.popupOption ?? false);
    setDateRange(init.dateRange ?? [today, sevenDaysAfter]);
    setDescription(init.description ?? '');
    setImages(dedupeImages(init.images ?? []));
    setPostStatus(init.postStatus ?? 'POSTED');

    setOriginalUrls((init.images ?? []).filter((x): x is string => typeof x === 'string'));
  }, [visible, initialData]);

  // 이미지 추가
  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file.name));
    const next = dedupeImages([...images, ...validFiles]);
    if (next.length > 10) {
      alert('최대 10장까지만 업로드 가능합니다.');
      // 초과하지 않는 선까지만 추가
      const canAdd = Math.max(0, 10 - images.length);
      const sliced = validFiles.slice(0, canAdd);
      setImages(dedupeImages([...images, ...sliced]));
    } else {
      setImages(next);
    }
    // 같은 파일 재선택 가능하게 input 초기화
    e.currentTarget.value = '';
  };

  // 이미지 삭제
  const handleImageRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 유효성 검사
  const validate = () => {
    if (!title.trim()) {
      setAlertMessage('공지사항 제목을 입력해주세요.');
      return false;
    }
    if (popupEnabled && (!dateRange[0] || !dateRange[1])) {
      setAlertMessage('팝업 기간을 설정해주세요.');
      return false;
    }
    if (!description.trim()) {
      setAlertMessage('공지사항 상세를 입력해주세요.');
      return false;
    }
    return true;
  };

  // 제출 처리
  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);

    try {
      // 업로드할 대상: 현재 images 중 File만
      const filesToUpload = images.filter((x): x is File => x instanceof File);

      // 남아있는 URL: 현재 images 중 string
      const keptUrlSet = new Set(images.filter((x): x is string => typeof x === 'string'));

      // 제거할 URL: 초기 URL 중 현재 배열에 없는 것
      const removedUrls = originalUrls.filter((url) => !keptUrlSet.has(url));

      if (isEditMode && noticeId) {
        const payload: UpdateNoticePayload = {
          title,
          body: description,
          popupEnabled,
          popupStartDate: popupEnabled
            ? formatDateToHyphen(dateRange[0])
            : formatDateToHyphen(today),
          popupEndDate: popupEnabled
            ? formatDateToHyphen(dateRange[1])
            : formatDateToHyphen(sevenDaysAfter),
          status: postStatus,
          files: filesToUpload,
          removeImages: removedUrls,
        };
        await updateNotice(noticeId, payload);
      } else {
        const payload: CreateNoticePayload = {
          title,
          body: description,
          popupEnabled,
          popupStartDate: popupEnabled
            ? formatDateToHyphen(dateRange[0])
            : formatDateToHyphen(today),
          popupEndDate: popupEnabled
            ? formatDateToHyphen(dateRange[1])
            : formatDateToHyphen(sevenDaysAfter),
          status: postStatus,
          files: filesToUpload, // 생성은 새 파일만 업로드
        };
        await createNotice(payload);
      }

      onSubmitSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
      setAlertMessage('저장 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!alertMessage) return;
    const timeout = setTimeout(() => setAlertMessage(null), 1000);
    return () => clearTimeout(timeout);
  }, [alertMessage]);

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
          <h1 className='text-text1 text-h1_contents_title'>
            {isEditMode ? '공지사항 수정하기' : '공지사항 작성하기'}
          </h1>
          <img
            src={closeIcon}
            alt='닫기'
            className='h-6 w-6 cursor-pointer'
            onClick={onClose}
          />
        </div>

        {/* 본문 */}
        <div className='flex-grow overflow-y-auto pr-1'>
          {/* 제목 */}
          <div className='flex flex-col gap-[18px]'>
            <h3 className='text-text1 text-h3'>
              공지사항 제목 <span className='text-h3 text-noti'>*</span>
            </h3>
            <CustomInput
              value={title}
              placeholder='공지사항 제목을 입력하세요.'
              onChange={(e) => setTitle(e.target.value)}
            />
            <RadioBtn
              label='해당 공지사항을 팝업으로 등록하기'
              isChecked={popupEnabled}
              onClick={() => setPopupEnabled((prev) => !prev)}
            />
          </div>

          {/* 팝업 설정 */}
          {popupEnabled && (
            <div className='mt-4 flex flex-col gap-[18px]'>
              <h3 className='text-text1 text-h3'>팝업 설정 *</h3>
              <div className='flex items-center gap-4'>
                <RadioBtn
                  label='하루 동안 보지 않기 표시'
                  isChecked={popupOption}
                  onClick={() => setPopupOption((prev) => !prev)}
                />
                <Calendar
                  startDate={dateRange[0]}
                  endDate={dateRange[1]}
                  onChange={(range) => setDateRange(range)}
                />
              </div>
            </div>
          )}

          {/* 이미지 첨부 */}
          <div className='mt-6 flex flex-col gap-2'>
            <h3 className='text-text1 text-h3'>이미지 첨부</h3>
            <p className='text-subtext2 text-body_r'>
              이미지는 최대 10장까지 첨부할 수 있어요. (JPEG / PNG / GIF)
            </p>
            <div className='flex flex-wrap gap-3'>
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className='relative h-[120px] w-[120px] overflow-hidden rounded-lg'
                >
                  <img
                    src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                    alt={`첨부 이미지 ${idx + 1}`}
                    className='h-full w-full rounded-lg object-cover'
                  />
                  <img
                    src={deleteIcon}
                    alt='삭제'
                    className='absolute top-1 right-1 h-5 w-5 cursor-pointer'
                    onClick={() => handleImageRemove(idx)}
                  />
                </div>
              ))}
              {images.length < 10 && (
                <label className='flex h-[120px] w-[120px] cursor-pointer items-center justify-center'>
                  <input
                    type='file'
                    accept='.jpg,.jpeg,.png,.gif'
                    multiple
                    onChange={handleImageAdd}
                    className='hidden'
                  />
                  <img
                    src={PlusIcon}
                    alt='추가'
                    className='h-[60px] w-[60px]'
                  />
                </label>
              )}
            </div>
          </div>

          {/* 상세 내용 */}
          <div className='gap_[18px] mt-6 flex flex-col'>
            <h3 className='text-text1 text-h3'>
              공지사항 상세 <span className='text-h3 text-noti'>*</span>
            </h3>
            <CustomTextArea
              value={description}
              placeholder='공지사항 상세를 입력하세요.'
              onChange={(e) => setDescription(e.target.value)}
              maxLength={300}
            />
          </div>
        </div>

        {/* 하단 */}
        <div className='flex justify-between pt-6 pb-1'>
          <div className='flex gap-5'>
            <RadioBtn
              label='게시'
              isChecked={postStatus === 'POSTED'}
              onClick={() => setPostStatus('POSTED')}
            />
            <RadioBtn
              label='미게시'
              isChecked={postStatus === 'UNPOSTED'}
              onClick={() => setPostStatus('UNPOSTED')}
            />
          </div>
          <div className='flex items-center gap-8'>
            <p className='text-unselected text-h4'>{description.length}/300</p>
            <SmallBtn
              title={submitting ? '저장 중...' : isEditMode ? '수정하기' : '등록하기'}
              onClick={submitting ? () => {} : handleSubmit}
            />
          </div>
        </div>
      </div>

      {alertMessage && <Alert text={alertMessage} />}
    </div>
  );
};

export default AnnouncementModal;
