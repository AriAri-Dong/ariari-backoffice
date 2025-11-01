package com.ariari.ariari.domain.system.faq;

import com.ariari.ariari.commons.auth.springsecurity.CustomUserDetails;
import com.ariari.ariari.commons.constant.ApiHelper;
import com.ariari.ariari.commons.repsonse.ApiResponse;
import com.ariari.ariari.commons.repsonse.PageResponse;
import com.ariari.ariari.domain.system.enums.SystemFaqStatusType;
import com.ariari.ariari.domain.system.faq.dto.req.SystemFaqModifyReq;
import com.ariari.ariari.domain.system.faq.dto.req.SystemFaqSaveReq;
import com.ariari.ariari.domain.system.faq.dto.req.SystemFaqSearchReq;
import com.ariari.ariari.domain.system.faq.dto.res.SystemFaqDetailRes;
import com.ariari.ariari.domain.system.faq.dto.res.SystemFaqListRes;
import com.ariari.ariari.domain.system.faq.dto.res.SystemFaqModifyRes;
import com.ariari.ariari.domain.system.faq.dto.res.SystemFaqSaveRes;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Tag(name = "system_faq", description = "서비스 FAQ 기능")
@RestController
@RequestMapping(ApiHelper.CONST_API + "/faqs")
@RequiredArgsConstructor
public class SystemFaqController {

    private final SystemFaqService systemFaqService;

    @Operation(summary = "서비스 FAQ 목록 조회", description = "운영 관리자만이 조회할 수 있습니다.")
    @GetMapping
    public PageResponse<SystemFaqListRes> findSystemFaqs(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestParam(required = false) SystemFaqStatusType category,
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "10") Integer pageSize ){
        Long adminMemberId = CustomUserDetails.getMemberId(userDetails, false);
        return systemFaqService.findSystemFaqs(adminMemberId, category, page, pageSize);
    }

    @Operation(summary = "서비스 FAQ 상세 조회", description = "운영 관리자만이 조회할 수 있습니다.")
    @GetMapping("/{id}")
    public ApiResponse<SystemFaqDetailRes> findSystemFaqsDetail(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long id) {
        Long adminMemberId = CustomUserDetails.getMemberId(userDetails, false);
        return systemFaqService.findSystemFaqsDetail(adminMemberId, id);
    }

    @Operation(summary = "서비스 FAQ 등록", description = "운영 관리자만이 등록할 수 있습니다.")
    @PostMapping
    public ApiResponse<SystemFaqSaveRes> saveSystemFaq(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                       @Valid @RequestBody SystemFaqSaveReq systemFaq){
        Long reqMemberId = CustomUserDetails.getMemberId(userDetails, true);
        return systemFaqService.saveSystemFaq(reqMemberId, systemFaq);
    }

    @Operation(summary = "서비스 FAQ 수정", description = "운영 관리자만이 수정할 수 있습니다.")
    @PutMapping( "/{id}")
    public ApiResponse<SystemFaqModifyRes> modifySystemNotice(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                              @PathVariable Long id,
                                                              @RequestBody SystemFaqModifyReq modifyReq) {
        Long reqMemberId = CustomUserDetails.getMemberId(userDetails, true);
        return systemFaqService.modifySystemFaq(reqMemberId, id, modifyReq);
    }


    @Operation(summary = "서비스 FAQ 삭제", description = "운영 관리자만이 삭제할 수 있습니다.")
    @DeleteMapping("/{id}")
    public ApiResponse<Void> removeSystemFaq(@AuthenticationPrincipal CustomUserDetails userDetails,
                              @PathVariable Long id ){
        Long reqMemberId = CustomUserDetails.getMemberId(userDetails, true);
       return systemFaqService.removeSystemFaq(reqMemberId, id);
    }
}
