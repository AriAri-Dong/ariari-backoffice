package com.ariari.ariari.domain.system.alarm.dto.res;

import com.ariari.ariari.commons.entity.SystemAlarm;
import com.ariari.ariari.domain.system.enums.AlarmTargetType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Schema(description = "서비스 알림 리스트 응답")
@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class SystemAlarmListRes {

    @JsonSerialize(using = ToStringSerializer.class)
    @Schema(description = "서비스 알림 id", example = "673012345142938986")
    private final Long id;

    @Schema(description = "제목", example = "공지사항입니다.")
    private final String title;

    @Schema(description = "알림 조회수", example = "POSTED / UNPOSTED")
    private final int views;

    @Schema(description = "알림 대상", example = "ALL / ADMIN")
    private final AlarmTargetType target;

    @Schema(description = "생성일자", example = "2024-03-01")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private final LocalDate createdAt;

    public static SystemAlarmListRes fromEntity(SystemAlarm systemAlarm){
        return SystemAlarmListRes.builder()
                .id(systemAlarm.getId())
                .title(systemAlarm.getTitle())
                .views(systemAlarm.getViews())
                .createdAt(systemAlarm.getCreatedDateTime().toLocalDate())
                .target(systemAlarm.getTargetType())
                .build();

    }
}
