export type ProcedureType = 'DOCUMENT' | 'INTERVIEW';
export type InterviewType = 'ONLINE' | 'OFFLINE' | 'CALL';
export type InterviewRatioType = 'ONE_VS_ONE' | 'ONE_VS_MANY' | 'MANY_VS_MANY';

// 질문 답변
export interface PassReviewNoteData {
  title: string;
  body: string;
}

// 합격후기 상세 정보
export interface PassReviewDetail {
  id: string;
  creatorId: string;
  procedureType: ProcedureType;
  interviewType: InterviewType;
  interviewRatioType: InterviewRatioType;
  interviewMood: number;
  documentNotes: PassReviewNoteData[];
  interviewNotes: PassReviewNoteData[];
  createdDateTime: string;
}

// Q&A 상세 데이터 타입
export interface QnaDetail {
  id: string;
  title: string;
  question: string;
  answer: string;
  createdDate: string;
  user: string;
}

// 동아리 또는 단체 정보 타입
export interface ClubDetail {
  id: string;
  affiliation: string; // 소속 (ex. 연합/교내 등)
  field: string; // 분야명
  region: string; // 지역명
  manager: string; // 관리자 닉네임
}

// --------- 활동 후기 -----------

export interface TagData {
  id: string;
  body: string;
  icon: TagIconType;
  rate: number;
}

export type TagIconType =
  | 'CAREER_PREPARATION'
  | 'NETWORKING'
  | 'INTEREST_EXPLORATION'
  | 'SELF_DEVELOPMENT'
  | 'ACADEMIC_IMPROVEMENT'
  | 'HEALTH_ENHANCEMENT'
  | 'DIVERSE_EXPERIENCE';

// 활동후기 상세
export interface ClubReviewDetail {
  id: string;
  title: string;
  body: string;
  nickname: string;
  creatorId: string;
  createdDateTime: string;
  tagDataList: TagData[];
}

export interface ClubActivityImage {
  id: number;
  imageUri: string;
}

export type clubMemberRoleType = 'GENERAL' | 'MANAGER' | 'ADMIN';
export type clubMemberStatusType = 'ACTIVE' | 'INACTIVE' | 'WITHDRAWN';
export type profileType =
  | 'ARIARI_MOUSE'
  | 'ARIARI_COW'
  | 'ARIARI_TIGER'
  | 'ARIARI_RABBIT'
  | 'ARIARI_DRAGON'
  | 'ARIARI_SNAKE'
  | 'ARIARI_HORSE'
  | 'ARIARI_SHEEP'
  | 'ARIARI_MONKEY'
  | 'ARIARI_CHICKEN'
  | 'ARIARI_DOG'
  | 'ARIARI_PIG'
  | null;

// 활동 내역
export interface ClubActivityDetail {
  id?: string;
  clubActivityId: string;
  clubId?: string;
  clubMember: ClubMemberData;
  createdDateTime: string;
  accessType: 'ALL' | 'CLUB_MEMBER';
  body: string;
  images: string[];
  likes: number;
  myLike: boolean;
  isMine: boolean;
  commentCount: number;
  comments: ClubActivityComment[];
}

// 댓글 타입
export interface ClubActivityComment {
  clubActivityCommentId: string;
  clubMember: ClubMemberData;
  clubActivityId: string;
  body: string;
  creatorProfileType: profileType;
  createdDateTime: string;
  likes: number;
  myLike: boolean;
  isMine: boolean;
  blocked: boolean;
  comments: ClubActivityComment[];
}

// 멤버 기본 타입
export interface ClubMemberData {
  id: string;
  name: string;
  profileType: profileType | null;
  clubMemberRoleType: 'ADMIN' | 'MANAGER' | 'GENERAL';
  clubMemberStatusType: string;
  memberData: any;
}

// --------- 모집글 -----------

export type RecruitmentStatusType = 'SCHEDULED' | 'OPEN' | 'CLOSED';

export interface RecruitmentNoteData {
  question: string;
  answer: string;
}

export type ClubAffiliationType = 'EXTERNAL' | 'INTERNAL';
export type ClubFieldType =
  | 'CULTURE'
  | 'VOLUNTEER'
  | 'STUDY'
  | 'STARTUP'
  | 'EMPLOYMENT'
  | 'SPORTS'
  | 'AMITY'
  | 'ETC';
export type ClubRegionType =
  | 'SEOUL_GYEONGGI'
  | 'CHUNGCHEONG'
  | 'GYEONGNAM'
  | 'GYEONGBUK'
  | 'JEONNAM'
  | 'JEONBUK'
  | 'GANGWON'
  | 'JEJU'
  | 'FOREIGN';
export type ParticipantType = 'UNIVERSITY_STUDENT' | 'GRADUATE_STUDENT' | 'OFFICE_WORKER';

export interface SchoolData {
  name: string;
}
export interface RecruitmentData {
  id: string;
  clubId: string; // 동아리 ID
  clubName?: string;
  title: string;
  body: string;
  posterUri: string;
  procedureType: ProcedureType;
  limits: number;
  startDateTime: string;
  endDateTime: string;
  createdDateTime: string;
  // isActivated: boolean;
  recruitmentStatusType: RecruitmentStatusType;
  isMyBookmark: boolean;
  recruitmentNoteDataList: RecruitmentNoteData[];
  clubAffiliationType?: ClubAffiliationType;
  clubCategoryType?: ClubFieldType;
  clubRegionType?: ClubRegionType;
  participantType?: ParticipantType;
}
