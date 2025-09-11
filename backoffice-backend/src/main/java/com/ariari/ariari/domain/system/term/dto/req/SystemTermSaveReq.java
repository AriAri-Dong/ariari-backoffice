package com.ariari.ariari.domain.system.term.dto.req;

import com.ariari.ariari.commons.pkgenerator.CustomPkGenerate;
import com.ariari.ariari.commons.entity.SystemTerm;
import com.ariari.ariari.domain.system.enums.TermType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Getter;

@Schema(description = "서비스 약관 저장 형식")
@Getter
public class SystemTermSaveReq {

    @Schema(description = "", example = "")
    private TermType termType;

    @Schema(description = "", example = "")
    private String body;


    public SystemTerm toEntity(){
        return SystemTerm.create(
                termType,
                body
        );
    }

}
