package com.ariari.ariari.commons.auth;

import com.ariari.ariari.domain.admin.AdminMember;
import com.ariari.ariari.domain.admin.AdminMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.transaction.annotation.Propagation.REQUIRES_NEW;


@Service
@RequiredArgsConstructor
public class AuthFailService {

    private final AdminMemberRepository adminMemberRepository;

    @EventListener
    @Transactional(propagation = REQUIRES_NEW)
    public void handle(Long adminMemberId) {

        AdminMember adminMember =  adminMemberRepository.findById(adminMemberId)
                .orElseThrow(() -> new UsernameNotFoundException("사용자 없습니다."));
        adminMember.countPlus();

        if(adminMember.getLoginFailCount() >= 5) adminMember.lock();
        adminMemberRepository.save(adminMember);
    }
}
