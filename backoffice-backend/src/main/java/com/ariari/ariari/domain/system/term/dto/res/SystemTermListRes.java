package com.ariari.ariari.domain.system.term.dto.res;

import com.ariari.ariari.commons.entity.SystemTerm;
import com.ariari.ariari.domain.system.enums.TermType;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Schema(description = "서비스 약관 리스트 응답")
@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class SystemTermListRes {

    @Schema(description = "pk", example = "")
    private final Long id;

    @Schema(description = "약관 종류 : PRIVACY_POLICY,         // 개인정보처리방침\n" +
            "    CLUB_RULES,             // 동아리 이용수칙\n" +
            "    PLATFORM_RULES         // 플랫폼 이용수칙", example = "PRIVACY_POLICY")
    private final TermType title;

    @Schema(description = "작성자", example = "홍길동")
    private final String author;

    @Schema(description = "생성일자", example = "2024-03-01")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private final LocalDate createdAt;

    public static SystemTermListRes fromEntity(SystemTerm systemTerm) {
        return SystemTermListRes.builder()
                .id(systemTerm.getId())
                .title(systemTerm.getTermType())
                .createdAt(systemTerm.getCreatedDateTime().toLocalDate())
                .author(systemTerm.getUpdatedBy().getUsername())
                .build();
    }
}
