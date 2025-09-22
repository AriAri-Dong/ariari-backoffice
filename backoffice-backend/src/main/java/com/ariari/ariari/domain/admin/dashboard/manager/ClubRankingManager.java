package com.ariari.ariari.domain.admin.dashboard.manager;

import com.ariari.ariari.domain.admin.dashboard.DashboardMapper;
import com.ariari.ariari.domain.admin.dashboard.dto.ClubRankingBaseData;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;
import java.util.stream.IntStream;

import static com.ariari.ariari.domain.admin.dashboard.dto.ClubRankingBaseData.initData;
import static com.ariari.ariari.domain.admin.dashboard.dto.ClubRankingBaseData.regularizeData;

@Component
@RequiredArgsConstructor
public class ClubRankingManager {
    private final DashboardMapper dashboardMapper;

    public List<ClubRankingBaseData> calculateAllPopularRanking() {
        List<ClubRankingBaseData> clubRankingBaseDataList = dashboardMapper.getAllPopularClubRankingData();
        initData(clubRankingBaseDataList);
        regularizeData(clubRankingBaseDataList);
        return clubRankingBaseDataList;
    }

    public List<ClubRankingBaseData> calculateAllNewRanking() {
        List<ClubRankingBaseData> clubRankingBaseDataList = dashboardMapper.getAllNewClubRankingData();
        initData(clubRankingBaseDataList);
        regularizeData(clubRankingBaseDataList);
        return clubRankingBaseDataList;
    }

    public List<ClubRankingBaseData> calculateInternalPopularRanking() {
        List<ClubRankingBaseData> clubRankingBaseDataList = dashboardMapper.getInternalPopularClubRankingData();
        initData(clubRankingBaseDataList);
        regularizeData(clubRankingBaseDataList);
        return clubRankingBaseDataList;
    }

    public List<ClubRankingBaseData> calculateInternalNewRanking() {
        List<ClubRankingBaseData> clubRankingBaseDataList = dashboardMapper.getInternalNewClubRankingData();
        initData(clubRankingBaseDataList);
        regularizeData(clubRankingBaseDataList);
        return clubRankingBaseDataList;
    }

    public List<ClubRankingBaseData> calculateExternalPopularRanking() {
        List<ClubRankingBaseData> clubRankingBaseDataList = dashboardMapper.getExternalPopularClubRankingData();
        initData(clubRankingBaseDataList);
        regularizeData(clubRankingBaseDataList);
        return clubRankingBaseDataList;
    }

    public List<ClubRankingBaseData> calculateExternalNewRanking() {
        List<ClubRankingBaseData> clubRankingBaseDataList = dashboardMapper.getExternalNewClubRankingData();
        initData(clubRankingBaseDataList);
        regularizeData(clubRankingBaseDataList);
        return clubRankingBaseDataList;
    }

    public List<ClubRankingBaseData> findTopRankingClub(List<ClubRankingBaseData> clubRankingBaseDataList) {
        List<ClubRankingBaseData> top10Clubs = clubRankingBaseDataList.stream()
                .sorted(Comparator.comparing(ClubRankingBaseData::getRegularizedScore).reversed())
                .limit(10)
                .toList();

        IntStream.range(0, top10Clubs.size())
                .forEach(i -> top10Clubs.get(i).setClubRanking(i + 1));

        return top10Clubs;
    }

}
