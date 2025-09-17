package com.ariari.ariari.domain.admin.dataops.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.Map;
import java.util.Objects;

@Data
public class GetDataopsData {
    @Schema(description = "PK", example = "")
    private String id;

    @Schema(description = "세부 데이터", example = "")
    private Map<String, Objects> fields;
}
