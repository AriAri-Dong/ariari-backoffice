package com.ariari.ariari.domain.system.alarm.dto.req;

import com.ariari.ariari.commons.entity.SystemAlarm;
import com.ariari.ariari.domain.system.enums.AlarmTargetType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import org.checkerframework.checker.units.qual.Length;

@Schema(description = "서비스 알림 등록 형식")
@Getter
public class SystemAlarmSaveReq {

    @Schema(description = "서비스 알림 제목", example = "아리아리에서 개발한 서비스의 배포 시작")
    @NotBlank
    private String title;

    @Schema(description = "서비스 알림 설명", example = "아리아리에서 개발한 서비스의 배포 시작")
    @NotBlank
    @Size(max = 3000)
    private String description;

    @Schema(description = "서비스 알림 대상", example = "ALL, CLUB_ADMIN")
    @NotNull
    private AlarmTargetType target;


    public SystemAlarm toEntity() {
        return SystemAlarm.create(
                title,
                description,
                target
        );
    }


}
