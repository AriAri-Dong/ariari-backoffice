package com.ariari.ariari.domain.admin.dashboard.dto;

import lombok.Data;

import java.util.List;

@Data
public class AllClubRankingBaseData {
    private List<ClubRankingBaseData> allPopularClubRankingBaseData;

    private List<ClubRankingBaseData> allNewClubRankingBaseData;

    private List<ClubRankingBaseData> internalPopularClubRankingBaseData;

    private List<ClubRankingBaseData> internalNewClubRankingBaseData;

    private List<ClubRankingBaseData> externalPopularClubRankingBaseData;

    private List<ClubRankingBaseData> externalNewClubRankingBaseData;
}
