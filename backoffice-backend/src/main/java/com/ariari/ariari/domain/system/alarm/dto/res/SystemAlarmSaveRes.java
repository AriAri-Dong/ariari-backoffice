package com.ariari.ariari.domain.system.alarm.dto.res;

import com.ariari.ariari.commons.entity.SystemAlarm;
import com.ariari.ariari.commons.entity.SystemAlarmImage;
import com.ariari.ariari.commons.entity.SystemNotice;
import com.ariari.ariari.commons.entity.SystemNoticeImage;
import com.ariari.ariari.domain.system.alarm.dto.req.SystemAlarmSaveReq;
import com.ariari.ariari.domain.system.enums.AlarmTargetType;
import com.ariari.ariari.domain.system.notice.dto.res.SystemNoticeSaveRes;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Schema(description = "서비스 알림 등록 응답")
@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class SystemAlarmSaveRes {

    @JsonSerialize(using = ToStringSerializer.class)
    @Schema(description = "서비스 알림 id", example = "673012345142938986")
    private final Long id;

    @Schema(description = "서비스 알림 제목", example = "아리아리에서 개발한 서비스의 배포 시작")
    @NotBlank
    private final String title;

    @Schema(description = "서비스 알림 설명", example = "아리아리에서 개발한 서비스의 배포 시작")
    @NotBlank
    @Size(max = 3000)
    private final String description;

    @Schema(description = "서비스 알림 대상", example = "ALL, ADMIN")
    @NotNull
    private final AlarmTargetType target;

    @Schema(description = "알림 이미지", example = "")
    private final List<String> images;


    @Schema(description = "생성일자", example = "2024-03-01")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private final LocalDate createdAt;


    public static SystemAlarmSaveRes fromEntity(SystemAlarm systemAlarm){
        return SystemAlarmSaveRes.builder()
                .id(systemAlarm.getId())
                .title(systemAlarm.getTitle())
                .description(systemAlarm.getBody())
                .target(systemAlarm.getTargetType())
                .createdAt(systemAlarm.getCreatedDateTime().toLocalDate())
                .images(systemAlarm.getSystemAlarmImages().stream().map(SystemAlarmImage::getImageUri).toList())
                .build();

    }
}
