package com.ariari.ariari.commons.manager;

import com.ariari.ariari.commons.exception.exceptions.NotFoundEntityException;
import com.ariari.ariari.commons.manager.dto.AlarmContent;
import com.ariari.ariari.domain.club.Club;
import com.ariari.ariari.domain.club.clubmember.enums.ClubMemberRoleType;
import com.ariari.ariari.domain.club.clubmember.enums.ClubMemberStatusType;
import com.ariari.ariari.domain.club.question.ClubQuestion;
import com.ariari.ariari.domain.member.Member;
import com.ariari.ariari.domain.member.alarm.MemberAlarm;
import com.ariari.ariari.domain.member.alarm.MemberAlarmRepository;
import com.ariari.ariari.domain.member.alarm.dto.res.MemberAlarmListRes;
import com.ariari.ariari.domain.member.alarm.enums.MemberAlarmType;
import com.ariari.ariari.domain.member.alarm.event.MemberAlarmEvent;
import com.ariari.ariari.domain.member.alarm.event.MemberAlarmEventList;
import com.ariari.ariari.domain.recruitment.apply.enums.ApplyStatusType;
import com.ariari.ariari.domain.recruitment.apply.temp.ApplyTemp;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

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
