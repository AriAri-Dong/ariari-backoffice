export const CRUD_TABLE = [
  { label: '합격 후기', value: 'pass_review' },
  { label: '합격 후기 메모', value: 'pass_review_note' },
  { label: '동아리 리뷰', value: 'club_review' },
  { label: '모집 공고', value: 'recruitment' },
  { label: '지원서 양식', value: 'apply_form' },
  { label: '태그', value: 'tag' },
  { label: '이미지', value: 'image' },
  { label: '모집 공고 노트', value: 'recruitment_note' },
  { label: '회원', value: 'member' },
  { label: '학교', value: 'school' },
  { label: '지원', value: 'apply' },
  { label: '동아리 FAQ', value: 'club_faq' },
  { label: '동아리 활동 댓글 좋아요', value: 'club_activity_comment_like' },
  { label: '동아리 활동 좋아요', value: 'club_activity_like' },
  { label: '동아리 답변', value: 'club_answer' },
  { label: '동아리 리뷰 태그', value: 'club_review_tag' },
  { label: '지원서 답변', value: 'apply_answer' },
  { label: '동아리 질문', value: 'club_question' },
  { label: '시스템 공지', value: 'system_notice' },
  { label: '지원서 질문', value: 'apply_question' },
  { label: '동아리 공지', value: 'club_notice' },
  { label: '이용약관', value: 'system_term' },
  { label: '동아리', value: 'club' },
  { label: '임시 지원서', value: 'apply_temp' },
  { label: '신고', value: 'report' },
  { label: '동아리 회원', value: 'club_member' },
  { label: '차단', value: 'block' },
  { label: '시스템 FAQ', value: 'system_faq' },
  { label: '동아리 알림', value: 'club_alarm' },
  { label: '동아리 활동 댓글', value: 'club_activity_comment' },
  { label: '재정 기록', value: 'financial_record' },
  { label: '회원 권한', value: 'member_authorities' },
  { label: '동아리 행사', value: 'club_event' },
  { label: '동아리 즐겨찾기', value: 'club_bookmark' },
  { label: '임시 답변', value: 'apply_answer_temp' },
  { label: '출석', value: 'attendance' },
  { label: '회원 알림', value: 'member_alarm' },
  { label: '포인트 내역', value: 'point_history' },
  { label: '동아리 활동', value: 'club_activity' },
];

