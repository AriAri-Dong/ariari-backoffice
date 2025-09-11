package com.ariari.ariari.domain.system.faq.dto.res;

import com.ariari.ariari.commons.entity.SystemFaq;
import com.ariari.ariari.domain.system.faq.dto.SystemFaqData;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Schema(description = "서비스 FAQ 상세 응답 ")
@Getter
public class SystemFaqDetailRes {

    private final SystemFaqData systemFaqData;

    private SystemFaqDetailRes(SystemFaqData systemFaqData) {
        this.systemFaqData = systemFaqData;
    }

    public static SystemFaqDetailRes createRes(SystemFaq systemFaq){
        return new SystemFaqDetailRes(SystemFaqData.fromEntity(systemFaq));
    }
}
