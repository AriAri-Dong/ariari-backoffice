package com.ariari.ariari.commons.manager;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

public class SystemManager {

    public static Map<String, LocalDateTime> formatter(LocalDate start, LocalDate end) {
        Map<String, LocalDateTime> map = new HashMap<>();
        if (start != null) {
            map.put("startDate", start.atStartOfDay());
        }
        if (end != null) {
            map.put("endDate", end.atTime(23, 59, 59));
        }
        return map;
    }

    // start만 변환
    public static LocalDateTime toStartDateTime(LocalDate start) {
        return start == null ? null : start.atStartOfDay();
    }

    // end만 변환
    public static LocalDateTime toEndDateTime(LocalDate end) {
        return end == null ? null : end.atTime(23, 59, 59);
    }

}
