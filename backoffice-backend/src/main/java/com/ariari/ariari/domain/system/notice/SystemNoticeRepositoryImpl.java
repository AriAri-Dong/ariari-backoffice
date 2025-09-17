package com.ariari.ariari.domain.system.notice;

import com.ariari.ariari.commons.entity.QSystemNotice;
import com.ariari.ariari.commons.entity.SystemNotice;
import com.ariari.ariari.domain.system.notice.dto.req.SystemNoticeSearchReq;
import com.ariari.ariari.domain.system.notice.enums.PopStatusType;
import com.ariari.ariari.domain.system.notice.enums.SearchFilterType;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
public class SystemNoticeRepositoryImpl implements SystemNoticeRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public SystemNotice findWithImagesById(Long id) {
        QSystemNotice notice = QSystemNotice.systemNotice;
        return jpaQueryFactory
                .selectFrom(notice)
                .leftJoin(notice.systemNoticeImages).fetchJoin() // 이미지 fetch join
                .leftJoin(notice.updatedBy).fetchJoin()        // 작성자 fetch join
                .where(notice.id.eq(id))
                .fetchOne();
    }

    @Override
    public Page<SystemNotice> searchSystemNotices(SystemNoticeSearchReq req, Pageable pageable) {
        QSystemNotice qSystemNotice = QSystemNotice.systemNotice;

        // fetchcount deprecated 대안

        //  조회 쿼리
        List<SystemNotice> result = jpaQueryFactory
                .selectFrom(qSystemNotice)
                .join(qSystemNotice.updatedBy).fetchJoin()
                .where(
                        titleOrAuthor(req.getSearch(), req.getFilter()),
                        statusEq(req.getStatus()),
                        createdAfter(req.getStartDate()),
                        createdBefore(req.getEndDate())
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(qSystemNotice.createdDateTime.desc())
                .fetch();

        //  count 쿼리
        Long total = jpaQueryFactory
                .select(qSystemNotice.count())
                .from(qSystemNotice)
                .where(
                        titleOrAuthor(req.getSearch(), req.getFilter()),
                        statusEq(req.getStatus()),
                        createdAfter(req.getStartDate()),
                        createdBefore(req.getEndDate())
                )
                .fetchOne();

        return new PageImpl<>(result, pageable, total != null ? total : 0);
    }

    private BooleanExpression titleOrAuthor(String search, SearchFilterType filter) {
        if( search == null || search.isEmpty() || filter == null){
            return null;
        }

        QSystemNotice qSystemNotice = QSystemNotice.systemNotice;

        return switch (filter) {
            case TITLE -> qSystemNotice.title.containsIgnoreCase(search);
            case AUTHOR -> qSystemNotice.updatedBy.username.containsIgnoreCase(search);
            default -> null;
        };
    }

    private BooleanExpression statusEq(PopStatusType status) {
        QSystemNotice notice = QSystemNotice.systemNotice;

        if (status == null) return null;

        return notice.postStatus.eq(status);
    }

    private BooleanExpression createdAfter(LocalDateTime startDate) {
        if (startDate == null) return null;
        return QSystemNotice.systemNotice.createdDateTime.goe(startDate);
    }

    private BooleanExpression createdBefore(LocalDateTime endDate) {
        if (endDate == null) return null;
        LocalDateTime endOfDay = endDate.withHour(23).withMinute(59).withSecond(59);
        return QSystemNotice.systemNotice.createdDateTime.loe(endOfDay);
    }
}
