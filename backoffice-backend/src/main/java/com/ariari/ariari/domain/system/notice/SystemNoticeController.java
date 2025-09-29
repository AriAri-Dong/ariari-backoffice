package com.ariari.ariari.domain.system.notice;

import com.ariari.ariari.commons.auth.springsecurity.CustomUserDetails;
import com.ariari.ariari.commons.constant.ApiHelper;
import com.ariari.ariari.commons.repsonse.ApiResponse;
import com.ariari.ariari.commons.repsonse.PageResponse;
import com.ariari.ariari.domain.system.notice.dto.req.SystemNoticeModifyReq;
import com.ariari.ariari.domain.system.notice.dto.req.SystemNoticeSaveReq;
import com.ariari.ariari.domain.system.notice.dto.req.SystemNoticeSearchReq;
import com.ariari.ariari.domain.system.notice.dto.res.SystemNoticeDetailRes;
import com.ariari.ariari.domain.system.notice.dto.res.SystemNoticeListRes;
import com.ariari.ariari.domain.system.notice.dto.res.SystemNoticeModifyRes;
import com.ariari.ariari.domain.system.notice.dto.res.SystemNoticeSaveRes;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;


@Tag(name = "system_notice", description = "서비스 공지사항 기능")
@RestController
@RequestMapping(ApiHelper.CONST_API + "/notices")
@RequiredArgsConstructor
public class SystemNoticeController {

    private final SystemNoticeService systemNoticeService;

    @Operation(summary = "서비스 공지사항 목록 조회", description = "운영 관리자만이 조회할 수 있습니다.")
    @GetMapping
    public PageResponse<SystemNoticeListRes> findSystemNotices(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                               SystemNoticeSearchReq req,
                                                               Pageable pageable) {
        Long adminMemberId = CustomUserDetails.getMemberId(userDetails, false);
        return systemNoticeService.findSystemNotices(adminMemberId, req, pageable);
    }

    @Operation(summary = "서비스 공지사항 상세 조회", description = " 모든 회원이 조회할 수 있습니다.")
    @GetMapping("/{id}")
    public ApiResponse<SystemNoticeDetailRes> findSystemNoticeDetail(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                                     @PathVariable Long id) {
        Long adminMemberId = CustomUserDetails.getMemberId(userDetails, false);
        return systemNoticeService.findSystemNoticeDetail(adminMemberId, id);
    }

    @Operation(summary = "서비스 공지사항 등록", description = "운영 관리자만이 등록할 수 있습니다.")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<SystemNoticeSaveRes> saveSystemNotice(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                             @Valid @RequestPart SystemNoticeSaveReq saveReq,
                                                             @RequestPart(required = false) List<MultipartFile> files) {
        Long reqMemberId = CustomUserDetails.getMemberId(userDetails, true);
       return systemNoticeService.saveSystemNotice(reqMemberId, saveReq, files);
    }

    @Operation(summary = "서비스 공지사항 수정", description = "운영 관리자만이 수정할 수 있습니다.")
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<SystemNoticeModifyRes> modifySystemNotice(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                                 @PathVariable Long id,
                                                                 @Valid @RequestPart SystemNoticeModifyReq modifyReq,
                                                                 @RequestPart(required = false) List<MultipartFile> files) {
        Long reqMemberId = CustomUserDetails.getMemberId(userDetails, true);
        return systemNoticeService.modifySystemNotice(reqMemberId, id, modifyReq, files);
    }

    @Operation(summary = "서비스 공지사항 삭제", description = "운영 관리자만이 삭제할 수 있습니다.")
    @DeleteMapping("/{id}")
    public ApiResponse<Void> removeSystemNotice(@AuthenticationPrincipal CustomUserDetails userDetails,
                                 @PathVariable Long id) {
        Long reqMemberId = CustomUserDetails.getMemberId(userDetails, true);
        return systemNoticeService.removeSystemNotice(reqMemberId, id);
    }


}


