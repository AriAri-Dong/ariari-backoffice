package com.ariari.ariari.domain.system.alarm;

import com.ariari.ariari.commons.auth.springsecurity.CustomUserDetails;
import com.ariari.ariari.domain.system.alarm.dto.req.SystemAlarmSaveReq;
import com.ariari.ariari.domain.system.alarm.dto.res.SystemAlarmDetailRes;
import com.ariari.ariari.domain.system.alarm.dto.res.SystemAlarmListRes;
import com.ariari.ariari.domain.system.faq.dto.req.SystemFaqSaveReq;
import com.ariari.ariari.domain.system.notice.dto.res.SystemNoticeListRes;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Tag(name = "system_alarm", description = "서비스 관리자 알림 기능")
@RestController
@RequiredArgsConstructor
public class SystemAlarmController {

    private final SystemAlarmService systemAlarmService;

    @Operation(summary = "서비스 알림 리스트 조회", description = "운영 관리자만이 조회할 수 있습니다.")
    @GetMapping("/service-alarm")
    public SystemAlarmListRes findSystemAlarms(Pageable pageable) {
        return systemAlarmService.findSystemAlarms(pageable);
    }

    @Operation(summary = "서비스 알림 상세 조회", description = "운영 관리자만이 조회할 수 있습니다.")
    @GetMapping("/service-alarm/{systemAlarmId}")
    public SystemAlarmDetailRes findSystemAlarmDetail(@PathVariable Long systemAlarmId) {
        return systemAlarmService.findSystemAlarmDetail(systemAlarmId);
    }



    @Operation(summary = "서비스 알림 등록", description = "운영 관리자만이 등록할 수 있습니다.")
    @PostMapping(value = "/service-alarm/create")
    public void saveSystemAlarm(@AuthenticationPrincipal CustomUserDetails userDetails,
                              @RequestBody SystemAlarmSaveReq systemAlarmSaveReq){
        Long reqMemberId = CustomUserDetails.getMemberId(userDetails, true);
        systemAlarmService.saveSystemAlarm(reqMemberId, systemAlarmSaveReq);
    }

    @Operation(summary = "서비스 알림 삭제", description = "운영 관리자만이 삭제할 수 있습니다.")
    @DeleteMapping(value = "/service-alarm/{systemAlarmId}")
    public void removeSystemAlarm(@AuthenticationPrincipal CustomUserDetails userDetails,
                                @PathVariable Long systemAlarmId ){
        Long reqMemberId = CustomUserDetails.getMemberId(userDetails, true);
        systemAlarmService.removeSystemAlarm(reqMemberId, systemAlarmId);
    }


}
