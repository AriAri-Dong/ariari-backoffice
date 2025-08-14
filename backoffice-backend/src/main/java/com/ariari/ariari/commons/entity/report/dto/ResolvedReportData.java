package com.ariari.ariari.commons.entity.report.dto;

import com.ariari.ariari.commons.entity.report.Report;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Getter
@Setter
@SuperBuilder
public class ResolvedReportData extends ReportData {

    private String resolveBody;

    private LocalDateTime resolvedDate;

    public static ResolvedReportData fromEntity(Report report, int number) {
        return ResolvedReportData.builder()
                .id(report.getId())
                .title(report.getReportType().toString())
                .body(report.getBody())
                .reporter(report.getReporter().getNickName())
                .number(number)
                .location(report.getClass().getSimpleName())
                .locationUrl(report.getLocationUrl())
                .reportDate(report.getCreatedDateTime())
                .resolveBody(report.getResolveBody())
                .resolvedDate(report.getResolvedDate())
                .build();
    }

}
