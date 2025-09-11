package com.ariari.ariari.domain.system.notice.dto.req;

import com.ariari.ariari.commons.validator.ValidPopupDateRange;
import com.ariari.ariari.commons.entity.Member;
import com.ariari.ariari.commons.entity.SystemNotice;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

import java.time.LocalDateTime;

@ValidPopupDateRange
@Schema(description = "서비스 공지사항 저장 형식")
@Getter
public class SystemNoticeSaveReq {

    @Schema(description = "서비스 공지사항 제목", example = "아리아리에서 개발한 서비스의 배포 시작")
    @NotBlank
    private String title;

    @Schema(description = "서비스 공지사항 내용", example = "아리아리에서 개발한 동아리 커뮤니티 서비스의 배포가 시작되었습니다!")
    @NotBlank
    private String body;

    @Schema(description = "공지사항 팝업 여부", example = "true")
    private boolean isPopup;

    @Schema(description = "공지사항 팝업 여부", example = "2025-08-09T12:00:00")
    private LocalDateTime popupStartDate;

    @Schema(description = "공지사항 팝업 여부", example = "2025-08-10T12:00:00")
    private LocalDateTime popupEndDate;


    public SystemNotice toEntity(Member member) {
        return SystemNotice.create(
                title,
                body,
                member,
                isPopup,
                popupStartDate,
                popupEndDate
        );
    }

}
