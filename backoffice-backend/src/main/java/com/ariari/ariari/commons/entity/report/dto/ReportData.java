package com.ariari.ariari.commons.entity.report.dto;

import com.ariari.ariari.commons.entity.report.Report;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
@Schema(description = "신고 데이터")
public class ReportData {

    @JsonSerialize(using = ToStringSerializer.class)
    @Schema(description = "신고 id", example = "673012345142938986")
    private Long id;

    @JsonSerialize(using = ToStringSerializer.class)
    @Schema(description = "신고 번호", example = "100")
    private int number;

    @Schema(description = "신고 날짜", example = "2025-01-31T09:08:18.467Z")
    private LocalDateTime reportDate;

    @Schema(description = "신고 사유", example = "  SPAM_ADVERTISEMENT")
    private String title;

    @Schema(description = "신고 상세 내용", example = "불쾌감 조성하는 사진 올라와요")
    private String body;

    @Schema(description = "신고 위치", example = "활동후기")
    private String location;

    @Schema(description = "신고 위치 url", example = "/report/all")
    private String locationUrl;

    @Schema(description = "신고자", example = "홍길동")
    private String reporter;


    public static ReportData fromEntity(Report report, int number) {
        return ReportData.builder()
                .id(report.getId())
                .title(report.getReportType().toString())
                .body(report.getBody())
                .reporter(report.getReporter().getNickName())
                .number(number)
                .location(report.getClass().getSimpleName())
                .locationUrl(report.getLocationUrl())
                .reportDate(report.getCreatedDateTime())
                .build();
    }

}

