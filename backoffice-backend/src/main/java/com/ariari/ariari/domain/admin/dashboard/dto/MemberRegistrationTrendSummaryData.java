package com.ariari.ariari.domain.admin.dashboard.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class MemberRegistrationTrendSummaryData {
    @Schema(description = "오늘 가입자 수", example = "25")
    private Long todaySignup;

    @Schema(description = "이번 달 가입자 수", example = "430")
    private Long monthSignup;

    @Schema(description = "오늘 탈퇴자 수", example = "3")
    private Long todayWithdrawal;

    @Schema(description = "이번 달 탈퇴자 수", example = "58")
    private Long monthWithdrawal;

    public static MemberRegistrationTrendSummaryData of(Long todaySignup, Long monthSignup,
                                                        Long todayWithdrawal, Long monthWithdrawal) {
        MemberRegistrationTrendSummaryData summary = new MemberRegistrationTrendSummaryData();
        summary.todaySignup = todaySignup;
        summary.monthSignup = monthSignup;
        summary.todayWithdrawal = todayWithdrawal;
        summary.monthWithdrawal = monthWithdrawal;
        return summary;
    }
}
