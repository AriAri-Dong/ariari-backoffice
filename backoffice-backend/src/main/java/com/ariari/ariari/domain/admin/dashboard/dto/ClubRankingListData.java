package com.ariari.ariari.domain.admin.dashboard.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
public class ClubRankingListData {
    @Schema(description = "", example = "")
    private List<ClubRankingData> popular;

    @Schema(description = "", example = "")
    private List<ClubRankingData> latest;

    public static ClubRankingListData of(List<ClubRankingBaseData> popularList, List<ClubRankingBaseData> latestList) {
        ClubRankingListData data = new ClubRankingListData();
        data.popular = popularList != null ?
            popularList.stream().limit(5).map(ClubRankingData::from).toList() : List.of();
        data.latest = latestList != null ?
            latestList.stream().limit(5).map(ClubRankingData::from).toList() : List.of();
        return data;
    }
}
