package com.ariari.ariari.commons.auth.springsecurity;

import com.ariari.ariari.commons.exception.exceptions.NotFoundEntityException;
import com.ariari.ariari.commons.entity.AdminMember;
import com.ariari.ariari.domain.admin.AdminMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;


@Service
@Transactional
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final AdminMemberRepository adminMemberRepository;

    @Override
    public CustomUserDetails loadUserByUsername(String adminId) throws UsernameNotFoundException {

        AdminMember admin = adminMemberRepository.findById(Long.valueOf(adminId))
                .orElseThrow(NotFoundEntityException::new);

        Set<GrantedAuthority> authorities = Set.of(
                new SimpleGrantedAuthority(admin.getAdminRoleType().name())
        );

        return new CustomUserDetails(
                admin.getId(),
                admin.getUsername(),
                admin.getPassword(),
                authorities
        );
    }

}