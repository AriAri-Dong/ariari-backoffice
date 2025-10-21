import type {
  ClubActivityDetail,
  ClubDetail,
  ClubReviewDetail,
  PassReviewDetail,
  QnaDetail,
  RecruitmentData,
} from '../types/report';
export const ACTIVITY_DATA: PassReviewDetail = {
  id: '1',
  creatorId: 'angryUser99',
  procedureType: 'INTERVIEW',
  interviewType: 'OFFLINE',
  interviewRatioType: 'ONE_VS_MANY',
  interviewMood: 1,
  documentNotes: [
    {
      title: '자기소개서 작성 팁',
      body: '솔직히 형식만 중요한 것 같아요. 뭘 써도 결국 인맥 있는 사람만 붙는 느낌이었습니다.',
    },
  ],
  interviewNotes: [
    {
      title: '면접 분위기',
      body: '면접관들이 계속 웃으면서 서로 얘기하더니 제 말은 거의 안 들었어요. 기분 나쁘더군요.',
    },
    {
      title: '면접 질문',
      body: '제 전공이랑 전혀 상관없는 질문만 던졌어요. 준비한 게 무색했습니다.',
    },
  ],
  createdDateTime: '2025-10-04T15:30:00Z',
};

export const QNA_DATA: QnaDetail = {
  id: '0042',
  title: '운영진은 대체 뭐 하는 건가요?',
  question:
    '요즘 게시판에 이상한 글이 너무 많아요. 신고해도 처리가 안 되는데 운영진은 일 안 하나요?',
  answer: '운영진이 제 역할을 안 한다고 비난하는 표현이 포함되어 신고가 접수되었습니다.',
  createdDate: '2025.10.04',
  user: '화난참치',
};

export const CLUB_DATA: ClubDetail = {
  id: '0001',
  affiliation: '연합',
  field: '문화예술',
  region: '서울',
  manager: '노랑피크민',
};

export const CLUB_REVIEW_DATA: ClubReviewDetail = {
  id: '001',
  title: '솔직히 별로였어요',
  body: `솔직히 말해서 기대 이하였습니다.
분위기도 어수선하고 몇몇 사람들은 자기 자랑만 늘어놓았어요.
프로젝트 진행도 엉성해서 시간 낭비 같았습니다.
운영진이 관리 좀 제대로 했으면 좋겠네요.`,
  nickname: '짜증난토끼',
  creatorId: 'user042',
  createdDateTime: '2025-10-04T14:00:00Z',
  tagDataList: [
    {
      id: 't1',
      body: '취업준비에 도움이 돼요',
      icon: 'CAREER_PREPARATION',
      rate: 1.5,
    },
    {
      id: 't2',
      body: '인간관계를 넓힐 수 있어요',
      icon: 'NETWORKING',
      rate: 1.0,
    },
    {
      id: 't3',
      body: '전공 실력이나 성적을 높일 수 있어요',
      icon: 'ACADEMIC_IMPROVEMENT',
      rate: 2.0,
    },
    {
      id: 't4',
      body: '다양한 경험을 할 수 있어요',
      icon: 'DIVERSE_EXPERIENCE',
      rate: 2.5,
    },
  ],
};

