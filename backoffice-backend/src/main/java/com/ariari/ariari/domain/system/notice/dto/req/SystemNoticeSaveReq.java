package com.ariari.ariari.domain.system.notice.dto.req;

import com.ariari.ariari.commons.entity.AdminMember;
import com.ariari.ariari.commons.validator.ValidPopupDateRange;
import com.ariari.ariari.commons.entity.Member;
import com.ariari.ariari.commons.entity.SystemNotice;
import com.ariari.ariari.domain.system.notice.enums.PopStatusType;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.time.LocalDate;
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
    private boolean popupEnabled;

    @Schema(description = "공지사항 여부", example = "POSTED / UNPOSTED")
    @NotNull
    private PopStatusType status;

    @Schema(description = "팝업 시작일 (popupEnabled=true일 때)", example = "2025-08-09")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate popupStartDate;

    @Schema(description = "팝업 종료일 (popupEnabled=true일 때)", example = "2025-08-10")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate popupEndDate;


    public SystemNotice toEntity(AdminMember adminMember) {

        LocalDateTime start = null;
        LocalDateTime end = null;

        if (popupEnabled) {
            if (popupStartDate != null) {
                start = popupStartDate.atStartOfDay(); // LocalDate → LocalDateTime
            }
            if (popupEndDate != null) {
                end = popupEndDate.atTime(23, 59, 59);
            }
        }
        return SystemNotice.create(
                title,
                body,
                adminMember,
                status,
                popupEnabled,
                start,
                end
        );
    }
}
