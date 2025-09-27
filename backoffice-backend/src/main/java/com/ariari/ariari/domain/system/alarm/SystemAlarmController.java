package com.ariari.ariari.domain.system.alarm;

import com.ariari.ariari.commons.auth.springsecurity.CustomUserDetails;
import com.ariari.ariari.commons.constant.ApiHelper;
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
@RequestMapping(ApiHelper.CONST_API + "/notifications")
@RequiredArgsConstructor
public class SystemAlarmController {

    private final SystemAlarmService systemAlarmService;

    @Operation(summary = "서비스 알림 리스트 조회", description = "운영 관리자만이 조회할 수 있습니다.")
    @GetMapping
    public SystemAlarmListRes findSystemAlarms(@AuthenticationPrincipal CustomUserDetails userDetails, Pageable pageable) {
        Long adminMemberId = CustomUserDetails.getMemberId(userDetails, false);
        return systemAlarmService.findSystemAlarms(adminMemberId, pageable);
    }

    @Operation(summary = "서비스 알림 상세 조회", description = "운영 관리자만이 조회할 수 있습니다.")
    @GetMapping("/{id}")
    public SystemAlarmDetailRes findSystemAlarmDetail(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long id) {
        Long adminMemberId = CustomUserDetails.getMemberId(userDetails, false);
        return systemAlarmService.findSystemAlarmDetail(adminMemberId, id);
    }



    @Operation(summary = "서비스 알림 등록", description = "운영 관리자만이 등록할 수 있습니다.")
    @PostMapping
    public void saveSystemAlarm(@AuthenticationPrincipal CustomUserDetails userDetails,
                              @RequestBody SystemAlarmSaveReq systemAlarmSaveReq){
        Long adminMemberId = CustomUserDetails.getMemberId(userDetails, true);
        systemAlarmService.saveSystemAlarm(adminMemberId, systemAlarmSaveReq);
    }

    @Operation(summary = "서비스 알림 삭제", description = "운영 관리자만이 삭제할 수 있습니다.")
    @DeleteMapping("/{id}")
    public void removeSystemAlarm(@AuthenticationPrincipal CustomUserDetails userDetails,
                                @PathVariable Long id ){
        Long reqMemberId = CustomUserDetails.getMemberId(userDetails, true);
        systemAlarmService.removeSystemAlarm(reqMemberId, id);
    }


}
