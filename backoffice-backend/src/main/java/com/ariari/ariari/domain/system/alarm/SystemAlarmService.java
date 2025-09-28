package com.ariari.ariari.domain.system.alarm;

import com.ariari.ariari.commons.entity.*;
import com.ariari.ariari.commons.exception.exceptions.NotFoundEntityException;
import com.ariari.ariari.commons.manager.MemberAlarmManger;
import com.ariari.ariari.commons.manager.S3Manager;
import com.ariari.ariari.commons.repsonse.ApiResponse;
import com.ariari.ariari.commons.repsonse.PageResponse;
import com.ariari.ariari.domain.club.clubmember.ClubMemberRepository;
import com.ariari.ariari.domain.club.clubmember.enums.ClubMemberRoleType;
import com.ariari.ariari.domain.member.member.MemberRepository;
import com.ariari.ariari.domain.system.alarm.dto.req.SystemAlarmSaveReq;
import com.ariari.ariari.domain.system.alarm.dto.res.SystemAlarmDetailRes;
import com.ariari.ariari.domain.system.alarm.dto.res.SystemAlarmListRes;
import com.ariari.ariari.domain.system.alarm.dto.res.SystemAlarmSaveRes;
import com.ariari.ariari.domain.system.enums.AlarmTargetType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SystemAlarmService {

    private final SystemAlarmRepository systemAlarmRepository;
    private final MemberAlarmManger  memberAlarmManger;
    private final MemberRepository memberRepository;
    private final ClubMemberRepository clubMemberRepository;
    private final S3Manager s3Manager;


    @Transactional(readOnly = true)
    public PageResponse<SystemAlarmListRes> findSystemAlarms(Long adminMemberId, Pageable pageable, String search, String filter) {
        Page<SystemAlarm> systemAlarmPage;

        if (search != null && !search.isEmpty() && filter != null && !filter.isEmpty()) {
            systemAlarmPage = systemAlarmRepository.findByTitleContainingAndTargetType(
                    search, AlarmTargetType.valueOf(filter), pageable
            );
        } else if (search != null && !search.isEmpty()) {
            systemAlarmPage = systemAlarmRepository.findByTitleContaining(search, pageable);
        } else if (filter != null && !filter.isEmpty()) {
            systemAlarmPage = systemAlarmRepository.findByTargetType(
                    AlarmTargetType.valueOf(filter), pageable
            );
        } else {
            systemAlarmPage = systemAlarmRepository.findAllByOrderByCreatedDateTimeDesc(pageable);
        }

        Page<SystemAlarmListRes> dtoPage = systemAlarmPage.map(SystemAlarmListRes::fromEntity);

        return PageResponse.of(dtoPage);
    }

    @Transactional(readOnly = true)
    public ApiResponse<SystemAlarmDetailRes> findSystemAlarmDetail(Long adminMemberId, Long systemAlarmId) {
        SystemAlarm systemAlarm = systemAlarmRepository.findById(systemAlarmId).orElseThrow(NotFoundEntityException::new);
        if (systemAlarm == null) throw new NotFoundEntityException();
        return ApiResponse.success(SystemAlarmDetailRes.fromEntity(systemAlarm));
    }

    @Transactional
    public ApiResponse<SystemAlarmSaveRes> saveSystemAlarm(Long adminMemberId, SystemAlarmSaveReq systemAlarmSaveReq, List<MultipartFile> files) {
        SystemAlarm systemAlarm = systemAlarmSaveReq.toEntity();
        systemAlarmRepository.save(systemAlarm);

        // 이미지 처리
        if (files != null) {
            if (files.size() > 10) {
                return ApiResponse.failMessage("이미지는 최대 10장까지 업로드 가능합니다.");
            }
            for (MultipartFile file : files) {

                String originalFilename = file.getOriginalFilename();
                if (originalFilename == null || !originalFilename.matches("(?i).+\\.(jpg|jpeg|png|gif)$")) {
                    return ApiResponse.failMessage("이미지는 JPG, JPEG, PNG, GIF 형식만 업로드 가능합니다.");
                }

                String filePath = s3Manager.saveFile(file, "system_alarm_image");
                systemAlarm.getSystemAlarmImages()
                        .add(new SystemAlarmImage(filePath, systemAlarm));
            }
        }
        // 알림 전송 로직 필요
        List<Member> targetMembers = switch (systemAlarmSaveReq.getTarget()) {
            case ALL -> memberRepository.findAll();
            case CLUB_ADMIN -> clubMemberRepository.findByClubMemberRoleType(ClubMemberRoleType.ADMIN)
                    .stream()
                    .map(ClubMember::getMember)
                    .toList();
        };
        memberAlarmManger.sendSystemNotification(targetMembers);

        return ApiResponse.success(SystemAlarmSaveRes.fromEntity(systemAlarm));

    }

    @Transactional
    public ApiResponse<Void> removeSystemAlarm(Long adminMemberId, Long systemAlarmId) {
        SystemAlarm systemAlarm = systemAlarmRepository.findById(systemAlarmId).orElseThrow(NotFoundEntityException::new);
        systemAlarmRepository.delete(systemAlarm);

        return ApiResponse.successMessage("알림이 삭제되었습니다.");
    }
}
