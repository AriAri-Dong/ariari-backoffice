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
public class YesterdayVisitTrendStrategy implements VisitTrendStrategy {

    private final SecurityAccessLogRepository securityAccessLogRepository;

    @Override
    public GetVisitTrendRes execute(LocalDate baseDate) {
        LocalDate yesterdayDate = baseDate.minusDays(1);
        LocalDateTime targetDateTime = yesterdayDate.atStartOfDay();
        List<Object[]> results = securityAccessLogRepository.findHourlyVisitsByDate(targetDateTime);

        Map<Integer, Long> hourlyVisits = new HashMap<>();
        for (Object[] result : results) {
            Integer hour = (Integer) result[0];
            Long visitCount = (Long) result[1];
            hourlyVisits.put(hour, visitCount);
        }

        return GetVisitTrendRes.forHourlyData("hourly", yesterdayDate, hourlyVisits);
    }

    @Override
    public String getRange() {
        return "yesterday";
    }
}