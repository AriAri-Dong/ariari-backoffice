package com.ariari.ariari.domain.system.term;

import com.ariari.ariari.commons.auth.springsecurity.CustomUserDetails;
import com.ariari.ariari.commons.repsonse.ApiResponse;
import com.ariari.ariari.commons.repsonse.PageResponse;
import com.ariari.ariari.domain.system.enums.TermType;
import com.ariari.ariari.domain.system.term.dto.req.SystemTermModifyReq;
import com.ariari.ariari.domain.system.term.dto.req.SystemTermSaveReq;
import com.ariari.ariari.domain.system.term.dto.res.SystemTermDetailRes;
import com.ariari.ariari.domain.system.term.dto.res.SystemTermListRes;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import static com.ariari.ariari.commons.constant.ApiHelper.CONST_API;

@Tag(name = "system_term", description = "서비스 약관 기능")
@RestController
@RequestMapping(CONST_API + "/terms")
@RequiredArgsConstructor
public class SystemTermController {
    private final SystemTermService systemTermService;


    @Operation(summary = "약관 목록 조회", description = "PRIVACY_POLICY : 개인정보 처리방침 , CLUB_RULES : 동아리 이용수칙, PLATFORM_RULES : 플랫폼 이용수칙")
    @GetMapping
    public PageResponse<SystemTermListRes> findSystemTerms(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                           @RequestParam(name = "page", required = false, defaultValue = "1") int page,
                                                           @RequestParam(name = "pageSize", required = false, defaultValue = "10") int pageSize){
        Long adminMemberId = CustomUserDetails.getMemberId(userDetails, false);
        Pageable pageable = PageRequest.of(page - 1, pageSize);
        return systemTermService.findSystemTerms(adminMemberId, pageable);
    }

    @Operation(summary = "약관 상세 조회", description = "PRIVACY_POLICY : 개인정보 처리방침 , CLUB_RULES : 동아리 이용수칙, PLATFORM_RULES : 플랫폼 이용수칙")
    @GetMapping("/{id}")
    public ApiResponse<SystemTermDetailRes> findSystemTerm(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long id) {
        Long adminMemberId = CustomUserDetails.getMemberId(userDetails, false);
        return systemTermService.findSystemTermDetail(adminMemberId, id);
    }

    @Operation(summary = "약관 등록", description = "")
    @PostMapping("/create")
    public ApiResponse<SystemTermDetailRes> saveSystemTerm(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody SystemTermSaveReq systemTermSaveReq) {
        Long adminMemberId = CustomUserDetails.getMemberId(userDetails, false);
        return  systemTermService.saveSystemTerm(adminMemberId, systemTermSaveReq);
    }

    @Operation(summary = "약관 수정", description = "")
    @PutMapping("/{id}")
    public ApiResponse<SystemTermDetailRes> modifySystemTerm(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody SystemTermModifyReq systemTermModifyReq, @PathVariable Long id) {
        Long adminMemberId = CustomUserDetails.getMemberId(userDetails, false);
        return systemTermService.modifySystemTerm(adminMemberId, systemTermModifyReq, id);
    }

    @Operation(summary = "약관 삭제", description = "")
    @DeleteMapping("/{id}")
    public ApiResponse<Void>  removeSystemTerm(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long id) {
        Long adminMemberId = CustomUserDetails.getMemberId(userDetails, false);
        return systemTermService.removeSystemTerm(adminMemberId, id);
    }
}