package com.ariari.ariari.domain.admin.dataops.dto.res;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class DeleteDataopsRes {
    @Schema(description = "상태", example = "success")
    private String status;

    @Schema(description = "메세지", example = "데이터가 삭제되었습니다.")
    private String message;
}
