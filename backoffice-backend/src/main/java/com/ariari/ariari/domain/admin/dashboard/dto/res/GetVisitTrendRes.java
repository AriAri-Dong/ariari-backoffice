package com.ariari.ariari.domain.admin.dashboard.dto.res;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
public class GetVisitTrendRes {
    @Schema(description = "시간/날짜 라벨", example = "[\"0\", \"1\", \"2\"]")
    private List<String> labels;

    @Schema(description = "방문자 수", example = "[10, 15, 8]")
    private List<Long> values;

    public static GetVisitTrendRes forHourlyData(String range, LocalDate baseDate, Map<Integer, Long> hourlyVisits) {
        GetVisitTrendRes response = new GetVisitTrendRes();
        response.labels = new ArrayList<>();
        response.values = new ArrayList<>();

        for (int hour = 0; hour < 24; hour++) {
            response.labels.add(String.valueOf(hour));
            response.values.add(hourlyVisits.getOrDefault(hour, 0L));
        }
        return response;
    }

    public static GetVisitTrendRes forDailyData(String range, LocalDate baseDate, Map<LocalDate, Long> dailyVisits) {
        GetVisitTrendRes response = new GetVisitTrendRes();
        response.labels = new ArrayList<>();
        response.values = new ArrayList<>();

        int days = range.equals("week") ? 7 : 30;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM.dd");

        for (int i = days - 1; i >= 0; i--) {
            LocalDate targetDate = baseDate.minusDays(i);
            response.labels.add(targetDate.format(formatter));
            response.values.add(dailyVisits.getOrDefault(targetDate, 0L));
        }
        return response;
    }
}
