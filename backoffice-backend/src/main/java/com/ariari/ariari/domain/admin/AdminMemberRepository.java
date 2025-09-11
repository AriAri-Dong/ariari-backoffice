package com.ariari.ariari.domain.admin;

import com.ariari.ariari.commons.entity.AdminMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminMemberRepository extends JpaRepository<AdminMember, Long> {

    Optional<AdminMember> findByUsername(String username);

}
