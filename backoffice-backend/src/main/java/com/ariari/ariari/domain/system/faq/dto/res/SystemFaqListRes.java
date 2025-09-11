package com.ariari.ariari.domain.system.faq.dto.res;

import com.ariari.ariari.commons.manager.PageInfo;
import com.ariari.ariari.commons.entity.SystemFaq;
import com.ariari.ariari.domain.system.faq.dto.SystemFaqData;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Schema(description = "서비스 FAQ 리스트 응답")
@Getter
public class SystemFaqListRes {

    @Schema(description = "서비스 FAQ 데이터 리스트")
    private final List<SystemFaqData> systemFaqDataList;
    private final PageInfo pageInfo;

    private SystemFaqListRes(List<SystemFaqData> systemFaqDataList, PageInfo pageInfo) {
        this.systemFaqDataList = systemFaqDataList;
        this.pageInfo = pageInfo;
    }

    public static SystemFaqListRes from(Page<SystemFaq> page) {
        List<SystemFaqData> systemFaqData = page.getContent().stream()
                .map(SystemFaqData::fromEntity)
                .toList();

        return new SystemFaqListRes(systemFaqData, PageInfo.fromPage(page));
    }
}
