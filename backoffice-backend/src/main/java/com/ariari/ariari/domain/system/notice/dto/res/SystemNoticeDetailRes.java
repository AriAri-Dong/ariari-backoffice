package com.ariari.ariari.domain.system.notice.dto.res;

import com.ariari.ariari.commons.entity.SystemNotice;
import com.ariari.ariari.commons.entity.SystemNoticeImage;
import com.ariari.ariari.domain.system.notice.enums.PopStatusType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Schema(description = "서비스 공지사항 상세 응답 ")
@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class SystemNoticeDetailRes {

    @Schema(description = "pk", example = "")
    @JsonSerialize(using = ToStringSerializer.class)
    private final Long id;

    @Schema(description = "제목", example = "제목")
    private final String title;

    @Schema(description = "본문", example = "본문")
    private final String body;

    @Schema(description = "작성자", example = "홍길동")
    private final String author;

    @Schema(description = "팝업 여부", example = "홍길동")
    private final boolean popupEnabled;

    @Schema(description = "팝업시작 날짜", example = "2024-03-01")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private final LocalDateTime popupStartDate;

    @Schema(description = "팝업종료 날짜", example = "2024-03-01")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private final LocalDateTime popupEndDate;

    @Schema(description = "생성일자", example = "2024-03-01")
    private final LocalDateTime createdAt;

    @Schema(description = "업데이트일자", example = "2024-03-01")
    private final LocalDateTime updatedAt;

    @Schema(description = "게시 상태", example = "POSTED")
    private final PopStatusType status;

    @Schema(description = "공지사항 이미지", example = "")
    private final List<String> images;

    public static SystemNoticeDetailRes fromEntity(SystemNotice systemNotice) {
        return SystemNoticeDetailRes.builder()
                .id(systemNotice.getId())
                .title(systemNotice.getTitle())
                .body(systemNotice.getBody())
                .author(systemNotice.getUpdatedBy().getUsername())
                .popupEnabled(systemNotice.isPopupEnabled())
                .popupStartDate(systemNotice.getPopupStartDate())
                .popupEndDate(systemNotice.getPopupEndDate())
                .createdAt(systemNotice.getCreatedDateTime())
                .updatedAt(systemNotice.getUpdatedDateTime())
                .status(systemNotice.getPostStatus())
                .images(systemNotice.getSystemNoticeImages().stream().map(SystemNoticeImage::getImageUri).toList())
                .build();
    }

}
