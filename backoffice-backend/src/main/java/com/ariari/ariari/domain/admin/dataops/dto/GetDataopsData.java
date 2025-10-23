package com.ariari.ariari.domain.admin.dataops.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class GetDataopsData {
    @Schema(description = "PK", example = "123456789")
    private final String id;

    @Schema(description = "세부 데이터", example = "")
    private final Map<String, Object> fields;

    public static GetDataopsData of(String id, Map<String, Object> detailData, String idColumn) {
        Map<String, Object> fields = convertToFields(detailData, idColumn);
        return new GetDataopsData(id, fields);
    }

    private static Map<String, Object> convertToFields(Map<String, Object> detailData, String idColumn) {
        if (detailData == null || detailData.isEmpty()) {
            return new HashMap<>();
        }

        Map<String, Object> fields = new HashMap<>(detailData);

        // ID 필드를 String으로 변환하여 저장 (TSID를 프론트에서 처리하기 위해)
        Object idValue = fields.get(idColumn);
        if (idValue != null) {
            fields.put(idColumn, idValue.toString());
        }

        return fields;
    }
}
