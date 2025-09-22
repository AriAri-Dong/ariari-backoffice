package com.ariari.ariari.domain.admin.dashboard;

import com.ariari.ariari.domain.admin.dashboard.cache.ClubRankingCacheService;
import com.ariari.ariari.domain.admin.dashboard.dto.AllClubRankingBaseData;
import com.ariari.ariari.domain.admin.dashboard.dto.res.*;
import com.ariari.ariari.domain.admin.dashboard.dto.MemberRegistrationTrendChartData;
import com.ariari.ariari.domain.admin.dashboard.dto.MemberRegistrationTrendSummaryData;
import com.ariari.ariari.domain.admin.dashboard.strategy.VisitTrendStrategyFactory;
import com.ariari.ariari.domain.member.member.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class DashboardService {

    private final MemberRepository memberRepository;
    private final VisitTrendStrategyFactory visitTrendStrategyFactory;
    private final DashboardMapper dashboardMapper;
    private final ClubRankingCacheService clubRankingCacheService;

    public GetMemberRetentionRatioRes getMemberRetentionRatio() {
        LocalDateTime oneYearAgo = LocalDateTime.now().minusYears(1);

        Long newUserCount = memberRepository.countByCreatedDateTimeAfter(oneYearAgo);
        Long existingUserCount = memberRepository.countByCreatedDateTimeBefore(oneYearAgo);

        return GetMemberRetentionRatioRes.of(newUserCount, existingUserCount);
    }

    public GetVisitTrendRes getVisitTrend(String date, String range) {
        LocalDate baseDate = LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        return visitTrendStrategyFactory.getStrategy(range).execute(baseDate);
    }

    public GetClubRankingRes getClubRanking() {
        AllClubRankingBaseData allClubRankingBaseData = clubRankingCacheService.getAllClubRanking();
        return GetClubRankingRes.of(allClubRankingBaseData);
    }

    public GetClubStatisticsRes getClubStatistics(String date, String category, String region) {
        Integer createdByCategory = dashboardMapper.countCreatedClubsByDateAndCategory(date, category);
        Integer createdByRegion = dashboardMapper.countCreatedClubsByDateAndRegion(date, region);
        Integer deletedByCategory = dashboardMapper.countDeletedClubsByDateAndCategory(date, category);
        Integer deletedByRegion = dashboardMapper.countDeletedClubsByDateAndRegion(date, region);

        return GetClubStatisticsRes.of(createdByCategory, createdByRegion, deletedByCategory, deletedByRegion);
    }

    public GetMemberRegistrationTrendRes getMemberRegistrationTrend(String date) {
        // 입력된 날짜(예: "2024-09-17")를 파싱하여 해당 월 정보 추출
        LocalDate targetDate = LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        YearMonth targetMonth = YearMonth.from(targetDate);
        int targetDay = targetDate.getDayOfMonth(); // 17일

        // 해당 월 전체 기간 설정 (9월 1일~30일)
        LocalDateTime monthStart = targetMonth.atDay(1).atStartOfDay();
        LocalDateTime monthEnd = targetMonth.atEndOfMonth().atTime(23, 59, 59);

        // DB 호출 2번으로 해당 월 전체 데이터 조회
        List<Object[]> signupResults = memberRepository.getDailySignupCountByDateRange(monthStart, monthEnd);
        List<Object[]> withdrawalResults = memberRepository.getDailyWithdrawalCountByDateRange(monthStart, monthEnd);

        // Object[] → Map 변환: [2024-09-01, 10] → {1: 10}
        Map<Integer, Long> dailySignups = new HashMap<>();
        Map<Integer, Long> dailyWithdrawals = new HashMap<>();

        for (Object[] result : signupResults) {
            LocalDate date1 = (LocalDate) result[0];
            Long count = (Long) result[1];
            dailySignups.put(date1.getDayOfMonth(), count);
        }

        for (Object[] result : withdrawalResults) {
            LocalDate date1 = (LocalDate) result[0];
            Long count = (Long) result[1];
            dailyWithdrawals.put(date1.getDayOfMonth(), count);
        }

        // Summary 데이터 계산 (이미 조회한 Map에서 데이터 조립)
        Long todaySignup = dailySignups.getOrDefault(targetDay, 0L);      // 17일 가입자
        Long todayWithdrawal = dailyWithdrawals.getOrDefault(targetDay, 0L); // 17일 탈퇴자
        Long monthSignup = dailySignups.values().stream().mapToLong(Long::longValue).sum();      // 9월 전체 가입자
        Long monthWithdrawal = dailyWithdrawals.values().stream().mapToLong(Long::longValue).sum(); // 9월 전체 탈퇴자

        MemberRegistrationTrendSummaryData summary = MemberRegistrationTrendSummaryData.of(
                todaySignup, monthSignup, todayWithdrawal, monthWithdrawal);

        // Chart 데이터는 이미 조회한 Map 그대로 사용
        MemberRegistrationTrendChartData chart = MemberRegistrationTrendChartData.of(
                targetMonth, dailySignups, dailyWithdrawals);

        return GetMemberRegistrationTrendRes.of(summary, chart);
    }
}
