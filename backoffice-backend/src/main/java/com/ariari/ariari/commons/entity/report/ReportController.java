package com.ariari.ariari.commons.entity.report;

import com.ariari.ariari.commons.auth.springsecurity.CustomUserDetails;
import com.ariari.ariari.commons.entity.report.dto.req.DeleteReportReq;
import com.ariari.ariari.commons.entity.report.dto.req.ResolveSaveReq;
import com.ariari.ariari.commons.entity.report.dto.req.SearchReq;
import com.ariari.ariari.commons.entity.report.dto.res.PendingReportListRes;
import com.ariari.ariari.commons.entity.report.dto.res.ResolvedReportListRes;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/report")
public class ReportController {


    private final ReportService reportService;

    @Operation(summary = "전체 신고 데이터 리스트", description = "")
    @GetMapping("/pending")
    public PendingReportListRes getAllReports(@AuthenticationPrincipal CustomUserDetails userDetails,
                                              @PageableDefault(sort = "createdDateTime", direction = Sort.Direction.DESC) Pageable pageable) {
        Long memberId = CustomUserDetails.getMemberId(userDetails, false);
        return reportService.getAllReports(memberId, pageable);
    }

    @Operation(summary = "신고 내역 조치 완료", description = "")
    @PostMapping("/resolve")
    public void saveResolvedReport(@RequestBody ResolveSaveReq resolveSaveReq, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        Long memberId = CustomUserDetails.getMemberId(customUserDetails, false);
        reportService.saveResolvedReport(resolveSaveReq,memberId);
    }

    @Operation(summary = "조치 완료 검색 필터", description = "")
    @GetMapping("/search")
    public ResolvedReportListRes searchReports(SearchReq searchReq, @AuthenticationPrincipal CustomUserDetails userDetails, Pageable pageable){
        Long memberId = CustomUserDetails.getMemberId(userDetails, false);
        return reportService.searchReports(searchReq, memberId, pageable);
    }


    @Operation(summary = "전체 조치완료 데이터 리스트", description = "")
    @GetMapping("/resolved")
    public ResolvedReportListRes getAllResolvedReports(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                       @PageableDefault(sort = "createdDateTime", direction = Sort.Direction.DESC) Pageable pageable) {
        Long memberId = CustomUserDetails.getMemberId(userDetails, false);
        return reportService.getAllResolvedReports(memberId, pageable);
    }

    @Operation(summary = "신고 삭제하기", description = "")
    @PostMapping("/delete/")
    public void deleteReport(@RequestBody DeleteReportReq deleteReportReq, @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long memberId = CustomUserDetails.getMemberId(userDetails, true);
        reportService.deleteReport(deleteReportReq, memberId);
    }

}
