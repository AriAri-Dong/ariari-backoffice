package com.ariari.ariari.commons.entity.report.dto.res;

import com.ariari.ariari.commons.entity.report.Report;
import com.ariari.ariari.commons.entity.report.dto.ResolvedReportData;
import com.ariari.ariari.commons.manager.ReportPageInfo;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Getter
@Setter
@Schema(description = "신고 데이터 리스트")
public class ResolvedReportListRes {

    @Schema(description = "신고 데이터 리스트")
    private List<ResolvedReportData> resolvedReportData;

    @Schema(description = "신고 페이지 정보")
    private ReportPageInfo reportPageInfo;

    private ResolvedReportListRes (List<ResolvedReportData> resolvedReportData, ReportPageInfo reportPageInfo) {
        this.resolvedReportData = resolvedReportData;
        this.reportPageInfo = reportPageInfo;
    }

    public static ResolvedReportListRes fromPage(Page<Report> page){
        List<Report> reports = page.getContent();
        List<ResolvedReportData> resolvedReportDataList = new ArrayList<>();

        for (int i = 0; i < reports.size(); i++) {
            resolvedReportDataList.add(ResolvedReportData.fromEntity(reports.get(i), i + 1)); // 번호 i+1
        }

        if(resolvedReportDataList.isEmpty()){
            return new ResolvedReportListRes (
                    Collections.emptyList(),
                    ReportPageInfo.fromPage(page)
            );
        }
        return new ResolvedReportListRes (resolvedReportDataList, ReportPageInfo.fromPage(page));
    }
}