export const CRUD_TABLE_COLUMN_MAP: Record<string, { label: string; value: string }[]> = {
  '': [],
  pass_review: [
    {
      label: 'Interview Mood',
      value: 'interview_mood',
    },
    {
      label: '동아리 ID',
      value: 'club_id',
    },
    {
      label: '회원 ID',
      value: 'member_id',
    },
    {
      label: 'Pass Review ID',
      value: 'pass_review_id',
    },
    {
      label: '제목',
      value: 'title',
    },
    {
      label: 'Interview Ratio 유형',
      value: 'interview_ratio_type',
    },
    {
      label: 'Interview 유형',
      value: 'interview_type',
    },
    {
      label: 'Procedure 유형',
      value: 'procedure_type',
    },
  ],
  pass_review_note: [
    {
      label: 'Pass Review ID',
      value: 'pass_review_id',
    },
    {
      label: 'Pass Review Note ID',
      value: 'pass_review_note_id',
    },
    {
      label: '제목',
      value: 'title',
    },
    {
      label: '본문',
      value: 'body',
    },
    {
      label: '메모 유형',
      value: 'note_type',
    },
  ],
  club_review: [
    {
      label: '동아리 ID',
      value: 'club_id',
    },
    {
      label: 'Club Review ID',
      value: 'club_review_id',
    },
    {
      label: '회원 ID',
      value: 'member_id',
    },
    {
      label: '제목',
      value: 'title',
    },
    {
      label: '본문',
      value: 'body',
    },
  ],
  recruitment: [
    {
      label: '모집인원',
      value: 'limits',
    },
    {
      label: '지원서 양식 ID',
      value: 'apply_form_id',
    },
    {
      label: '동아리 ID',
      value: 'club_id',
    },
    {
      label: 'End Date 시간',
      value: 'end_date_time',
    },
    {
      label: '모집 ID',
      value: 'recruitment_id',
    },
    {
      label: 'Start Date 시간',
      value: 'start_date_time',
    },
    {
      label: '제목',
      value: 'title',
    },
    {
      label: '본문',
      value: 'body',
    },
    {
      label: 'Procedure 유형',
      value: 'procedure_type',
    },
  ],
  apply_form: [
    {
      label: '지원서 양식 ID',
      value: 'apply_form_id',
    },
    {
      label: '동아리 ID',
      value: 'club_id',
    },
  ],
  tag: [
    {
      label: '태그 ID',
      value: 'tag_id',
    },
    {
      label: '본문',
      value: 'body',
    },
  ],
  image: [
    {
      label: 'Club Activity ID',
      value: 'club_activity_id',
    },
    {
      label: 'Club Notice ID',
      value: 'club_notice_id',
    },
    {
      label: '이미지 ID',
      value: 'image_id',
    },
    {
      label: '모집 ID',
      value: 'recruitment_id',
    },
    {
      label: 'System Notice ID',
      value: 'system_notice_id',
    },
    {
      label: 'Dtype',
      value: 'dtype',
    },
    {
      label: '이미지 Uri',
      value: 'image_uri',
    },
  ],
  recruitment_note: [
    {
      label: '모집 ID',
      value: 'recruitment_id',
    },
    {
      label: 'Recruitment Note ID',
      value: 'recruitment_note_id',
    },
    {
      label: '질문',
      value: 'question',
    },
    {
      label: '답변',
      value: 'answer',
    },
  ],
  member: [
    {
      label: 'Super Admin 여부',
      value: 'is_super_admin',
    },
    {
      label: 'Kakao ID',
      value: 'kakao_id',
    },
    {
      label: 'Last Login Date 시간',
      value: 'last_login_date_time',
    },
    {
      label: '회원 ID',
      value: 'member_id',
    },
    {
      label: '학교 ID',
      value: 'school_id',
    },
    {
      label: '닉네임',
      value: 'nick_name',
    },
    {
      label: 'Profile 유형',
      value: 'profile_type',
    },
  ],
  school: [
    {
      label: '학교 ID',
      value: 'school_id',
    },
    {
      label: '이름',
      value: 'name',
    },
    {
      label: '이메일',
      value: 'email',
    },
  ],
  apply: [
    {
      label: '지원 ID',
      value: 'apply_id',
    },
    {
      label: '회원 ID',
      value: 'member_id',
    },
    {
      label: '모집 ID',
      value: 'recruitment_id',
    },
    {
      label: '이름',
      value: 'name',
    },
    {
      label: '파일 Uri',
      value: 'file_uri',
    },
    {
      label: 'Portfolio URL',
      value: 'portfolio_url',
    },
    {
      label: '지원 상태 유형',
      value: 'apply_status_type',
    },
  ],
  club_faq: [
    {
      label: 'Club Faq ID',
      value: 'club_faq_id',
    },
    {
      label: '동아리 ID',
      value: 'club_id',
    },
    {
      label: '제목',
      value: 'title',
    },
    {
      label: '본문',
      value: 'body',
    },
    {
      label: '동아리 FAQ Classification',
      value: 'club_faq_classification',
    },
    {
      label: '동아리 FAQ Color 유형',
      value: 'club_faq_color_type',
    },
  ],
  club_activity_comment_like: [
    {
      label: 'Club Activity Comment ID',
      value: 'club_activity_comment_id',
    },
    {
      label: 'Club Activity Comment Like ID',
      value: 'club_activity_comment_like_id',
    },
    {
      label: '회원 ID',
      value: 'member_id',
    },
  ],
  club_activity_like: [
    {
      label: 'Club Activity ID',
      value: 'club_activity_id',
    },
    {
      label: 'Club Activity Like ID',
      value: 'club_activity_like_id',
    },
    {
      label: '회원 ID',
      value: 'member_id',
    },
  ],
  club_answer: [
    {
      label: 'Club Answer ID',
      value: 'club_answer_id',
    },
    {
      label: 'Club Question ID',
      value: 'club_question_id',
    },
    {
      label: '본문',
      value: 'body',
    },
  ],
  club_review_tag: [
    {
      label: 'Club Review ID',
      value: 'club_review_id',
    },
    {
      label: 'Club Review Tag ID',
      value: 'club_review_tag_id',
    },
    {
      label: '태그 ID',
      value: 'tag_id',
    },
  ],
  apply_answer: [
    {
      label: 'Apply Answer ID',
      value: 'apply_answer_id',
    },
    {
      label: '지원 ID',
      value: 'apply_id',
    },
    {
      label: 'Apply Question ID',
      value: 'apply_question_id',
    },
    {
      label: '본문',
      value: 'body',
    },
  ],
  club_question: [
    {
      label: '동아리 ID',
      value: 'club_id',
    },
    {
      label: 'Club Question ID',
      value: 'club_question_id',
    },
    {
      label: '회원 ID',
      value: 'member_id',
    },
    {
      label: '제목',
      value: 'title',
    },
    {
      label: '본문',
      value: 'body',
    },
  ],
  system_notice: [
    {
      label: 'System Notice ID',
      value: 'system_notice_id',
    },
    {
      label: '제목',
      value: 'title',
    },
    {
      label: '본문',
      value: 'body',
    },
  ],
  apply_question: [
    {
      label: 'Apply Form ID',
      value: 'apply_form_id',
    },
    {
      label: 'Apply Question ID',
      value: 'apply_question_id',
    },

    {
      label: '본문',
      value: 'body',
    },
  ],
  club_notice: [
    {
      label: 'Fixed 여부',
      value: 'is_fixed',
    },
    {
      label: '동아리 ID',
      value: 'club_id',
    },
    {
      label: 'Club Notice ID',
      value: 'club_notice_id',
    },

    {
      label: '회원 ID',
      value: 'member_id',
    },

    {
      label: '제목',
      value: 'title',
    },
    {
      label: '본문',
      value: 'body',
    },
  ],
  system_term: [
    {
      label: 'System Term ID',
      value: 'system_term_id',
    },

    {
      label: '본문',
      value: 'body',
    },
    {
      label: '약관 유형',
      value: 'term_type',
    },
  ],
  club: [
    {
      label: '동아리 ID',
      value: 'club_id',
    },

    {
      label: '학교 ID',
      value: 'school_id',
    },

    {
      label: 'Views',
      value: 'views',
    },
    {
      label: '이름',
      value: 'name',
    },
    {
      label: '본문',
      value: 'body',
    },
    {
      label: 'Banner Uri',
      value: 'banner_uri',
    },
    {
      label: 'Profile Uri',
      value: 'profile_uri',
    },
    {
      label: '동아리 카테고리 유형',
      value: 'club_category_type',
    },
    {
      label: '동아리 지역 유형',
      value: 'club_region_type',
    },
    {
      label: 'Participant 유형',
      value: 'participant_type',
    },
  ],
  apply_temp: [
    {
      label: 'Apply Temp ID',
      value: 'apply_temp_id',
    },

    {
      label: '회원 ID',
      value: 'member_id',
    },
    {
      label: '모집 ID',
      value: 'recruitment_id',
    },

    {
      label: '이름',
      value: 'name',
    },
    {
      label: '파일 Uri',
      value: 'file_uri',
    },
    {
      label: 'Portfolio URL',
      value: 'portfolio_url',
    },
  ],
  report: [
    {
      label: '신고 ID',
      value: 'report_id',
    },
    {
      label: 'Reported Apply ID',
      value: 'reported_apply_id',
    },
    {
      label: 'Reported Club Activity Comment ID',
      value: 'reported_club_activity_comment_id',
    },
    {
      label: 'Reported Club Activity ID',
      value: 'reported_club_activity_id',
    },
    {
      label: 'Reported Club Question ID',
      value: 'reported_club_question_id',
    },
    {
      label: 'Reported Club Review ID',
      value: 'reported_club_review_id',
    },
    {
      label: 'Reported Clud ID',
      value: 'reported_clud_id',
    },
    {
      label: 'Reported Member ID',
      value: 'reported_member_id',
    },
    {
      label: 'Reported Pass Review ID',
      value: 'reported_pass_review_id',
    },
    {
      label: 'Reported Recruitment ID',
      value: 'reported_recruitment_id',
    },
    {
      label: 'Reporter ID',
      value: 'reporter_id',
    },
    {
      label: 'Resolved 날짜',
      value: 'resolved_date',
    },

    {
      label: 'Dtype',
      value: 'dtype',
    },
    {
      label: '본문',
      value: 'body',
    },
    {
      label: 'Resolve 본문',
      value: 'resolve_body',
    },
    {
      label: 'Location URL',
      value: 'location_url',
    },
    {
      label: 'Location 유형',
      value: 'location_type',
    },
    {
      label: '신고 상태 유형',
      value: 'report_status_type',
    },
    {
      label: '신고 유형',
      value: 'report_type',
    },
  ],
  club_member: [
    {
      label: '동아리 ID',
      value: 'club_id',
    },
    {
      label: 'Club Member ID',
      value: 'club_member_id',
    },

    {
      label: '회원 ID',
      value: 'member_id',
    },

    {
      label: '이름',
      value: 'name',
    },
    {
      label: '동아리 회원 역할 유형',
      value: 'club_member_role_type',
    },
    {
      label: '동아리 회원 상태 유형',
      value: 'club_member_status_type',
    },
  ],
  block: [
    {
      label: '차단 ID',
      value: 'block_id',
    },
    {
      label: 'Blocked Member ID',
      value: 'blocked_member_id',
    },
    {
      label: 'Blocking Member ID',
      value: 'blocking_member_id',
    },
  ],
  system_faq: [
    {
      label: 'System Faq ID',
      value: 'system_faq_id',
    },

    {
      label: '제목',
      value: 'title',
    },
    {
      label: '본문',
      value: 'body',
    },
    {
      label: 'System FAQ 상태 유형',
      value: 'system_faq_status_type',
    },
  ],
  club_alarm: [
    {
      label: 'Checked 여부',
      value: 'is_checked',
    },
    {
      label: 'Club Alarm ID',
      value: 'club_alarm_id',
    },
    {
      label: '동아리 ID',
      value: 'club_id',
    },

    {
      label: '제목',
      value: 'title',
    },
    {
      label: 'Uri',
      value: 'uri',
    },
  ],
  club_activity_comment: [
    {
      label: 'Club Activity Comment ID',
      value: 'club_activity_comment_id',
    },
    {
      label: 'Club Activity ID',
      value: 'club_activity_id',
    },

    {
      label: '회원 ID',
      value: 'member_id',
    },
    {
      label: 'Parent Comment ID',
      value: 'parent_comment_id',
    },

    {
      label: '본문',
      value: 'body',
    },
  ],
  financial_record: [
    {
      label: '금액',
      value: 'amount',
    },
    {
      label: '동아리 ID',
      value: 'club_id',
    },

    {
      label: 'Financial Record ID',
      value: 'financial_record_id',
    },
    {
      label: 'Record Date 시간',
      value: 'record_date_time',
    },

    {
      label: '본문',
      value: 'body',
    },
  ],
  member_authorities: [
    {
      label: 'Member Member ID',
      value: 'member_member_id',
    },
    {
      label: '권한',
      value: 'authorities',
    },
  ],
  club_event: [
    {
      label: 'Club Event ID',
      value: 'club_event_id',
    },
    {
      label: '동아리 ID',
      value: 'club_id',
    },

    {
      label: 'Event Date 시간',
      value: 'event_date_time',
    },

    {
      label: '제목',
      value: 'title',
    },
    {
      label: 'Location',
      value: 'location',
    },
    {
      label: '본문',
      value: 'body',
    },
  ],
  club_bookmark: [
    {
      label: 'Club Bookmark ID',
      value: 'club_bookmark_id',
    },
    {
      label: '동아리 ID',
      value: 'club_id',
    },
    {
      label: '회원 ID',
      value: 'member_id',
    },
  ],
  apply_answer_temp: [
    {
      label: 'Apply Answer Temp ID',
      value: 'apply_answer_temp_id',
    },
    {
      label: 'Apply Question ID',
      value: 'apply_question_id',
    },
    {
      label: 'Apply Temp ID',
      value: 'apply_temp_id',
    },

    {
      label: '본문',
      value: 'body',
    },
  ],
  attendance: [
    {
      label: '출석 ID',
      value: 'attendance_id',
    },
    {
      label: 'Club Event ID',
      value: 'club_event_id',
    },

    {
      label: '회원 ID',
      value: 'member_id',
    },
  ],
  member_alarm: [
    {
      label: 'Checked 여부',
      value: 'is_checked',
    },

    {
      label: 'Member Alarm ID',
      value: 'member_alarm_id',
    },
    {
      label: '회원 ID',
      value: 'member_id',
    },

    {
      label: '제목',
      value: 'title',
    },
    {
      label: 'Uri',
      value: 'uri',
    },
  ],
  point_history: [
    {
      label: '금액',
      value: 'amount',
    },

    {
      label: '회원 ID',
      value: 'member_id',
    },
    {
      label: 'Point History ID',
      value: 'point_history_id',
    },

    {
      label: '본문',
      value: 'body',
    },
  ],
  club_activity: [
    {
      label: 'Club Activity ID',
      value: 'club_activity_id',
    },
    {
      label: '동아리 ID',
      value: 'club_id',
    },

    {
      label: '회원 ID',
      value: 'member_id',
    },

    {
      label: '본문',
      value: 'body',
    },
    {
      label: 'Access 유형',
      value: 'access_type',
    },
  ],
};
