package com.ariari.ariari.commons.auth.springsecurity;

import com.ariari.ariari.commons.exception.exceptions.NotAuthenticatedException;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;

@Getter
public class CustomUserDetails implements UserDetails {

    private final Long memberId;
    private final String username;
    private final String password;
    private final Set<GrantedAuthority> authorities;

    public CustomUserDetails(Long memberId, String username, String password, Set<GrantedAuthority> authorities) {
        this.memberId = memberId;
        this.username = username;
        this.password = password;
        this.authorities = authorities;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }



    public static Long getMemberId(CustomUserDetails userDetails, boolean required) {
        if (userDetails != null) {
            return userDetails.getMemberId();
        } else {
            if (required) {
                throw new NotAuthenticatedException();
            } else {
                return null;
            }
        }
    }

}