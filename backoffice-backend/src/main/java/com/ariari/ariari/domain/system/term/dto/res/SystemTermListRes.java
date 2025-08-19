package com.ariari.ariari.domain.system.term.dto.res;

import com.ariari.ariari.domain.system.SystemTerm;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Schema(description = "서비스 약관 리스트 응답")
@Getter
public class SystemTermListRes {

    @Schema(description = "서비스 약관 데이터")
    private List<SystemTermDetailRes> systemTermDetailRes;


    private SystemTermListRes(List<SystemTermDetailRes> systemTermDetailRes) {
        this.systemTermDetailRes = systemTermDetailRes;
    }

    public static SystemTermListRes create(List<SystemTerm> systemTermList) {
        List<SystemTermDetailRes> systemTermData = systemTermList.stream().map(SystemTermDetailRes::fromEntity).toList();
        return new SystemTermListRes(systemTermData);
    }
}
