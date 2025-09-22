package com.ariari.ariari.domain.admin.dashboard.strategy;

import com.ariari.ariari.commons.server.SecurityAccessLogRepository;
import com.ariari.ariari.domain.admin.dashboard.dto.res.GetVisitTrendRes;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class MonthVisitTrendStrategy implements VisitTrendStrategy {

    private final SecurityAccessLogRepository securityAccessLogRepository;

    @Override
    public GetVisitTrendRes execute(LocalDate baseDate) {
        LocalDateTime startDate = baseDate.minusDays(29).atStartOfDay();
        LocalDateTime endDate = baseDate.atTime(23, 59, 59);

        List<Object[]> results = securityAccessLogRepository.findDailyVisitsBetweenDates(startDate, endDate);

        Map<LocalDate, Long> dailyVisits = new HashMap<>();
        for (Object[] result : results) {
            LocalDate date = ((java.sql.Date) result[0]).toLocalDate();
            Long visitCount = (Long) result[1];
            dailyVisits.put(date, visitCount);
        }

        return GetVisitTrendRes.forDailyData("month", baseDate, dailyVisits);
    }

    @Override
    public String getRange() {
        return "month";
    }
}