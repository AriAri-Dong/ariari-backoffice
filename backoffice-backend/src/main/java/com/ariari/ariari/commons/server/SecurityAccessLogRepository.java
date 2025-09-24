package com.ariari.ariari.commons.server;

import com.ariari.ariari.commons.entity.SecurityAccessLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface SecurityAccessLogRepository extends JpaRepository<SecurityAccessLog, Long> {

    @Query("SELECT HOUR(s.createdDateTime) as hour, COUNT(DISTINCT s.ipAddress) as visitCount " +
           "FROM SecurityAccessLog s " +
           "WHERE DATE(s.createdDateTime) = DATE(:targetDate) " +
           "GROUP BY HOUR(s.createdDateTime)")
    List<Object[]> findHourlyVisitsByDate(@Param("targetDate") LocalDateTime targetDate);

    @Query("SELECT DATE(s.createdDateTime) as date, COUNT(DISTINCT s.ipAddress) as visitCount " +
           "FROM SecurityAccessLog s " +
           "WHERE s.createdDateTime BETWEEN :startDate AND :endDate " +
           "GROUP BY DATE(s.createdDateTime)")
    List<Object[]> findDailyVisitsBetweenDates(@Param("startDate") LocalDateTime startDate,
                                               @Param("endDate") LocalDateTime endDate);
}
