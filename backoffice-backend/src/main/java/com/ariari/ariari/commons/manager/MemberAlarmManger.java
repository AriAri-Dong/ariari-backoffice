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
    public void sendSystemNotification(List<Member> memberList, String title){
        MemberAlarmEventList memberAlarmEventList = MemberAlarmEventList.from(title
                ,"/help", memberList);
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
