package com.ariari.ariari.domain.system.faq.dto.req;

import com.ariari.ariari.commons.entity.AdminMember;
import com.ariari.ariari.commons.entity.SystemFaq;
import com.ariari.ariari.commons.entity.SystemNotice;
import com.ariari.ariari.domain.system.enums.SystemFaqStatusType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

import java.time.LocalDateTime;

@Schema(description = "서비스 FAQ 저장 형식")
@Getter
public class SystemFaqSaveReq {

    @Schema(description = "서비스 FAQ 제목 (질문)", example = "아리아리에 가입하기 위해 필요한 서류는 무엇인가요?")
    @NotBlank
    private String title;

    @Schema(description = "서비스 FAQ 답변", example = "아리아리에 가입하기 위해서는 포트폴리오와 깃허브 URI를 제출해야 합니다.")
    @NotBlank
    private String description;

    @Schema(description = "서비스 FAQ 색상", example = "BLUE")
    @NotBlank
    private String tokenColor;

    @Schema(description = "서비스 FAQ 타입", example = "SECURITY, ACTIVE")
    private SystemFaqStatusType category;


    public SystemFaq toEntity(AdminMember adminMember) {

       return SystemFaq.create(
               title,
               description,
               tokenColor,
               category,
               adminMember
       );
    }

}
