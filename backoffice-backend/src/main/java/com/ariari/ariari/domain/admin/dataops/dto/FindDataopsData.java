package com.ariari.ariari.domain.admin.dataops.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class FindDataopsData {
    @Schema(description = "총 개수", example = "34")
    private final Integer total;

    @Schema(description = "페이지 번호", example = "1")
    private final Integer page;

    @Schema(description = "페이지 크기", example = "10")
    private final Integer pageSize;

    @Schema(description = "테이블 명", example = "Member")
    private final String tableName;

    @Schema(description = "PK목록", example = "")
    private final List<String> ids;

    public static FindDataopsData of(
            int total,
            int page,
            int pageSize,
            String tableName,
            List<Map<String, Object>> idResults,
            String idColumn
    ) {
        List<String> ids = extractIds(idResults, idColumn);

        return new FindDataopsData(
                total,
                page,
                pageSize,
                tableName,
                ids
        );
    }

    private static List<String> extractIds(List<Map<String, Object>> idResults, String idColumn) {
        return idResults.stream()
                .map(row -> row.get(idColumn))
                .filter(idValue -> idValue != null)
                .map(Object::toString)
                .collect(Collectors.toList());
    }
}
