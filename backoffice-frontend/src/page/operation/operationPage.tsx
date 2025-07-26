import { useSearchParams } from 'react-router';
import Tabs from '../../components/tabs';

import TermsEdit from './termsEdit';
import FaqEdit from './faqEdit';
import NoticeEdit from './noticeEdit';
import NotificationSend from './notificationSend';

// 탭 목록
const TABS = [
  { label: '약관수정', key: 'terms' },
  { label: '공지수정', key: 'notice' },
  { label: 'FAQ수정', key: 'faq' },
  { label: '알림전송', key: 'notification' },
] as const;

export default function OperationPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // 쿼리에서 탭 추출
  const tabKey = searchParams.get('tab');

  const tab = TABS.find((t) => t.key === tabKey) ?? TABS[0];

  // 탭 클릭 시 쿼리 갱신
  const handleTabChange = (label: string) => {
    const found = TABS.find((t) => t.label === label);
    if (found) setSearchParams({ tab: found.key });
  };

  return (
    <div className='w-full'>
      <Tabs
        tabs={TABS.map(({ label }) => ({ label }))}
        selected={tab.label}
        onChange={handleTabChange}
      />

      <div className='mt-6 min-h-[600px]'>
        {tab.key === 'terms' && <TermsEdit />}
        {tab.key === 'notice' && <NoticeEdit />}
        {tab.key === 'faq' && <FaqEdit />}
        {tab.key === 'notification' && <NotificationSend />}
      </div>
    </div>
  );
}
