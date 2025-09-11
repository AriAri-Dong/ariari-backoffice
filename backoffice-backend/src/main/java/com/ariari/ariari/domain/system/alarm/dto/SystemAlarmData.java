package com.ariari.ariari.domain.system.alarm.dto;

import com.ariari.ariari.commons.entity.SystemAlarm;
import com.ariari.ariari.commons.entity.SystemNotice;
import com.ariari.ariari.domain.system.enums.AlarmTargetType;
import com.ariari.ariari.domain.system.notice.dto.SystemNoticeData;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Schema(description = "서비스 알림 데이터 ")
@Getter
public class SystemAlarmData {

    @JsonSerialize(using = ToStringSerializer.class)
    @Schema(description = "서비스 알림 id", example = "673012345142938986")
    private final Long id;
    @Schema(description = "서비스 알림 제목", example = "아리아리에서 개발한 서비스의 배포 시작")
    private final String title;
    @Schema(description = "서비스 알림 내용", example = "아리아리에서 개발한 동아리 커뮤니티 서비스의 배포가 시작되었습니다!")
    private final String body;
    @Schema(description = "서비스 알림 대상", example = "아리아리에서 개발한 동아리 커뮤니티 서비스의 배포가 시작되었습니다!")
    private final AlarmTargetType alarmTargetType;

    @Builder
    private SystemAlarmData(Long id, String title, String body, AlarmTargetType alarmTargetType) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.alarmTargetType = alarmTargetType;
    }

    public static SystemAlarmData fromEntity(SystemAlarm systemAlarm){
        return SystemAlarmData.builder()
                .id(systemAlarm.getId())
                .title(systemAlarm.getTitle())
                .body(systemAlarm.getBody())
                .alarmTargetType(systemAlarm.getTargetType())
                .build();
    }
}
