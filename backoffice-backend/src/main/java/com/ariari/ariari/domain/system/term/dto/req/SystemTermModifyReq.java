package com.ariari.ariari.domain.system.term.dto.req;

import com.ariari.ariari.commons.entity.AdminMember;
import com.ariari.ariari.commons.entity.SystemNotice;
import com.ariari.ariari.commons.entity.SystemTerm;
import com.ariari.ariari.domain.system.enums.TermType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SystemTermModifyReq {

    @Schema(description = "약관 종류 : PRIVACY_POLICY,         // 개인정보처리방침\n" +
            "    CLUB_RULES,             // 동아리 이용수칙\n" +
            "    PLATFORM_RULES         // 플랫폼 이용수칙", example = "PRIVACY_POLICY")
    private TermType title ;

    @Schema(description = "", example = "수정된 약관 전문입니다.")
    private String body;


    public void modifyEntity(SystemTerm systemTerm, AdminMember updatedBy) {
        systemTerm.modify(title, body, updatedBy);
    }

}
