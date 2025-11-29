package com.ariari.ariari.domain.system.term.dto.res;

import com.ariari.ariari.commons.entity.SystemTerm;
import com.ariari.ariari.domain.system.enums.TermType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Schema(description = "서비스 약관 상세 응답")
@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class SystemTermDetailRes {

    @Schema(description = "pk", example = "")
    @JsonSerialize(using = ToStringSerializer.class)
    private final Long id;

    @Schema(description = "약관 종류 : PRIVACY_POLICY,         // 개인정보처리방침\n" +
            "    CLUB_RULES,             // 동아리 이용수칙\n" +
            "    PLATFORM_RULES         // 플랫폼 이용수칙", example = "PRIVACY_POLICY")
    private final TermType title;

    @Schema(description = "본문", example = "")
    private final String body;

    @Schema(description = "생성일자", example = "2024-03-01")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private final LocalDate createdAt;

    @Schema(description = "작성자", example = "홍길동")
    private String author;

    public static SystemTermDetailRes fromEntity(SystemTerm systemTerm) {
        return SystemTermDetailRes.builder()
                .id(systemTerm.getId())
                .title(systemTerm.getTermType())
                .body(systemTerm.getBody())
                .createdAt(systemTerm.getCreatedDateTime().toLocalDate())
                .author(systemTerm.getUpdatedBy().getUsername())
                .build();
    }
}
