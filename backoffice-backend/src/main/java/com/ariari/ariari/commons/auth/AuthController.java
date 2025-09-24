package com.ariari.ariari.commons.auth;

import com.ariari.ariari.commons.auth.dto.AccessTokenRes;
import com.ariari.ariari.commons.auth.dto.JwtTokenRes;
import com.ariari.ariari.commons.auth.dto.LoginReq;
import com.ariari.ariari.commons.auth.dto.LogoutRes;
import com.ariari.ariari.commons.auth.oauth.KakaoAuthManager;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Tag(name = "auth", description = "인증 관련 어노테이션")
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @Operation(summary = "로그인", description = "로그인")
    @PostMapping("/auth/login")
    @ApiResponse(responseCode = "200", description = "성공", content = @Content(schema = @Schema(implementation = JwtTokenRes.class)))
    public JwtTokenRes login(@RequestBody LoginReq req) {
        return authService.login(req);
    }

    @Operation(summary = "로그아웃", description = "로그아웃")
    @PostMapping("/auth/logout")
    public void logout(
            @RequestHeader(value = "Authorization") String accessToken,
            @RequestBody LogoutRes logoutRes
            ) {
        if (accessToken != null && accessToken.startsWith("Bearer ")) {
            accessToken = accessToken.substring(7);
        }
        authService.logout(accessToken, logoutRes.getRefreshToken());
    }

    @PostMapping("/reissue/token")
    public AccessTokenRes reissueAccessToken(@RequestBody LogoutRes logoutRes) {
        return authService.reissueAccessToken(logoutRes.getRefreshToken());
    }

}