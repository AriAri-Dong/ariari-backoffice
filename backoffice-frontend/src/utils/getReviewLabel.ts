import type {
  InterviewRatioType,
  InterviewType,
  ProcedureType,
  TagIconType,
} from '../types/report';

import employment from '../assets/icons/reviewBadge/employment.svg';
import experience from '../assets/icons/reviewBadge/experience.svg';
import health from '../assets/icons/reviewBadge/health.svg';
import interest from '../assets/icons/reviewBadge/interest.svg';
import relationship from '../assets/icons/reviewBadge/relationship.svg';
import selfDevelopment from '../assets/icons/reviewBadge/selfDevelopment.svg';
import skill from '../assets/icons/reviewBadge/skill.svg';

export const getProcedureTypeLabel = (procedureType?: ProcedureType) => {
  switch (procedureType) {
    case 'DOCUMENT':
      return '서류';
    case 'INTERVIEW':
      return '서류 · 면접';
    default:
      return '';
  }
};

export const getInterviewRatioLabel = (ratioType?: InterviewRatioType) => {
  switch (ratioType) {
    case 'MANY_VS_MANY':
      return '그룹면접';
    case 'ONE_VS_MANY':
      return '다대일면접';
    case 'ONE_VS_ONE':
      return '개인면접';
    default:
      return '';
  }
};

export const getInterviewTypeLabel = (interviewType?: InterviewType) => {
  switch (interviewType) {
    case 'ONLINE':
      return '온라인';
    case 'OFFLINE':
      return '오프라인';
    case 'CALL':
      return '전화';
    default:
      return '';
  }
};

export const tagMap: Record<TagIconType, string> = {
  CAREER_PREPARATION: employment,
  NETWORKING: relationship,
  INTEREST_EXPLORATION: interest,
  SELF_DEVELOPMENT: selfDevelopment,
  ACADEMIC_IMPROVEMENT: skill,
  HEALTH_ENHANCEMENT: health,
  DIVERSE_EXPERIENCE: experience,
};
