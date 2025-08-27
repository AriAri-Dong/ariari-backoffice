package com.ariari.ariari.commons.auth;

import com.ariari.ariari.commons.auth.dto.AccessTokenRes;
import com.ariari.ariari.commons.auth.dto.JwtTokenRes;
import com.ariari.ariari.commons.auth.dto.LoginReq;
import com.ariari.ariari.commons.auth.dto.LogoutReq;
import com.ariari.ariari.commons.auth.nickname.NicknameCreator;
import com.ariari.ariari.commons.auth.oauth.KakaoAuthManager;
import com.ariari.ariari.commons.exception.exceptions.NotFoundEntityException;
import com.ariari.ariari.commons.manager.JwtControlManager;
import com.ariari.ariari.commons.manager.JwtManager;
import com.ariari.ariari.commons.manager.LoginFailEventManger;
import com.ariari.ariari.domain.admin.AdminMember;
import com.ariari.ariari.domain.admin.AdminMemberRepository;
import com.ariari.ariari.domain.member.Member;
import com.ariari.ariari.domain.member.member.MemberRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;
import java.util.Set;

import static com.ariari.ariari.commons.manager.JwtManager.TokenType.*;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {

    private final JwtManager jwtManager;
    private final JwtControlManager jwtControlManager;
    private final AdminMemberRepository adminMemberRepository;
    private final PasswordEncoder passwordEncoder;
    private final LoginFailEventManger loginFailEventManger;


    public JwtTokenRes login(LoginReq req, HttpServletResponse response) {
        AdminMember adminMember = adminMemberRepository.findByUsername(req.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("사용자 없습니다."));

        // 비활성화 체크
        if (!adminMember.isEnabled()) {
            throw new DisabledException("계정이 비활성화 상태입니다.");
        }

        // 잠금 상태 확인
        if (adminMember.isCurrentlyLocked()) {
            throw new LockedException("계정이 잠겼습니다. 30분 후에 다시 시도하세요.");
        }

        // 비밀번호 검증
        if (!passwordEncoder.matches(req.getPassword(), adminMember.getPassword())) {
            if(!adminMember.isLocked()){
                loginFailEventManger.lock(adminMember.getId());// 현재 트랜잭션 롤백되어도 실패 기록은 남음
            }
            throw new BadCredentialsException("비밀번호 불일치");
        }


        // 로그인 성공처리
        adminMember.onLoginSuccess();

        Set<GrantedAuthority> authorities = Set.of(
                new SimpleGrantedAuthority(adminMember.getAdminRoleType().name())
        );

        String accessToken = jwtManager.generateToken(authorities, adminMember.getId(), ACCESS_TOKEN);
        String refreshToken = jwtManager.generateToken(authorities, adminMember.getId(), REFRESH_TOKEN);

        adminMember.updateLastLoginDateTime();
        response.addCookie(buildRefreshTokenCookie(refreshToken, 180_000));
        return JwtTokenRes.createRes(accessToken);
    }


    public void logout(String accessToken, String refreshToken, HttpServletResponse response) {

        Date accessExpiration = jwtManager.getExpiration(accessToken);
        Date refreshExpiration = jwtManager.getExpiration(refreshToken);

        jwtControlManager.banToken(accessToken, accessExpiration);
        jwtControlManager.banToken(refreshToken, refreshExpiration);

        response.addCookie(buildRefreshTokenCookie(null, 0));
    }

    public AccessTokenRes reissueAccessToken(String refreshToken) {
        jwtManager.validateRefresh(refreshToken);

        Long reqMemberId = jwtManager.getMemberId(refreshToken);
        AdminMember adminMember = adminMemberRepository.findById(reqMemberId).orElseThrow(NotFoundEntityException::new);

        Set<GrantedAuthority> authorities = Set.of(
                new SimpleGrantedAuthority(adminMember.getAdminRoleType().name())
        );

        String accessToken = jwtManager.generateToken(authorities, reqMemberId, ACCESS_TOKEN);
        return AccessTokenRes.createRes(accessToken);
    }

    private Cookie buildRefreshTokenCookie(String value, int maxAge) {
        Cookie cookie = new Cookie("refreshToken", value);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(maxAge);
        return cookie;
    }

}
