package com.ariari.ariari.commons.entity.report;

import com.ariari.ariari.commons.entity.report.dto.req.SearchReq;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ReportRepositoryCustom {

    Page<Report> searchReports(SearchReq searchReq, Pageable pageable);
}
