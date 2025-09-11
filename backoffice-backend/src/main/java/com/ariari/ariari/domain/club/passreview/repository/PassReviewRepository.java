package com.ariari.ariari.domain.club.passreview.repository;

import com.ariari.ariari.commons.entity.Club;
import com.ariari.ariari.commons.entity.Member;
import com.ariari.ariari.commons.entity.PassReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PassReviewRepository extends JpaRepository<PassReview, Long> {
    boolean existsByClubAndMember(Club club, Member member);
}
