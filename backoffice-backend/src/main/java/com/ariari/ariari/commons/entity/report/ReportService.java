package com.ariari.ariari.commons.entity.report;

import com.ariari.ariari.commons.entity.report.dto.req.DeleteReportReq;
import com.ariari.ariari.commons.entity.report.dto.req.ResolveSaveReq;
import com.ariari.ariari.commons.entity.report.dto.req.SearchReq;
import com.ariari.ariari.commons.entity.report.dto.res.PendingReportListRes;
import com.ariari.ariari.commons.entity.report.dto.res.ResolvedReportListRes;
import com.ariari.ariari.commons.entity.report.enums.ReportStatusType;
import com.ariari.ariari.commons.exception.exceptions.NotFoundEntityException;
import com.ariari.ariari.commons.manager.MemberAlarmManger;
import com.ariari.ariari.domain.member.Member;
import com.ariari.ariari.domain.member.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;
    private final MemberRepository memberRepository;
    private final MemberAlarmManger memberAlarmManger;

    @Transactional(readOnly = true)
    public PendingReportListRes getAllReports(Long memberId, Pageable pageable) {
        Member reqMember = getMemberOrThrow(memberId);
        //검증 로직 추가해야함
        Page<Report> reportPage = reportRepository.findAllByReportStatusType(ReportStatusType.PENDING, pageable);

        return PendingReportListRes.fromPage(reportPage);
    }

    @Transactional(readOnly = true)
    public ResolvedReportListRes getAllResolvedReports(Long memberId, Pageable pageable) {
        Member reqMember = getMemberOrThrow(memberId);
        //검증 로직 추가해야함
        Page<Report> reportPage = reportRepository.findAllByReportStatusType(ReportStatusType.RESOLVED, pageable);

        return ResolvedReportListRes.fromPage(reportPage);
    }

    @Transactional(readOnly = true)
    public ResolvedReportListRes searchReports(SearchReq searchReq, Long memberId, Pageable pageable) {
        Member reqMember = getMemberOrThrow(memberId);
        //검증 로직 추가해야함
        Page<Report> reportPage = reportRepository.searchReports(searchReq, pageable);

        return ResolvedReportListRes.fromPage(reportPage);
    }

    @Transactional
    public void saveResolvedReport(ResolveSaveReq resolveSaveReq, Long memberId) {
        Member reqMember = getMemberOrThrow(memberId);
        //검증 로직 추가해야함
        Report report = reportRepository.findById(resolveSaveReq.getReportId()).orElseThrow(NotFoundEntityException::new);
        report.resolve(resolveSaveReq.getResolveBody(), LocalDateTime.now(ZoneId.of("Asia/Seoul")));
        reportRepository.save(report);
    }

    @Transactional
    public void deleteReport(DeleteReportReq deleteReportReq, Long memberId) {
        Member reqMember = memberRepository.findById(memberId).orElseThrow(NotFoundEntityException::new);
        //검증 로직 추가해야함
        Report report = reportRepository.findWithReporterById(deleteReportReq.getReportId()).orElseThrow(NotFoundEntityException::new);

        reportRepository.delete(report);
        memberAlarmManger.sendReportDeleteNotification(report.getReporter(), deleteReportReq.getDeleteBody());
    }


    private Member getMemberOrThrow(Long memberId) {
        return memberRepository.findById(memberId).orElseThrow(NotFoundEntityException::new);
    }


}
