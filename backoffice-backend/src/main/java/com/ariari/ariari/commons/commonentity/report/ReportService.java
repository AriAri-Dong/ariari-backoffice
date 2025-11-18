package com.ariari.ariari.commons.commonentity.report;

import com.ariari.ariari.commons.commonentity.report.dto.req.DeleteReportReq;
import com.ariari.ariari.commons.commonentity.report.dto.req.ResolveSaveReq;
import com.ariari.ariari.commons.commonentity.report.dto.req.SearchReq;
import com.ariari.ariari.commons.commonentity.report.dto.res.PendingReportListRes;
import com.ariari.ariari.commons.commonentity.report.dto.res.ResolvedReportListRes;
import com.ariari.ariari.commons.commonentity.report.enums.ReportStatusType;
import com.ariari.ariari.commons.entity.AdminMember;
import com.ariari.ariari.commons.exception.exceptions.NotFoundEntityException;
import com.ariari.ariari.commons.manager.MemberAlarmManger;
import com.ariari.ariari.commons.entity.Member;
import com.ariari.ariari.domain.admin.AdminMemberRepository;
import com.ariari.ariari.domain.member.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;
    private final MemberAlarmManger memberAlarmManger;
    private final AdminMemberRepository adminMemberRepository;

    @Transactional(readOnly = true)
    public PendingReportListRes getAllReports(Long memberId, Pageable pageable) {
        AdminMember reqMember = getMemberOrThrow(memberId);
        //검증 로직 추가해야함

        Page<Report> reports = reportRepository.findAll(pageable);

        return PendingReportListRes.fromPage(reports);
    }

    @Transactional(readOnly = true)
    public ResolvedReportListRes getAllResolvedReports(Long memberId, Pageable pageable) {
        AdminMember reqMember = getMemberOrThrow(memberId);
        //검증 로직 추가해야함
        Page<Report> reportPage = reportRepository.findAllByReportStatusType(ReportStatusType.RESOLVED, pageable);

        return ResolvedReportListRes.fromPage(reportPage);
    }

    @Transactional(readOnly = true)
    public ResolvedReportListRes searchReports(SearchReq searchReq, Long memberId, Pageable pageable) {
        AdminMember reqMember = getMemberOrThrow(memberId);
        //검증 로직 추가해야함
        Page<Report> reportPage = reportRepository.searchReports(searchReq, pageable);

        return ResolvedReportListRes.fromPage(reportPage);
    }

    @Transactional
    public void saveResolvedReport(ResolveSaveReq resolveSaveReq, Long memberId) {
        AdminMember reqMember = getMemberOrThrow(memberId);
        //검증 로직 추가해야함
        Report report = reportRepository.findById(resolveSaveReq.getReportId()).orElseThrow(NotFoundEntityException::new);
        report.resolve(resolveSaveReq.getResolveBody(), LocalDateTime.now(ZoneId.of("Asia/Seoul")));
        reportRepository.save(report);
    }

    @Transactional
    public void deleteReport(DeleteReportReq deleteReportReq, Long memberId) {
        AdminMember reqMember = adminMemberRepository.findById(memberId).orElseThrow(NotFoundEntityException::new);
        //검증 로직 추가해야함
        Report report = reportRepository.findWithReporterById(deleteReportReq.getReportId()).orElseThrow(NotFoundEntityException::new);

        reportRepository.delete(report);
        memberAlarmManger.sendReportDeleteNotification(report.getReporter(), deleteReportReq.getDeleteBody());
    }


    private AdminMember getMemberOrThrow(Long adminMemberId) {
        return adminMemberRepository.findById(adminMemberId).orElseThrow(NotFoundEntityException::new);
    }


}
