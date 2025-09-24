package com.ariari.ariari.commons.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtTokenRes {

    private String accessToken;
    private String refreshToken;

    public static JwtTokenRes createRes(String accessToken, String refreshToken) {
        return new JwtTokenRes(accessToken, refreshToken);
    }

}
