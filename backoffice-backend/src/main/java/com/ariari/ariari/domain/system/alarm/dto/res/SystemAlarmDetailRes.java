package com.ariari.ariari.domain.system.alarm.dto.res;

import com.ariari.ariari.commons.entity.SystemAlarm;
import com.ariari.ariari.domain.system.alarm.dto.SystemAlarmData;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;


@Schema(description = "서비스 알림 상세 응답 ")
@Getter
public class SystemAlarmDetailRes {

    private final SystemAlarmData systemAlarmData;

    private SystemAlarmDetailRes(SystemAlarmData systemAlarmData) {
        this.systemAlarmData = systemAlarmData;
    }

    public static SystemAlarmDetailRes createRes(SystemAlarm systemAlarm){
        return new SystemAlarmDetailRes(SystemAlarmData.fromEntity(systemAlarm));
    }
}
