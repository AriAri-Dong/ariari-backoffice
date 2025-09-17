package com.ariari.ariari.domain.system.notice.dto.req;


import com.ariari.ariari.commons.entity.AdminMember;
import com.ariari.ariari.commons.entity.SystemNotice;
import com.ariari.ariari.commons.entity.SystemNoticeImage;
import com.ariari.ariari.domain.system.notice.enums.PopStatusType;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Schema(description = "서비스 공지사항 수정 형식")
@Getter
@Builder
public class SystemNoticeModifyReq {

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


    @Schema(description = "삭제할 공지사항 이미지 id 리스트", example = "[url, url, url, url]")
    private List<String> removeImages;

    public void modifyEntity(SystemNotice systemNotice, AdminMember updatedBy) {
        systemNotice.modify(
                title,
                body,
                popupEnabled,
                status
                updatedBy);
    }
}





