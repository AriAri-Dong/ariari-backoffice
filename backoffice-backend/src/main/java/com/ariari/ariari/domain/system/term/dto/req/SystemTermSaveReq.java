package com.ariari.ariari.domain.system.term.dto.req;

import com.ariari.ariari.commons.entity.AdminMember;
import com.ariari.ariari.commons.pkgenerator.CustomPkGenerate;
import com.ariari.ariari.commons.entity.SystemTerm;
import com.ariari.ariari.domain.system.enums.TermType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Getter;

@Schema(description = "서비스 약관 저장 형식")
@Getter
public class SystemTermSaveReq {

    @Schema(description = "약관 타입", example = "PRIVACY_POLICY, CLUB_RULES, PLATFORM_RULES")
    private TermType termType;

    @Schema(description = "약관 내용", example = "")
    private String body;


    public SystemTerm toEntity(AdminMember adminMember) {
        return SystemTerm.create(
                termType,
                body,
                adminMember
        );
    }

}
