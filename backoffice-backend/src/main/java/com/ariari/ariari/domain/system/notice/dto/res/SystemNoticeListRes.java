package com.ariari.ariari.domain.system.notice.dto.res;

import com.ariari.ariari.commons.entity.SystemNotice;
import com.ariari.ariari.domain.system.notice.enums.PopStatusType;
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

@Schema(description = "서비스 공지사항 리스트 응답")
@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class SystemNoticeListRes {

    @JsonSerialize(using = ToStringSerializer.class)
    @Schema(description = "서비스 공지사항 id", example = "673012345142938986")
    private final Long id;

    @Schema(description = "제목", example = "공지사항입니다.")
    private final String title;

    @Schema(description = "공지사항 여부", example = "POSTED / UNPOSTED")
    private final PopStatusType status;

    @Schema(description = "생성일자", example = "2024-03-01")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private final LocalDate createdAt;


    @Schema(description = "작성자", example = "홍길동")
    private final String author;


    public static SystemNoticeListRes fromEntity(SystemNotice systemNotice){
        return SystemNoticeListRes.builder()
                .id(systemNotice.getId())
                .title(systemNotice.getTitle())
                .status(systemNotice.getPostStatus())
                .createdAt(systemNotice.getCreatedDateTime().toLocalDate())
                .author(systemNotice.getUpdatedBy().getUsername())
                .build();

    }
}



