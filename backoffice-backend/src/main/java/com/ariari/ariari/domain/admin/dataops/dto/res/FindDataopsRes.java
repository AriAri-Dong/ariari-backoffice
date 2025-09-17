package com.ariari.ariari.domain.admin.dataops.dto.res;

import com.ariari.ariari.domain.admin.dataops.dto.FindDataopsData;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class FindDataopsRes {
    @Schema(description = "", example = "")
    private String status;

    @Schema(description = "data 객체", example = "")
    private FindDataopsData data;
}
