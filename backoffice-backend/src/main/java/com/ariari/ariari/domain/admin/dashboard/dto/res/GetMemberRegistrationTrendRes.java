package com.ariari.ariari.domain.admin.dashboard.dto.res;

import com.ariari.ariari.domain.admin.dashboard.dto.MemberRegistrationTrendChartData;
import com.ariari.ariari.domain.admin.dashboard.dto.MemberRegistrationTrendSummaryData;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class GetMemberRegistrationTrendRes {
    @Schema(description = "요약 데이터")
    private MemberRegistrationTrendSummaryData summary;

    @Schema(description = "차트 데이터")
    private MemberRegistrationTrendChartData chart;

    public static GetMemberRegistrationTrendRes of(MemberRegistrationTrendSummaryData summary,
                                                   MemberRegistrationTrendChartData chart) {
        GetMemberRegistrationTrendRes response = new GetMemberRegistrationTrendRes();
        response.summary = summary;
        response.chart = chart;
        return response;
    }
}
