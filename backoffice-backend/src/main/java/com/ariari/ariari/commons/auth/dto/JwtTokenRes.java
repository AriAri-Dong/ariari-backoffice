package com.ariari.ariari.commons.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtTokenRes {

    private String accessToken;

    public static JwtTokenRes createRes(String accessToken) {
        return new JwtTokenRes(accessToken);
    }

}
