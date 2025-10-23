package com.ariari.ariari.domain.admin.dataops.dto.res;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class DeleteDataopsRes {
    @Schema(description = "상태", example = "success")
    private final String status;

    @Schema(description = "메세지", example = "데이터가 삭제되었습니다.")
    private final String message;

    public static DeleteDataopsRes success(String tableName, String id) {
        return new DeleteDataopsRes("success", tableName + "의 ID " + id + " 데이터가 삭제되었습니다.");
    }

    public static DeleteDataopsRes refused(String tableName, String id) {
        return new DeleteDataopsRes("refused", tableName + "은 삭제가 불가능한 테이블입니다.");
    }
}
