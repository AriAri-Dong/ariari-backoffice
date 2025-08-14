package com.ariari.ariari.commons.entity.report.dto.req;

import com.ariari.ariari.commons.entity.report.enums.LocationType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class SearchReq {

    @Schema(description = "검색필터", example = "title" )
    private String filterType;

    @Schema(description = "검색내용", example = "삭제" )
    private String keyword;

    @Schema(description = "신고위치", example = "CLUB_RECRUIT" )
    private LocationType locationType;

    @Schema(description = "시작날짜", example = "2025-01-01" )
    private LocalDate startDate;

    @Schema(description = "끝날짜", example = "2025-01-01" )
    private LocalDate endDate;


}
