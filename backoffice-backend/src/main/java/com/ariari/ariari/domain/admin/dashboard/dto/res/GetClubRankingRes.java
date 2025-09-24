package com.ariari.ariari.domain.admin.dashboard.dto.res;

import com.ariari.ariari.domain.admin.dashboard.dto.AllClubRankingBaseData;
import com.ariari.ariari.domain.admin.dashboard.dto.ClubRankingData;
import com.ariari.ariari.domain.admin.dashboard.dto.ClubRankingListData;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
public class GetClubRankingRes {
    @Schema(description = "", example = "")
    private ClubRankingListData all;

    @Schema(description = "", example = "")
    private ClubRankingListData internal;

    @Schema(description = "", example = "")
    private ClubRankingListData external;

    public static GetClubRankingRes of(AllClubRankingBaseData allClubRankingBaseData){
        GetClubRankingRes res = new GetClubRankingRes();

        if (allClubRankingBaseData == null) {
            return res;
        }

        // 전체 랭킹
        res.all = ClubRankingListData.of(
            allClubRankingBaseData.getAllPopularClubRankingBaseData(),
            allClubRankingBaseData.getAllNewClubRankingBaseData()
        );

        // 교내 랭킹
        res.internal = ClubRankingListData.of(
            allClubRankingBaseData.getInternalPopularClubRankingBaseData(),
            allClubRankingBaseData.getInternalNewClubRankingBaseData()
        );

        // 연합 랭킹
        res.external = ClubRankingListData.of(
            allClubRankingBaseData.getExternalPopularClubRankingBaseData(),
            allClubRankingBaseData.getExternalNewClubRankingBaseData()
        );

        return res;
    }
}
