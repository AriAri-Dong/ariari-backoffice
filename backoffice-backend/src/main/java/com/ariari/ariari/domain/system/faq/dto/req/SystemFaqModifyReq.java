package com.ariari.ariari.domain.system.faq.dto.req;

import com.ariari.ariari.commons.entity.AdminMember;
import com.ariari.ariari.commons.entity.SystemFaq;
import com.ariari.ariari.domain.system.enums.SystemFaqStatusType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Schema(description = "서비스 FAQ 수정 형식")
@Getter
public class SystemFaqModifyReq {

    @Schema(description = "서비스 FAQ 제목", example = "수정된 아리아리에서 개발한 서비스의 배포 시작")
    private String title;
    @Schema(description = "서비스 FAQ 내용", example = "수정된 아리아리에서 개발한 동아리 커뮤니티 서비스의 배포가 시작되었습니다!")
    private String body;
    @Schema(description = "서비스 FAQ 색상", example = "blue")
    private String color;
    @Schema(description = "서비스 FAQ 타입", example = "SECURITY, ACTIVE")
    private SystemFaqStatusType systemFaqStatusType;

    public void modifyEntity(SystemFaq systemFaq, AdminMember updatedBy) {
        systemFaq.modify(title, body, color, systemFaqStatusType, updatedBy);
    }
}
