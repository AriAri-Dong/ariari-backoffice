package com.ariari.ariari.commons.manager;

import com.ariari.ariari.commons.entity.Member;
import com.ariari.ariari.domain.member.alarm.event.MemberAlarmEvent;
import com.ariari.ariari.domain.member.alarm.event.MemberAlarmEventList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class MemberAlarmManger {

    private final ApplicationEventPublisher eventPublisher;

    // 시스템 공지사항 추가
    public void sendSystemNotification(List<Member> memberList){
        String title = "새로운 아리아리 플랫폼 공지사항이 등록되었습니다. 서비스 관련 중요한 내용을 확인해 보세요.";
        MemberAlarmEventList memberAlarmEventList = MemberAlarmEventList.from(title
                ,"/service-notices", memberList);
        sendList(memberAlarmEventList);
    }


    // 서비스 알림 전송(대상 모든 회원 혹은 동아리 관리자만)
    public void sendSystemAlarm(List<Member> memberList, String title, String body){

        MemberAlarmEventList memberAlarmEventList = MemberAlarmEventList.from(title
                ,null
                , memberList);
        sendList(memberAlarmEventList);
    }

    // 삭제 안내 공고 알림
    public void sendReportDeleteNotification(Member member, String title){
        MemberAlarmEvent memberAlarmEvent = MemberAlarmEvent.from(
                title,
                null,
                member
        );
        sendSingle(memberAlarmEvent);
    }


    private void sendSingle(MemberAlarmEvent memberAlarmEvent){
        eventPublisher.publishEvent(memberAlarmEvent);
    }

    private void sendList(MemberAlarmEventList memberAlarmListEvent){
        eventPublisher.publishEvent(memberAlarmListEvent);
    }



}
