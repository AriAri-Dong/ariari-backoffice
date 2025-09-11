package com.ariari.ariari.domain.member.report;

import com.ariari.ariari.commons.entity.Member;
import com.ariari.ariari.commons.entity.MemberReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberReportRepository extends JpaRepository<MemberReport, Long> {


    boolean existsByReporterAndReportedMember(Member reporter,Member reportedMember );

}
