package com.ariari.ariari.domain.admin.dataops.dto.res;

import com.ariari.ariari.domain.admin.dataops.dto.FindDataopsData;
import com.ariari.ariari.domain.admin.dataops.dto.GetDataopsData;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class GetDataopsRes {
    @Schema(description = "", example = "")
    private String status;

    @Schema(description = "data 객체", example = "")
    private GetDataopsData data;
}