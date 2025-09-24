package com.ariari.ariari.domain.admin.dashboard.dto.res;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Data
public class GetClubStatisticsRes {
    @Schema(description = "라벨", example = "[\"분야\", \"지역\"]")
    private List<String> labels;

    @Schema(description = "생성된 동아리 수", example = "")
    private List<Integer> createdCount;

    @Schema(description = "삭제된 동아리 수", example = "")
    private List<Integer> deletedCount;

    public static GetClubStatisticsRes of(Integer createdByCategory, Integer createdByRegion,
                                           Integer deletedByCategory, Integer deletedByRegion) {
        GetClubStatisticsRes response = new GetClubStatisticsRes();
        response.labels = Arrays.asList("분야", "지역");
        response.createdCount = Arrays.asList(createdByCategory, createdByRegion);
        response.deletedCount = Arrays.asList(deletedByCategory, deletedByRegion);
        return response;
    }
}
