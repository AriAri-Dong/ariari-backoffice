package com.ariari.ariari.domain.admin.dataops.dto.res;

import com.ariari.ariari.domain.admin.dataops.dto.GetDataopsData;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class GetDataopsRes {
    @Schema(description = "", example = "")
    private final String status;

    @Schema(description = "data 객체", example = "")
    private final GetDataopsData data;

    public static GetDataopsRes success(GetDataopsData data) {
        return new GetDataopsRes("success", data);
    }
}