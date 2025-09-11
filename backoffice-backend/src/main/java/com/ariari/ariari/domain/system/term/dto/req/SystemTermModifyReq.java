package com.ariari.ariari.domain.system.term.dto.req;

import com.ariari.ariari.commons.entity.SystemNotice;
import com.ariari.ariari.commons.entity.SystemTerm;
import com.ariari.ariari.domain.system.enums.TermType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class SystemTermModifyReq {

    @Schema(description = "", example = "")
    private TermType termType;

    @Schema(description = "", example = "")
    private String body;


    public void modifyEntity(SystemTerm systemTerm) {
        systemTerm.modify(termType, body);
    }

}
