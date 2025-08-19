package com.ariari.ariari.domain.system.alarm.dto.req;

import com.ariari.ariari.domain.system.SystemAlarm;
import com.ariari.ariari.domain.system.enums.AlarmTargetType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Schema(description = "서비스 알림 저장 형식")
@Getter
public class SystemAlarmSaveReq {

    @Schema(description = "서비스 알림 제목", example = "아리아리에서 개발한 서비스의 배포 시작")
    @NotBlank
    private String title;

    @Schema(description = "서비스 알림 내용", example = "아리아리에서 개발한 동아리 커뮤니티 서비스의 배포가 시작되었습니다!")
    @NotBlank
    private String body;

    @Schema(description = "서비스 알림 대상", example = "서비스 알림 대상 (ALL, CLUB_ADMIN)")
    private AlarmTargetType alarmTargetType;


    public SystemAlarm toEntity() {
        return SystemAlarm.create(
                title,
                body,
                alarmTargetType
        );
    }


}
