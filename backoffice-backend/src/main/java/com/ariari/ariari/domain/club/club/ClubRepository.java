package com.ariari.ariari.domain.club.club;

import com.ariari.ariari.commons.entity.Club;
import com.ariari.ariari.commons.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClubRepository extends JpaRepository<Club, Long> {

}
