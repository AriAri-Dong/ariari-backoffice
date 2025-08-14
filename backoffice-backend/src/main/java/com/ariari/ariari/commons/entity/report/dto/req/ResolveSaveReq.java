package com.ariari.ariari.commons.entity.report.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResolveSaveReq {

    @Schema(description = "신고 Id", example = "63454353453" )
    private Long reportId;


    @Schema(description = "조치내용", example = "해당 동아리 삭제" )
    private String resolveBody;

}
