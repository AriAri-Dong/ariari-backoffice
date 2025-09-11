package com.ariari.ariari.domain.recruitment.report;

import com.ariari.ariari.commons.entity.Member;
import com.ariari.ariari.commons.entity.Recruitment;
import com.ariari.ariari.commons.entity.RecruitmentReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruitmentReportRepository extends JpaRepository<RecruitmentReport,Long> {

    boolean existsByReporterAndReportedRecruitment(Member reporter, Recruitment reportedRecruitment);
}
