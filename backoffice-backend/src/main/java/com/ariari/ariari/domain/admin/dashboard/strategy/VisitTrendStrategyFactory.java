package com.ariari.ariari.domain.admin.dashboard.strategy;

import com.ariari.ariari.commons.exception.exceptions.IllegalRangeException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class VisitTrendStrategyFactory {

    private final List<VisitTrendStrategy> strategies;

    public VisitTrendStrategy getStrategy(String range) {
        Map<String, VisitTrendStrategy> strategyMap = strategies.stream()
                .collect(Collectors.toMap(VisitTrendStrategy::getRange, Function.identity()));

        VisitTrendStrategy strategy = strategyMap.get(range);
        if (strategy == null) {
            throw new IllegalRangeException();
        }
        return strategy;
    }
}