export const ACTIVITY_REVIEW_DATA: ClubActivityDetail = {
  clubActivityId: 'act_001',
  clubId: 'club_123',
  clubMember: {
    id: 'mem_001',
    name: '도토리맛라떼',
    profileType: 'ARIARI_RABBIT',
    clubMemberRoleType: 'ADMIN',
    clubMemberStatusType: 'ACTIVE',
    memberData: {
      school: '세종대학교',
      major: '소프트웨어학과',
    },
  },
  createdDateTime: '2025-10-05T13:30:00Z',
  accessType: 'ALL',
  body: `이번 주엔 팀원들과 함께 프로젝트 기획 회의를 진행했습니다.
새로운 기능 아이디어도 많이 나와서 정말 유익한 시간이었어요! 🧠✨`,
  images: ['https://cdn.jinron.kr/news/photo/202411/1498_2356_1733.png'],
  likes: 24,
  myLike: true,
  isMine: true,
  commentCount: 2,
  comments: [
    {
      clubActivityCommentId: 'cmt_001',
      clubActivityId: 'act_001',
      body: '회의 재밌었어요! 다음엔 피자 시켜요 🍕',
      creatorProfileType: 'ARIARI_SNAKE',
      createdDateTime: '2025-10-05T14:10:00Z',
      likes: 3,
      myLike: false,
      isMine: false,
      blocked: false,
      clubMember: {
        id: 'mem_002',
        name: '노을빛사자',
        profileType: 'ARIARI_SNAKE',
        clubMemberRoleType: 'GENERAL',
        clubMemberStatusType: 'ACTIVE',
        memberData: {
          hobby: '사진 찍기',
        },
      },
      comments: [
        {
          clubActivityCommentId: 'cmt_001_1',
          clubActivityId: 'act_001',
          body: '좋아요! 다음주 회의는 제가 장소 예약할게요 😄',
          creatorProfileType: 'ARIARI_COW',
          createdDateTime: '2025-10-05T14:35:00Z',
          likes: 1,
          myLike: false,
          isMine: true,
          blocked: false,
          clubMember: {
            id: 'mem_001',
            name: '도토리맛라떼',
            profileType: 'ARIARI_RABBIT',
            clubMemberRoleType: 'ADMIN',
            clubMemberStatusType: 'ACTIVE',
            memberData: {},
          },
          comments: [],
        },
      ],
    },
    {
      clubActivityCommentId: 'cmt_002',
      clubActivityId: 'act_001',
      body: '기획서 초안은 언제 공유될까요?',
      creatorProfileType: 'ARIARI_SHEEP',
      createdDateTime: '2025-10-05T15:20:00Z',
      likes: 0,
      myLike: false,
      isMine: false,
      blocked: false,
      clubMember: {
        id: 'mem_003',
        name: '구름방울',
        profileType: 'ARIARI_SHEEP',
        clubMemberRoleType: 'GENERAL',
        clubMemberStatusType: 'ACTIVE',
        memberData: {
          position: '기획팀',
        },
      },
      comments: [],
    },
  ],
};

export const RECRUITMENTDATA: RecruitmentData = {
  id: '1',
  clubId: '10',
  clubName: '아리아리 메이커스',
  title: '2025년도 1학기 신입 부원 모집',
  body: '아리아리 메이커스는 세종대 창의융합 동아리로, 매 학기 새로운 프로젝트를 함께할 열정적인 신입 부원을 모집합니다. 💡\n\n디자인, 개발, 기획 등 다양한 분야의 친구들과 함께 아이디어를 실현시켜봐요!',
  posterUri: '',
  procedureType: 'DOCUMENT',
  limits: 20,
  startDateTime: '2025-02-15T00:00:00',
  endDateTime: '2025-03-10T23:59:59',
  createdDateTime: '2025-02-01T10:30:00',
  recruitmentStatusType: 'OPEN',
  isMyBookmark: false,
  recruitmentNoteDataList: [
    {
      question: '모집 분야가 어떻게 되나요?',
      answer: '기획, 디자인, 프론트엔드, 백엔드 전 분야를 모집하고 있습니다.',
    },
    {
      question: '활동 지역은 어디인가요?',
      answer: '세종대학교 인근 또는 온라인으로 진행됩니다.',
    },
    {
      question: '활동 기간은 얼마나 되나요?',
      answer: '2025년 3월부터 2025년 6월까지 약 4개월간 활동합니다.',
    },
  ],
  clubAffiliationType: 'INTERNAL',
  clubCategoryType: 'STUDY',
  clubRegionType: 'SEOUL_GYEONGGI',
  participantType: 'UNIVERSITY_STUDENT',
};
