package com.ariari.ariari.domain.admin.dataops.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
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

    @Schema(description = "데이터 목록 (id + 삭제 여부)", example = "")
    private final List<DataItem> items;

    @Getter
    @AllArgsConstructor
    public static class DataItem {
        @Schema(description = "데이터 ID", example = "123")
        private final String id;

        @Schema(description = "삭제 일시 (null이면 삭제되지 않음)", example = "2024-03-15T10:30:00")
        private final LocalDateTime deletedDateTime;
    }

    public static FindDataopsData of(
            int total,
            int page,
            int pageSize,
            String tableName,
            List<Map<String, Object>> idResults,
            String idColumn
    ) {
        List<DataItem> items = extractDataItems(idResults, idColumn);

        return new FindDataopsData(
                total,
                page,
                pageSize,
                tableName,
                items
        );
    }

    private static List<DataItem> extractDataItems(List<Map<String, Object>> idResults, String idColumn) {
        return idResults.stream()
                .filter(row -> row.get(idColumn) != null)
                .map(row -> {
                    String id = row.get(idColumn).toString();
                    LocalDateTime deletedDateTime = null;

                    // deleted_date_time 컬럼 값 추출 (테이블에 없으면 null)
                    Object deletedValue = row.get("deleted_date_time");
                    if (deletedValue instanceof LocalDateTime) {
                        deletedDateTime = (LocalDateTime) deletedValue;
                    } else if (deletedValue instanceof java.sql.Timestamp) {
                        deletedDateTime = ((java.sql.Timestamp) deletedValue).toLocalDateTime();
                    }

                    return new DataItem(id, deletedDateTime);
                })
                .collect(Collectors.toList());
    }
}
