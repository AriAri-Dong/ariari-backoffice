package com.ariari.ariari.domain.admin.dataops.dto.res;

import com.ariari.ariari.domain.admin.dataops.dto.FindDataopsData;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class FindDataopsRes {
    @Schema(description = "", example = "")
    private final String status;

    @Schema(description = "data 객체", example = "")
    private final FindDataopsData data;

    public static FindDataopsRes success(FindDataopsData data) {
        return new FindDataopsRes("success", data);
    }
}
