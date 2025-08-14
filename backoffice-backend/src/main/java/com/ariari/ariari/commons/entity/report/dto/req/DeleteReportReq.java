package com.ariari.ariari.commons.entity.report.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeleteReportReq {

    @Schema(description = "신고 Id", example = "63454353453" )
    private Long reportId;

    @Schema(description = "조치내용", example = "부적절한 내용으로 삭제" )
    private String deleteBody;
}
