package com.ariari.ariari.commons.manager;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;


@Getter
@Setter
@Schema(description = "신고 페이지네이션 정보")
public class ReportPageInfo {

    @Schema(description = "데이터 크기", example = "10")
    private Integer contentSize;

    @Schema(description = "전체 데이터 크기", example = "25")
    private Integer totalSize;

    @Schema(description = "전체 페이지 수", example = "3")
    private Integer totalPages;

    @Schema(description = "마지막 페이지 여부", example = "false")
    private Boolean isLast;

    @Builder
    private ReportPageInfo(Integer contentSize, Integer totalSize, Integer totalPages, Boolean isLast) {
        this.contentSize = contentSize;
        this.totalSize = totalSize;
        this.totalPages = totalPages;
        this.isLast = isLast;
    }

    public static ReportPageInfo fromPage(Page<?> page) {
        return ReportPageInfo.builder()
                .contentSize(page.getNumberOfElements())
                .totalSize((int) page.getTotalElements())
                .totalPages(page.getTotalPages())
                .isLast(page.isLast())
                .build();
    }
}
