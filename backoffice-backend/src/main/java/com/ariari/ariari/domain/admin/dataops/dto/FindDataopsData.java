package com.ariari.ariari.domain.admin.dataops.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Data
public class FindDataopsData {
    @Schema(description = "총 개수", example = "34")
    private Integer total;

    @Schema(description = "페이지 번호", example = "1")
    private Integer page;

    @Schema(description = "페이지 크기", example = "10")
    private Integer pageSize;

    @Schema(description = "테이블 명", example = "Member")
    private String tableName;

    @Schema(description = "PK목록", example = "")
    private List<String> ids = new ArrayList<>();
}
