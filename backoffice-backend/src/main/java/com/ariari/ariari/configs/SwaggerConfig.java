package com.ariari.ariari.configs;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .components(new Components()
                        .addSecuritySchemes("customAuth", new SecurityScheme()
                                .type(SecurityScheme.Type.APIKEY)
                                .in(SecurityScheme.In.HEADER)
                                .name("Authorization")
                        )
                )
                .addSecurityItem(new SecurityRequirement().addList("customAuth"));
    }

    @Bean
    public GroupedOpenApi test() {
        return GroupedOpenApi.builder()
                .group("01. 테스트 API")
                .packagesToScan("com.ariari.ariari.test")
                .build();
    }

    @Bean
    public GroupedOpenApi all() {
        return GroupedOpenApi.builder()
                .group("02. 전체 API")
                .packagesToScan("com.ariari.ariari")
                .build();
    }

    @Bean
    public GroupedOpenApi auth() {
        return GroupedOpenApi.builder()
                .group("03. 인증(로그인) API")
                .packagesToScan("com.ariari.ariari.commons.auth", "com.ariari.ariari.test")
                .build();
    }



    @Bean
    public GroupedOpenApi report() {
        return GroupedOpenApi.builder()
                .group("04. 신고 API")
                .packagesToScan("com.ariari.ariari.commons.commonentity.report"
                , "com.ariari.ariari.test")
                .build();
    }

    @Bean
    public GroupedOpenApi alarm() {
        return GroupedOpenApi.builder()
                .group("05. 알림 API")
                .packagesToScan("com.ariari.ariari.domain.club.alarm", "com.ariari.ariari.test")
                .build();
    }


    @Bean
    public GroupedOpenApi SystemNotice() {
        return GroupedOpenApi.builder()
                .group("06. 공지사항 API")
                .packagesToScan("com.ariari.ariari.domain.system", "com.ariari.ariari.test")
                .build();
    }

    @Bean
    public GroupedOpenApi systemFaq() {
        return GroupedOpenApi.builder()
                .group("07.  FAQ API")
                .packagesToScan("com.ariari.ariari.domain.system.faq", "com.ariari.ariari.test")
                .build();
    }

    @Bean
    public GroupedOpenApi systemAlarm() {
        return GroupedOpenApi.builder()
                .group("08.  시스템 알림 API")
                .packagesToScan("com.ariari.ariari.domain.system.alarm", "com.ariari.ariari.test")
                .build();
    }

    @Bean
    public GroupedOpenApi dataOps() {
        return GroupedOpenApi.builder()
                .group("10.  데이터 조회/삭제")
                .packagesToScan("com.ariari.ariari.domain.admin.dataops", "com.ariari.ariari.test")
                .build();
    }

    @Bean
    public GroupedOpenApi dashboard() {
        return GroupedOpenApi.builder()
                .group("11.  대시보드")
                .packagesToScan("com.ariari.ariari.domain.admin.dashboard", "com.ariari.ariari.test")
                .build();
    }
}
