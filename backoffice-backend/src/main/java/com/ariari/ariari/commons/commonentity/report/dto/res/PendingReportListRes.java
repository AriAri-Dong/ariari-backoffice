package com.ariari.ariari.commons.commonentity.report.dto.res;

import com.ariari.ariari.commons.commonentity.report.Report;
import com.ariari.ariari.commons.commonentity.report.dto.ReportData;
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
public class PendingReportListRes  {

    @Schema(description = "신고 데이터 리스트")
    private List<ReportData> reportDataList;

    @Schema(description = "신고 페이지 정보")
    private ReportPageInfo reportPageInfo;

    private PendingReportListRes (List<ReportData> reportDataList, ReportPageInfo reportPageInfo) {
        this.reportDataList = reportDataList;
        this.reportPageInfo = reportPageInfo;
    }

    public static PendingReportListRes fromPage(Page<Report> page){
        List<Report> reports = page.getContent();
        List<ReportData> reportDataList = new ArrayList<>();

        for (int i = 0; i < reports.size(); i++) {
            reportDataList.add(ReportData.fromEntity(reports.get(i), i + 1)); // 번호 i+1
        }

        if(reportDataList.isEmpty()){
            return new PendingReportListRes (
                    Collections.emptyList(),
                    ReportPageInfo.fromPage(page)
            );
        }

        return new PendingReportListRes (reportDataList, ReportPageInfo.fromPage(page));
    }

}
