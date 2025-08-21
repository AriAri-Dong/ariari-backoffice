package com.ariari.ariari.domain.system.term;

import com.ariari.ariari.commons.auth.springsecurity.CustomUserDetails;
import com.ariari.ariari.domain.system.enums.TermType;
import com.ariari.ariari.domain.system.term.dto.req.SystemTermModifyReq;
import com.ariari.ariari.domain.system.term.dto.req.SystemTermSaveReq;
import com.ariari.ariari.domain.system.term.dto.res.SystemTermDetailRes;
import com.ariari.ariari.domain.system.term.dto.res.SystemTermListRes;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Tag(name = "system_term", description = "서비스 약관 기능")
@RestController
@RequestMapping("/system-term")
@RequiredArgsConstructor
public class SystemTermController {
    private final SystemTermService systemTermService;

    @Operation(summary = "약관 유형으로 약관 조회", description = "PRIVACY_POLICY : 개인정보 처리방침 , CLUB_RULES : 동아리 이용수칙, PLATFORM_RULES : 플랫폼 이용수칙")
    @GetMapping("/{termType}")
    public SystemTermDetailRes findSystemNoticeDetail(@PathVariable(value = "termType") TermType termType) {
        return systemTermService.getSystemTermByTermType(termType);
    }

    @Operation(summary = "약관 상세 조회", description = "PRIVACY_POLICY : 개인정보 처리방침 , CLUB_RULES : 동아리 이용수칙, PLATFORM_RULES : 플랫폼 이용수칙")
    @GetMapping("/detail/{systemTermId}")
    public SystemTermDetailRes findSystemTerm(@PathVariable Long systemTermId) {
        return systemTermService.findSystemTermDetail(systemTermId);
    }

    @Operation(summary = "약관 리스트 조회", description = "PRIVACY_POLICY : 개인정보 처리방침 , CLUB_RULES : 동아리 이용수칙, PLATFORM_RULES : 플랫폼 이용수칙")
    @GetMapping("/list")
    public SystemTermListRes findSystemTerms() {
        return systemTermService.findSystemTerms();
    }



    @Operation(summary = "약관 등록", description = "")
    @PostMapping("/create")
    public void saveSystemTerm(@RequestBody SystemTermSaveReq systemTermSaveReq) {
        systemTermService.saveSystemTerm(systemTermSaveReq);
    }

    @Operation(summary = "약관 수정", description = "")
    @PatchMapping("/modify/{systemTermId}")
    public void modifySystemTerm(@RequestBody SystemTermModifyReq systemTermModifyReq, @PathVariable Long systemTermId) {
        systemTermService.modifySystemTerm(systemTermModifyReq, systemTermId);
    }

    @Operation(summary = "약관 삭제", description = "")
    @DeleteMapping("/delete/{systemTermId}")
    public void  removeSystemTerm(@AuthenticationPrincipal CustomUserDetails customUserDetails, @PathVariable Long systemTermId) {
        systemTermService.removeSystemTerm(systemTermId);
    }
}