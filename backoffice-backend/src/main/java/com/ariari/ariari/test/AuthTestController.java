package com.ariari.ariari.test;

import com.ariari.ariari.commons.auth.dto.JwtTokenRes;
import com.ariari.ariari.commons.exception.exceptions.NotFoundEntityException;
import com.ariari.ariari.commons.manager.JwtManager;
import com.ariari.ariari.domain.member.Member;
import com.ariari.ariari.domain.member.member.MemberRepository;
import com.ariari.ariari.test.dto.TokenInfoRes;
import com.ariari.ariari.test.dto.TokenReq;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Slf4j
@Tag(name = "로그인 테스트")
@RestController
@RequestMapping("/test/auth")
@RequiredArgsConstructor
public class AuthTestController {


    @Secured({"ROLE_USER", "ROLE_MANAGER", "ROLE_ADMIN"})
    @GetMapping("/USER")
    public String userAuthTest() {
        return "successful";
    }

    @Secured({"ROLE_MANAGER", "ROLE_ADMIN"})
    @GetMapping("/MANAGER")
    public String ManagerAuthTest() {
        return "successful";
    }

    @Secured("ROLE_ADMIN")
    @GetMapping("/ADMIN")
    public String adminAuthTest() {
        return "successful";
    }

}
