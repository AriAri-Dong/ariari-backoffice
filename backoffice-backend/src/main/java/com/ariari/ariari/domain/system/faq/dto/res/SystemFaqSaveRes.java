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

import java.time.LocalDateTime;


@Schema(description = "서비스 FAQ 저장 응답")
@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class SystemFaqSaveRes {

    @JsonSerialize(using = ToStringSerializer.class)
    @Schema(description = "서비스 공지사항 id", example = "673012345142938986")
    private final Long id;

    @Schema(description = "제목", example = "Faq입니다.")
    private final String title;

    @Schema(description = "생성일자", example = "2024-03-01")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private final LocalDateTime createdAt;



    public static SystemFaqSaveRes fromEntity(SystemFaq systemFaq){
        return new SystemFaqSaveRes(
                systemFaq.getId(),
                systemFaq.getTitle(),
                systemFaq.getCreatedDateTime()
                );
    }
}
