package com.ariari.ariari.domain.admin.dashboard.strategy;

import com.ariari.ariari.domain.admin.dashboard.dto.res.GetVisitTrendRes;

import java.time.LocalDate;

public interface VisitTrendStrategy {
    GetVisitTrendRes execute(LocalDate baseDate);
    String getRange();
}