package com.ariari.ariari.commons.entity.report;

import com.ariari.ariari.commons.entity.report.enums.ReportStatusType;
import com.ariari.ariari.domain.club.Club;
import com.ariari.ariari.domain.member.Member;
import com.ariari.ariari.domain.member.alarm.MemberAlarm;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long>, ReportRepositoryCustom {

    @Query("SELECT r FROM Report as r WHERE r.reportStatusType = :reportStatusType")
    Page<Report> findAllByReportStatusType(@Param("reportStatusType") ReportStatusType reportStatusType, Pageable pageable);

    @Query("select r from Report as r join fetch r.reporter where r.id = :reportId")
    Optional<Report> findWithReporterById(@Param("reportId") Long reportId);

}
