package com.ariari.ariari.domain.system.notice;

import com.ariari.ariari.commons.entity.SystemNotice;
import com.ariari.ariari.domain.system.notice.dto.req.SystemNoticeSearchReq;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SystemNoticeRepositoryCustom {

    Page<SystemNotice> searchSystemNotices(SystemNoticeSearchReq req, Pageable pageable);

    SystemNotice findWithImagesById(Long id);
}
