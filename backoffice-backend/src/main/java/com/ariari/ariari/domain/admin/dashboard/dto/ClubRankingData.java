package com.ariari.ariari.domain.admin.dashboard.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
public class ClubRankingData {
    @Schema(description = "동아리 ID", example = "1")
    private Long clubId;

    @Schema(description = "동아리명", example = "동아리 A")
    private String name;

    @Schema(description = "비율", example = "0.85")
    private Double rate;

    public static ClubRankingData from(ClubRankingBaseData baseData) {
        ClubRankingData data = new ClubRankingData();
        data.clubId = baseData.getClubId();
        data.name = baseData.getClubName();
        data.rate = baseData.getRegularizedScore();
        return data;
    }
}
