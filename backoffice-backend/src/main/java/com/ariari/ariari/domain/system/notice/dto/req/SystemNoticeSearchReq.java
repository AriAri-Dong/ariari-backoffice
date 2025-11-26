package com.ariari.ariari.domain.system.notice.dto.req;


import com.ariari.ariari.domain.system.notice.enums.PopStatusType;
import com.ariari.ariari.domain.system.notice.enums.SearchFilterType;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Getter
@Builder
public class SystemNoticeSearchReq {

    @Schema(description = "검색어", example = "공지사항")
    private String search;

    @Schema(description = "검색 필터", example = "TITLE, AUTHOR")
    private SearchFilterType filter;

    @Schema(description = "서비스 공지사항 제목", example = "POSTED")
    private PopStatusType status;

    @Schema(description = "시작일 (YYYY-MM-DD)", example = "2024-03-01")
    private String  startDate;

    @Schema(description = "종료일 (YYYY-MM-DD)", example = "2024-03-01")
    private String endDate;

    @Builder.Default
    private Integer page = 1;

    @Builder.Default
    private Integer pageSize = 10;

}
