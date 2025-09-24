package com.ariari.ariari.domain.admin.dashboard.dto.res;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class GetMemberRetentionRatioRes {
    @Schema(description = "신규 사용자 수", example = "300")
    private Long newUserCount;

    @Schema(description = "기존 사용자 수", example = "700")
    private Long existingUserCount;

    @Schema(description = "신규 사용자 비율", example = "30.00")
    private BigDecimal newUserRatio;

    @Schema(description = "기존 사용자 비율", example = "70.00")
    private BigDecimal existingUserRatio;

    public static GetMemberRetentionRatioRes of(Long newUserCount, Long existingUserCount) {
        GetMemberRetentionRatioRes response = new GetMemberRetentionRatioRes();
        response.newUserCount = newUserCount;
        response.existingUserCount = existingUserCount;
        response.calculateRatios();
        return response;
    }

    private void calculateRatios() {
        Long totalUsers = newUserCount + existingUserCount;
        if (totalUsers > 0) {
            this.newUserRatio = BigDecimal.valueOf(newUserCount)
                    .multiply(BigDecimal.valueOf(100))
                    .divide(BigDecimal.valueOf(totalUsers), 2, BigDecimal.ROUND_HALF_UP);
            this.existingUserRatio = BigDecimal.valueOf(existingUserCount)
                    .multiply(BigDecimal.valueOf(100))
                    .divide(BigDecimal.valueOf(totalUsers), 2, BigDecimal.ROUND_HALF_UP);
        } else {
            this.newUserRatio = BigDecimal.ZERO;
            this.existingUserRatio = BigDecimal.ZERO;
        }
    }
}