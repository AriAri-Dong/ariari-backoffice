package com.ariari.ariari.domain.admin.dashboard;

import com.ariari.ariari.domain.admin.dashboard.dto.ClubRankingBaseData;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface DashboardMapper {

    Integer countCreatedClubsByDateAndCategory(@Param("date") String date,
                                               @Param("category") String category);

    Integer countCreatedClubsByDateAndRegion(@Param("date") String date,
                                             @Param("region") String region);

    Integer countDeletedClubsByDateAndCategory(@Param("date") String date,
                                               @Param("category") String category);

    Integer countDeletedClubsByDateAndRegion(@Param("date") String date,
                                             @Param("region") String region);

    // Member registration/withdrawal queries
    Integer countMemberSignupByDate(@Param("date") String date);

    Integer countMemberWithdrawalByDate(@Param("date") String date);

    Integer countMemberSignupByMonth(@Param("year") int year, @Param("month") int month);

    Integer countMemberWithdrawalByMonth(@Param("year") int year, @Param("month") int month);

    List<Map<String, Object>> getDailySignupCountByMonth(@Param("year") int year, @Param("month") int month);

    List<Map<String, Object>> getDailyWithdrawalCountByMonth(@Param("year") int year, @Param("month") int month);

    // Club Ranking Data
    List<ClubRankingBaseData> getClubRankingBaseData();

    // 전체 인기 동아리 랭킹 (모든 동아리, 생성일 무관)
    List<ClubRankingBaseData> getAllPopularClubRankingData();

    // 전체 신규 동아리 랭킹 (모든 동아리, 생성한지 14일 이내)
    List<ClubRankingBaseData> getAllNewClubRankingData();

    // 교내 인기 동아리 랭킹 (school_id가 NOT NULL인 동아리, 생성일 무관)
    List<ClubRankingBaseData> getInternalPopularClubRankingData();

    // 교내 신규 동아리 랭킹 (school_id가 NOT NULL인 동아리, 생성한지 14일 이내)
    List<ClubRankingBaseData> getInternalNewClubRankingData();

    // 연합 인기 동아리 랭킹 (school_id가 NULL인 동아리, 생성일 무관)
    List<ClubRankingBaseData> getExternalPopularClubRankingData();

    // 연합 신규 동아리 랭킹 (school_id가 NULL인 동아리, 생성한지 14일 이내)
    List<ClubRankingBaseData> getExternalNewClubRankingData();
}