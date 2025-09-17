package com.ariari.ariari.domain.system.faq.dto.res;

import com.ariari.ariari.commons.entity.SystemFaq;
import com.ariari.ariari.domain.system.enums.SystemFaqStatusType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Schema(description = "서비스 FAQ 수정 응답")
@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class SystemFaqModifyRes {

//    @JsonSerialize(using = ToStringSerializer.class)
//    @Schema(description = "서비스 공지사항 id", example = "673012345142938986")
//    private final Long id;

    @Schema(description = "제목", example = "Faq입니다.")
    private final String title;

    @Schema(description = "카테고리", example = "공지사항입니다.")
    private final SystemFaqStatusType category;

    @Schema(description = "색깔", example = "BLUE")
    private final String tokenColor;

    @Schema(description = "설명", example = "홍길동입니다?")
    private final String description;


    public static SystemFaqModifyRes fromEntity(SystemFaq systemFaq){
        return new SystemFaqModifyRes(
                systemFaq.getTitle(),
                systemFaq.getSystemFaqStatusType(),
                systemFaq.getColor(),
                systemFaq.getBody()
        );
    }
}
