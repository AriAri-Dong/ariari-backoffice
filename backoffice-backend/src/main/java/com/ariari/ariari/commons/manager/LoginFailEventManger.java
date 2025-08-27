package com.ariari.ariari.commons.manager;

import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LoginFailEventManger {

    private final ApplicationEventPublisher eventPublisher;

    public void lock(Long adminMemberId) {
        eventPublisher.publishEvent(adminMemberId);
    }


}
