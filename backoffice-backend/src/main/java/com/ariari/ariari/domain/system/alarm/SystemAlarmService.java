package com.ariari.ariari.domain.system.alarm;

import com.ariari.ariari.commons.entity.ClubMember;
import com.ariari.ariari.commons.exception.exceptions.NotFoundEntityException;
import com.ariari.ariari.commons.manager.MemberAlarmManger;
import com.ariari.ariari.domain.club.clubmember.ClubMemberRepository;
import com.ariari.ariari.domain.club.clubmember.enums.ClubMemberRoleType;
import com.ariari.ariari.commons.entity.Member;
import com.ariari.ariari.domain.member.member.MemberRepository;
import com.ariari.ariari.commons.entity.SystemAlarm;
import com.ariari.ariari.domain.system.alarm.dto.req.SystemAlarmSaveReq;
import com.ariari.ariari.domain.system.alarm.dto.res.SystemAlarmDetailRes;
import com.ariari.ariari.domain.system.alarm.dto.res.SystemAlarmListRes;
import com.ariari.ariari.domain.system.enums.AlarmTargetType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SystemAlarmService {

    private final SystemAlarmRepository systemAlarmRepository;
    private final MemberAlarmManger  memberAlarmManger;
    private final MemberRepository memberRepository;
    private final ClubMemberRepository clubMemberRepository;

    @Transactional(readOnly = true)
    public SystemAlarmDetailRes findSystemAlarmDetail(Long adminMemberId, Long systemAlarmId) {
        SystemAlarm systemAlarm = systemAlarmRepository.findById(systemAlarmId).orElseThrow(NotFoundEntityException::new);
        return SystemAlarmDetailRes.createRes(systemAlarm);
    }

    @Transactional(readOnly = true)
    public SystemAlarmListRes findSystemAlarms(Long adminMemberId, Pageable pageable) {
        Page<SystemAlarm> systemAlarmPage = systemAlarmRepository.findAllByOrderByCreatedDateTimeDesc(pageable);
        return SystemAlarmListRes.from(systemAlarmPage);
    }

    @Transactional
    public void saveSystemAlarm(Long adminMemberId, SystemAlarmSaveReq systemAlarmSaveReq) {
        SystemAlarm systemAlarm = systemAlarmSaveReq.toEntity();
        systemAlarmRepository.save(systemAlarm);

        // 알림 전송 로직 필요
        if(systemAlarmSaveReq.getAlarmTargetType().equals(AlarmTargetType.ALL)){
            List<Member> memberList = memberRepository.findAll();
            memberAlarmManger.sendSystemNotification(memberList);
        }else if(systemAlarmSaveReq.getAlarmTargetType().equals(AlarmTargetType.CLUB_ADMIN)){
            List<Member> memberList = clubMemberRepository.findByClubMemberRoleType(ClubMemberRoleType.ADMIN).stream()
                    .map(ClubMember::getMember).toList();
            memberAlarmManger.sendSystemNotification(memberList);
        }


    }

    @Transactional
    public void removeSystemAlarm(Long adminMemberId, Long systemAlarmId) {
        SystemAlarm systemAlarm = systemAlarmRepository.findById(systemAlarmId).orElseThrow(NotFoundEntityException::new);
        systemAlarmRepository.delete(systemAlarm);
    }
}
