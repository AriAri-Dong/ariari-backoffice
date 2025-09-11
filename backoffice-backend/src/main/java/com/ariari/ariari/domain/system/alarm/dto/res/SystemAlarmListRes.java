package com.ariari.ariari.domain.system.alarm.dto.res;

import com.ariari.ariari.commons.manager.PageInfo;
import com.ariari.ariari.commons.entity.SystemAlarm;
import com.ariari.ariari.domain.system.alarm.dto.SystemAlarmData;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Schema(description = "서비스 알림 리스트 응답")
@Getter
public class SystemAlarmListRes {

    @Schema(description = "서비스 알림 데이터 리스트")
    private final List<SystemAlarmData> systemAlarmDataList;
    private final PageInfo pageInfo;

    private SystemAlarmListRes(List<SystemAlarmData> systemAlarmDataList, PageInfo pageInfo) {
        this.systemAlarmDataList = systemAlarmDataList;
        this.pageInfo = pageInfo;
    }

    public static SystemAlarmListRes from(Page<SystemAlarm> page) {
        List<SystemAlarmData> systemAlarmData = page.getContent().stream()
                .map(SystemAlarmData::fromEntity)
                .toList();

        return new SystemAlarmListRes(systemAlarmData, PageInfo.fromPage(page));
    }
}
