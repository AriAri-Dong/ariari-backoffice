package com.ariari.ariari.domain.system.faq.dto.res;

import com.ariari.ariari.commons.entity.SystemFaq;
import com.ariari.ariari.domain.system.enums.SystemFaqStatusType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Schema(description = "서비스 FAQ 상세 응답 ")
@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class SystemFaqDetailRes {

    @JsonSerialize(using = ToStringSerializer.class)
    @Schema(description = "서비스 공지사항 id", example = "673012345142938986")
    private final Long id;

    @Schema(description = "제목", example = "Faq입니다.")
    private final String title;

    @Schema(description = "카테고리", example = "'ACCOUNT','CLUB','DATA','GENERAL','LOGIN','MAINTENANCE','POLICY','SECURITY','SERVICE','TECHNICAL','UPDATE'")
    private final SystemFaqStatusType category;

    @Schema(description = "색깔", example = "BLUE")
    private final String tokenColor;

    @Schema(description = "설명", example = "홍길동입니다?")
    private final String description;

    @Schema(description = "생성일자", example = "2024-03-01")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private final LocalDate createdAt;


    @Schema(description = "업데이트일자", example = "2024-03-01")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private final LocalDate updateAt;



    public static SystemFaqDetailRes fromEntity(SystemFaq systemFaq){
        return SystemFaqDetailRes.builder()
                .id(systemFaq.getId())
                .title(systemFaq.getTitle())
                .category(systemFaq.getSystemFaqStatusType())
                .tokenColor(systemFaq.getColor())
                .description(systemFaq.getBody())
                .createdAt(systemFaq.getCreatedDateTime().toLocalDate())
                .updateAt(systemFaq.getUpdatedDateTime().toLocalDate())
                .build();
    }
}
