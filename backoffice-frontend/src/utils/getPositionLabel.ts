import type { rowType } from '../components/modal/report/commonModal';

export const rowTypeToKorean = (type: rowType): string => {
  const map: Record<string, string> = {
    ACCEPTANCE_REVIEW: '합격 후기',
    QNA: '질문과 답변',
    CLUB: '동아리 소개',
    CLUB_REVIEW: '동아리 후기',
    POST: '게시글',
    RECRUITMENT: '모집 공고',
  };

  return map[type];
};
