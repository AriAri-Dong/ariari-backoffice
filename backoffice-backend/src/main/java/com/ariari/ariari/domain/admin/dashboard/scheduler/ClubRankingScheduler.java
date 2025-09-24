package com.ariari.ariari.domain.admin.dashboard.scheduler;

import com.ariari.ariari.domain.admin.dashboard.DashboardMapper;
import com.ariari.ariari.domain.admin.dashboard.cache.ClubRankingCacheService;
import com.ariari.ariari.domain.admin.dashboard.dto.ClubRankingBaseData;
import com.ariari.ariari.domain.admin.dashboard.dto.ClubRankingData;
import com.ariari.ariari.domain.admin.dashboard.dto.res.GetClubRankingRes;
import com.ariari.ariari.domain.admin.dashboard.manager.ClubRankingManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class ClubRankingScheduler {

    private final DashboardMapper dashboardMapper;
    private final ClubRankingManager clubRankingManager;
    private final ClubRankingCacheService clubRankingCacheService;

    @Scheduled(cron = "0 0 * * * *") // 매시간 정각에 실행
    public void updateClubRanking() {
        log.info("동아리 랭킹 업데이트 시작");

        try {
            List<ClubRankingBaseData> allPopularClubRankingBaseDataList = clubRankingManager.calculateAllPopularRanking();
            List<ClubRankingBaseData> allPopularTop10ClubList = clubRankingManager.findTopRankingClub(allPopularClubRankingBaseDataList);

            List<ClubRankingBaseData> allNewClubRankingBaseDataList = clubRankingManager.calculateAllNewRanking();
            List<ClubRankingBaseData> allNewTop10ClubList = clubRankingManager.findTopRankingClub(allNewClubRankingBaseDataList);

            List<ClubRankingBaseData> internalPopularClubRankingBaseDataList = clubRankingManager.calculateInternalPopularRanking();
            List<ClubRankingBaseData> internalPopularTop10ClubList = clubRankingManager.findTopRankingClub(internalPopularClubRankingBaseDataList);

            List<ClubRankingBaseData> internalNewClubRankingBaseDataList = clubRankingManager.calculateInternalNewRanking();
            List<ClubRankingBaseData> internalNewTop10ClubList = clubRankingManager.findTopRankingClub(internalNewClubRankingBaseDataList);

            List<ClubRankingBaseData> externalPopularClubRankingBaseDataList = clubRankingManager.calculateExternalPopularRanking();
            List<ClubRankingBaseData> externalPopularTop10ClubList = clubRankingManager.findTopRankingClub(externalPopularClubRankingBaseDataList);

            List<ClubRankingBaseData> externalNewClubRankingBaseDataList = clubRankingManager.calculateExternalNewRanking();
            List<ClubRankingBaseData> externalNewTop10ClubList = clubRankingManager.findTopRankingClub(externalNewClubRankingBaseDataList);

            clubRankingCacheService.saveClubRanking(allPopularTop10ClubList, allNewTop10ClubList, internalPopularTop10ClubList,
                    internalNewTop10ClubList, externalPopularTop10ClubList, externalNewTop10ClubList);
            log.info("동아리 랭킹 업데이트 완료 - TOP 10 저장됨");
        } catch (Exception e) {
            log.error("동아리 랭킹 업데이트 실패", e);
        }
    }

    public void updateClubRankingManually() {
        log.info("수동 동아리 랭킹 업데이트 시작");
        updateClubRanking();
    }
}