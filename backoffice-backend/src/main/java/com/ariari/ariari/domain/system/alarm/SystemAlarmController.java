package com.ariari.ariari.domain.system.alarm;

import com.ariari.ariari.commons.auth.springsecurity.CustomUserDetails;
import com.ariari.ariari.commons.constant.ApiHelper;
import com.ariari.ariari.commons.repsonse.ApiResponse;
import com.ariari.ariari.commons.repsonse.PageResponse;
import com.ariari.ariari.domain.system.alarm.dto.req.SystemAlarmSaveReq;
import com.ariari.ariari.domain.system.alarm.dto.res.SystemAlarmDetailRes;
import com.ariari.ariari.domain.system.alarm.dto.res.SystemAlarmListRes;
import com.ariari.ariari.domain.system.alarm.dto.res.SystemAlarmSaveRes;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Tag(name = "system_alarm", description = "서비스 관리자 알림 기능")
@RestController
@RequestMapping(ApiHelper.CONST_API + "/notifications")
@RequiredArgsConstructor
public class SystemAlarmController {

    private final SystemAlarmService systemAlarmService;

    @Operation(summary = "서비스 알림 리스트 조회", description = "운영 관리자만이 조회할 수 있습니다.")
    @GetMapping
    public PageResponse<SystemAlarmListRes> findSystemAlarms(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                             @RequestParam(value = "search", required = false) String search,
                                                             @RequestParam(value = "filter", required = false) String filter,
                                                             @RequestParam(value = "page", defaultValue = "1") int page,
                                                             @RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {

        Long adminMemberId = CustomUserDetails.getMemberId(userDetails, false);
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by(Sort.Direction.DESC, "createdAt"));

        return systemAlarmService.findSystemAlarms(adminMemberId, pageable, search, filter);
    }

    @Operation(summary = "서비스 알림 상세 조회", description = "운영 관리자만이 조회할 수 있습니다.")
    @GetMapping("/{id}")
    public ApiResponse<SystemAlarmDetailRes> findSystemAlarmDetail(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long id) {
        Long adminMemberId = CustomUserDetails.getMemberId(userDetails, false);
        return systemAlarmService.findSystemAlarmDetail(adminMemberId, id);
    }



    @Operation(summary = "서비스 알림 등록", description = "운영 관리자만이 등록할 수 있습니다.")
    @PostMapping
    public ApiResponse<SystemAlarmSaveRes> saveSystemAlarm(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                           @Valid @RequestPart SystemAlarmSaveReq saveReq,
                                                           @RequestPart(required = false) List<MultipartFile> files){
        Long adminMemberId = CustomUserDetails.getMemberId(userDetails, true);
        return systemAlarmService.saveSystemAlarm(adminMemberId, saveReq, files);
    }

    @Operation(summary = "서비스 알림 삭제", description = "운영 관리자만이 삭제할 수 있습니다.")
    @DeleteMapping("/{id}")
    public ApiResponse<Void> removeSystemAlarm(@AuthenticationPrincipal CustomUserDetails userDetails,
                                @PathVariable Long id ){
        Long reqMemberId = CustomUserDetails.getMemberId(userDetails, true);
        return systemAlarmService.removeSystemAlarm(reqMemberId, id);
    }


}
