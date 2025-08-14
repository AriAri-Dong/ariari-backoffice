package com.ariari.ariari.commons.entity.report;

import com.ariari.ariari.commons.entity.report.dto.req.SearchReq;
import com.ariari.ariari.commons.entity.report.enums.ReportStatusType;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

@RequiredArgsConstructor
public class ReportRepositoryImpl implements ReportRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;


    @Override
    public Page<Report> searchReports(SearchReq searchReq, Pageable pageable) {

        BooleanBuilder condition = new BooleanBuilder();
        QReport r = QReport.report;

        String filterType = searchReq.getFilterType();
        String keyword = searchReq.getKeyword();


        // 제목 or 신고자
        if(filterType !=null && !filterType.isEmpty()) {
            if(filterType.equals("title")){
                condition.and(r.body.contains(keyword));
            }else if(filterType.equals("reporter")){
                condition.and(r.reporter.nickName.contains(keyword));
            }
        }

        // 날짜 범위
        if(searchReq.getStartDate() != null && searchReq.getEndDate() != null){
            condition.and(r.resolvedDate.between(searchReq.getStartDate().atStartOfDay(),
                    searchReq.getEndDate().atTime(23, 59, 59)));
        }

        // 신고 위치
        if(searchReq.getLocationType() != null) {
            condition.and(r.locationType.eq(searchReq.getLocationType()));
        }

        // 조치완료
        condition.and(r.reportStatusType.eq(ReportStatusType.RESOLVED));

        List<Report> content = jpaQueryFactory
                .select(r)
                .from(r)
                .where(condition)
                .orderBy(r.resolvedDate.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long count = jpaQueryFactory
                .select(r.count())
                .from(r)
                .where(condition)
                .fetchOne();

        return new PageImpl<>(content, pageable, count);


    }
}
