package com.ariari.ariari.domain.admin.dashboard;

import com.ariari.ariari.commons.exception.exceptions.IllegalRangeException;
import com.ariari.ariari.domain.admin.dashboard.dto.res.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping("/member/retention-ratio")
    public GetMemberRetentionRatioRes getMemberRetentionRatio(){
        return dashboardService.getMemberRetentionRatio();
    }

    @GetMapping("/visit/trend")
    public GetVisitTrendRes getVisitTrend(@RequestParam(required = true) String date,
                                          @RequestParam(required = true) String range){
        if(!range.matches("^(today|yesterday|week|month)$")){
            throw new IllegalRangeException();
        }
        return dashboardService.getVisitTrend(date,range);
    }

    @GetMapping("/club/ranking")
    public GetClubRankingRes getClubRanking(){
        return dashboardService.getClubRanking();
    }

    @GetMapping("/club/statistics")
    public GetClubStatisticsRes getClubStatistics(@RequestParam(required = true) String date,
                                                  @RequestParam(required = true) String category,
                                                  @RequestParam(required = true) String region){
        if(!region.matches("^(All|CULTURE|VOLUNTEER|STUDY|STARTUP|EMPLOYMENT|SPORTS|AMITY|ETC)$")){
            throw new IllegalRangeException();
        }
        if(!category.matches("^(All|SEOUL_GYEONGGI|CHUNGCHEONG|GYEONGNAM|GYEONGBUK|JEONNAM|JEONBUK|GANGWON|JEJU|FOREIGN)$")){
            throw new IllegalRangeException();
        }
        return dashboardService.getClubStatistics(date,category,region);
    }

    @GetMapping("/member/registration-trend")
    public GetMemberRegistrationTrendRes getMemberRegistrationTrend(@RequestParam(required = true) String date){
        // date형식 검사
        return dashboardService.getMemberRegistrationTrend(date);
    }


}
