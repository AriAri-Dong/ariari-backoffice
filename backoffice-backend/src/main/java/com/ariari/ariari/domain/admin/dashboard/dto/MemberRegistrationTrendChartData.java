package com.ariari.ariari.domain.admin.dashboard.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
public class MemberRegistrationTrendChartData {
    @Schema(description = "날짜 라벨", example = "[\"1\", \"2\", \"3\"]")
    private List<String> labels;

    @Schema(description = "일별 가입자 수", example = "[10, 15, 8]")
    private List<Long> signup;

    @Schema(description = "일별 탈퇴자 수", example = "[2, 1, 3]")
    private List<Long> withdrawal;

    public static MemberRegistrationTrendChartData of(YearMonth targetMonth,
                                                      Map<Integer, Long> dailySignups,
                                                      Map<Integer, Long> dailyWithdrawals) {
        MemberRegistrationTrendChartData chart = new MemberRegistrationTrendChartData();
        chart.labels = new ArrayList<>();
        chart.signup = new ArrayList<>();
        chart.withdrawal = new ArrayList<>();

        int daysInMonth = targetMonth.lengthOfMonth();
        for (int day = 1; day <= daysInMonth; day++) {
            chart.labels.add(String.valueOf(day));
            chart.signup.add(dailySignups.getOrDefault(day, 0L));
            chart.withdrawal.add(dailyWithdrawals.getOrDefault(day, 0L));
        }

        return chart;
    }
}
