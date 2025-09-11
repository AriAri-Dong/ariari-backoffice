package com.ariari.ariari.domain.club.review.report;

import com.ariari.ariari.commons.entity.ClubReview;
import com.ariari.ariari.commons.entity.ClubReviewReport;
import com.ariari.ariari.commons.entity.Member;
import com.ariari.ariari.commons.entity.Recruitment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClubReviewReportRepository extends JpaRepository<ClubReviewReport, Long> {

    boolean existsByReporterAndReportedClubReview(Member reporter, ClubReview reportedClubReview);

}
