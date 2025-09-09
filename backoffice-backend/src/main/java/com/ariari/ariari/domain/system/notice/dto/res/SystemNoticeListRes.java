package com.ariari.ariari.domain.system.notice.dto.res;

import com.ariari.ariari.commons.manager.PageInfo;
import com.ariari.ariari.domain.system.SystemNotice;
import com.ariari.ariari.domain.system.notice.dto.SystemNoticeData;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.Collections;
import java.util.List;

@Schema(description = "서비스 공지사항 리스트 응답")
@Getter
public class SystemNoticeListRes {

    @Schema(description = "서비스 공지사항 데이터 리스트")
    private final List<SystemNoticeData> systemNoticeDataList;
    private final PageInfo pageInfo;

    private SystemNoticeListRes(List<SystemNoticeData> systemNoticeDataList, PageInfo pageInfo) {
        this.systemNoticeDataList = systemNoticeDataList;
        this.pageInfo = pageInfo;
    }

    public static SystemNoticeListRes from(Page<SystemNotice> page) {
        List<SystemNoticeData> systemNoticeData = page.getContent().stream().map(SystemNoticeData::fromEntity).toList();

        return new SystemNoticeListRes(systemNoticeData, PageInfo.fromPage(page));
    }
}



