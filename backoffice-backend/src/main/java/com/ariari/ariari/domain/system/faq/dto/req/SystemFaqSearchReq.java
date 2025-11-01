package com.ariari.ariari.domain.system.faq.dto.req;

import com.ariari.ariari.domain.system.enums.SystemFaqStatusType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class SystemFaqSearchReq {


    @Schema(description = "서비스 FAQ 타입", example = "SECURITY, ACTIVE")
    private SystemFaqStatusType category;

    private final Integer page = 1;

    private final Integer pageSize = 10;
}
