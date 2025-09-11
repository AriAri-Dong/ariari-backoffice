package com.ariari.ariari.domain.club.question;

import com.ariari.ariari.commons.entity.Club;
import com.ariari.ariari.commons.entity.ClubQuestion;
import com.ariari.ariari.commons.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClubQuestionRepository extends JpaRepository<ClubQuestion, Long> {

    Page<ClubQuestion> findByClub(Club club, Pageable pageable);

    List<ClubQuestion> findByMember(Member member);

}
