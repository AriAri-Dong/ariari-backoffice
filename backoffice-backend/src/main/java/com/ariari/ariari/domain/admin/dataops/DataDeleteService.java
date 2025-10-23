package com.ariari.ariari.domain.admin.dataops;

import com.ariari.ariari.commons.auth.oauth.KakaoAuthManager;
import com.ariari.ariari.commons.commonentity.image.Image;
import com.ariari.ariari.commons.commonentity.image.ImageRepository;
import com.ariari.ariari.commons.commonentity.report.ReportRepository;
import com.ariari.ariari.commons.entity.*;
import com.ariari.ariari.commons.exception.exceptions.DeleteDataException;
import com.ariari.ariari.commons.exception.exceptions.NotFoundEntityException;
import com.ariari.ariari.commons.server.SecurityAccessLogRepository;
import com.ariari.ariari.domain.admin.dataops.dto.res.DeleteDataopsRes;
import com.ariari.ariari.domain.club.activity.ClubActivityRepository;
import com.ariari.ariari.domain.club.activity.comment.ClubActivityCommentRepository;
import com.ariari.ariari.domain.club.activity.comment.like.ClubActivityCommentLikeRepository;
import com.ariari.ariari.domain.club.activity.comment.report.ClubActivityCommentReportRepository;
import com.ariari.ariari.domain.club.activity.like.ClubActivityLikeRepository;
import com.ariari.ariari.domain.club.activity.report.ClubActivityReportRepository;
import com.ariari.ariari.domain.club.alarm.ClubAlarmRepository;
import com.ariari.ariari.domain.club.bookmark.ClubBookmarkRepository;
import com.ariari.ariari.domain.club.club.ClubRepository;
import com.ariari.ariari.domain.club.clubmember.ClubMemberRepository;
import com.ariari.ariari.domain.club.clubmember.enums.ClubMemberRoleType;
import com.ariari.ariari.domain.club.event.ClubEventRepository;
import com.ariari.ariari.domain.club.event.attendance.AttendanceRepository;
import com.ariari.ariari.domain.club.faq.ClubFaqRepository;
import com.ariari.ariari.domain.club.financial.FinancialRecordRepository;
import com.ariari.ariari.domain.club.notice.ClubNoticeRepository;
import com.ariari.ariari.domain.club.passreview.report.PassReviewReportRepository;
import com.ariari.ariari.domain.club.passreview.repository.PassReviewNoteRepository;
import com.ariari.ariari.domain.club.passreview.repository.PassReviewRepository;
import com.ariari.ariari.domain.club.question.ClubQuestionRepository;
import com.ariari.ariari.domain.club.question.answer.ClubAnswerRepository;
import com.ariari.ariari.domain.club.question.report.ClubQuestionReportRepository;
import com.ariari.ariari.domain.club.report.ClubReportRepository;
import com.ariari.ariari.domain.club.review.report.ClubReviewReportRepository;
import com.ariari.ariari.domain.club.review.repository.ClubReviewRepository;
import com.ariari.ariari.domain.club.review.repository.ClubReviewTagRepository;
import com.ariari.ariari.domain.member.alarm.MemberAlarmRepository;
import com.ariari.ariari.domain.member.block.BlockRepository;
import com.ariari.ariari.domain.member.member.MemberRepository;
import com.ariari.ariari.domain.member.report.MemberReportRepository;
import com.ariari.ariari.domain.recruitment.apply.ApplyRepository;
import com.ariari.ariari.domain.recruitment.apply.answer.ApplyAnswerRepository;
import com.ariari.ariari.domain.recruitment.apply.report.ApplyReportRepository;
import com.ariari.ariari.domain.recruitment.apply.temp.ApplyTempRepository;
import com.ariari.ariari.domain.recruitment.apply.temp.answer.ApplyAnswerTempRepository;
import com.ariari.ariari.domain.recruitment.applyform.ApplyFormRepository;
import com.ariari.ariari.domain.recruitment.applyform.applyquestion.ApplyQuestionRepository;
import com.ariari.ariari.domain.recruitment.bookmark.RecruitmentBookmarkRepository;
import com.ariari.ariari.domain.recruitment.note.RecruitmentNoteRepository;
import com.ariari.ariari.domain.recruitment.recruitment.RecruitmentRepository;
import com.ariari.ariari.domain.recruitment.report.RecruitmentReportRepository;
import com.ariari.ariari.domain.system.alarm.SystemAlarmRepository;
import com.ariari.ariari.domain.system.faq.SystemFaqRepository;
import com.ariari.ariari.domain.system.notice.SystemNoticeRepository;
import com.ariari.ariari.domain.system.term.SystemTermRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class DataDeleteService {
    private final MemberRepository memberRepository;
    private final PassReviewRepository passReviewRepository;
    private final ClubReviewRepository clubReviewRepository;
    private final ReportRepository reportRepository;
    private final ClubNoticeRepository clubNoticeRepository;
    private final ClubQuestionRepository clubQuestionRepository;
    private final ClubActivityRepository clubActivityRepository;
    private final ClubActivityCommentRepository clubActivityCommentRepository;
    private final ClubMemberRepository clubMemberRepository;
    private final ClubRepository clubRepository;

    private final KakaoAuthManager kakaoAuthManager;
    private final MemberAlarmRepository memberAlarmRepository;
    private final MemberReportRepository memberReportRepository;
    private final BlockRepository blockRepository;
    private final ClubBookmarkRepository clubBookmarkRepository;
    private final ClubAlarmRepository clubAlarmRepository;
    private final ClubReportRepository clubReportRepository;
    private final ClubActivityLikeRepository clubActivityLikeRepository;
    private final ClubActivityCommentLikeRepository clubActivityCommentLikeRepository;
    private final ImageRepository imageRepository;
    private final ClubActivityReportRepository clubActivityReportRepository;
    private final ClubActivityCommentReportRepository clubActivityCommentReportRepository;
    private final ClubReviewTagRepository clubReviewTagRepository;
    private final ClubReviewReportRepository clubReviewReportRepository;
    private final ClubAnswerRepository clubAnswerRepository;
    private final ClubQuestionReportRepository clubQuestionReportRepository;
    private final PassReviewNoteRepository passReviewNoteRepository;
    private final PassReviewReportRepository passReviewReportRepository;
    private final ClubEventRepository clubEventRepository;
    private final AttendanceRepository attendanceRepository;
    private final ClubFaqRepository clubFaqRepository;
    private final FinancialRecordRepository financialRecordRepository;
    private final RecruitmentRepository recruitmentRepository;
    private final RecruitmentBookmarkRepository recruitmentBookmarkRepository;
    private final RecruitmentNoteRepository recruitmentNoteRepository;
    private final RecruitmentReportRepository recruitmentReportRepository;
    private final ApplyRepository applyRepository;
    private final ApplyAnswerRepository applyAnswerRepository;
    private final ApplyTempRepository applyTempRepository;
    private final ApplyAnswerTempRepository applyAnswerTempRepository;
    private final ApplyReportRepository applyReportRepository;
    private final ApplyFormRepository applyFormRepository;
    private final ApplyQuestionRepository applyQuestionRepository;
    private final SystemAlarmRepository systemAlarmRepository;
    private final SystemFaqRepository systemFaqRepository;
    private final SystemNoticeRepository systemNoticeRepository;
    private final SystemTermRepository systemTermRepository;
    private final SecurityAccessLogRepository securityAccessLogRepository;

    @PersistenceContext
    private EntityManager em;

    public DeleteDataopsRes deleteMember(String id) throws DeleteDataException {
        Long reqMemberId = Long.parseLong(id);
        Member reqMember = memberRepository.findById(reqMemberId).orElseThrow(NotFoundEntityException::new);

        // handle ADMIN club
        entrustClubAdmin(reqMember);

        // member_id -> null
        // persistence context clear after update query
        passReviewRepository.updateMemberNull(reqMember);
        clubReviewRepository.updateMemberNull(reqMember);
        reportRepository.updateMemberNull(reqMember);
        clubNoticeRepository.updateMemberNull(reqMember);
        clubQuestionRepository.updateMemberNull(reqMember);
        clubActivityRepository.updateMemberNull(reqMember);
        clubActivityCommentRepository.updateMemberNull(reqMember);
        clubMemberRepository.updateMemberNull(reqMember);

        // flush and clear for sync between memory and DB
        em.flush();
        em.clear();

        // reload reqMember to reattach it
        reqMember = memberRepository.findById(reqMemberId).orElseThrow(NotFoundEntityException::new);
        kakaoAuthManager.unregister(reqMember);
        em.flush(); // for forcing dirty checking update

        memberRepository.delete(reqMember);

        return DeleteDataopsRes.success("Member", id);
    }

    void entrustClubAdmin(Member reqMember) {
        List<Club> clubs = reqMember.getClubMembers().stream().map(ClubMember::getClub).toList();

        for (Club club : clubs) {
            ClubMember clubMember = clubMemberRepository.findByClubAndMember(club, reqMember).get();

            if (clubMember.getClubMemberRoleType() == ClubMemberRoleType.ADMIN) {
                List<ClubMember> cmList = clubMemberRepository.findByClubAndClubMemberRoleTypeExceptMember(club, ClubMemberRoleType.MANAGER, reqMember);
                if (!cmList.isEmpty()) {
                    cmList.get(0).setClubMemberRoleType(ClubMemberRoleType.ADMIN);
                } else {
                    List<ClubMember> cmList2 = clubMemberRepository.findByClubAndClubMemberRoleTypeExceptMember(club, ClubMemberRoleType.GENERAL, reqMember);
                    if (!cmList2.isEmpty()) {
                        cmList2.get(0).setClubMemberRoleType(ClubMemberRoleType.ADMIN);
                    } else {
                        clubRepository.delete(club);
                    }
                }
            }
        }
    }

    public DeleteDataopsRes deleteMemberAlarm(String id) throws DeleteDataException {
        Long reqMemberAlarmId = Long.parseLong(id);
        MemberAlarm memberAlarm = memberAlarmRepository.findById(reqMemberAlarmId)
                .orElseThrow(NotFoundEntityException::new);

        // MemberAlarm은 논리삭제 엔티티이며, 다른 테이블이 참조하지 않으므로 단순 삭제
        memberAlarmRepository.delete(memberAlarm);

        return DeleteDataopsRes.success("MemberAlarm", id);
    }

    public DeleteDataopsRes deleteMemberReport(String id) throws DeleteDataException {
        Long reqMemberReportId = Long.parseLong(id);
        MemberReport memberReport = memberReportRepository.findById(reqMemberReportId).orElseThrow(NotFoundEntityException::new);

        memberReportRepository.delete(memberReport);

        return DeleteDataopsRes.success("MemberReport", id);
    }

    public DeleteDataopsRes deleteBlock(String id) throws DeleteDataException {
        Long reqBlockId = Long.parseLong(id);
        Block block = blockRepository.findById(reqBlockId).orElseThrow(NotFoundEntityException::new);

        blockRepository.delete(block);

        return DeleteDataopsRes.success("Block", id);
    }

    public DeleteDataopsRes deleteClub(String id) throws DeleteDataException {
        Long reqClubId = Long.parseLong(id);
        Club club = clubRepository.findById(reqClubId).orElseThrow(NotFoundEntityException::new);

        // TODO : 로직 작성 필요

        return DeleteDataopsRes.success("Club", id);
    }

    public DeleteDataopsRes deleteClubMember(String id) throws DeleteDataException {
        Long reqClubMemberId = Long.parseLong(id);
        ClubMember clubMember = clubMemberRepository.findById(reqClubMemberId).orElseThrow(NotFoundEntityException::new);

        // TODO : 로직 작성 필요

        return DeleteDataopsRes.success("ClubMember", id);
    }

    public DeleteDataopsRes deleteClubBookmark(String id) throws DeleteDataException {
        Long reqClubBookmarkId = Long.parseLong(id);
        ClubBookmark clubBookmark = clubBookmarkRepository.findById(reqClubBookmarkId).orElseThrow(NotFoundEntityException::new);

        clubBookmarkRepository.delete(clubBookmark);

        return DeleteDataopsRes.success("ClubBookmark", id);
    }

    public DeleteDataopsRes deleteClubAlarm(String id) throws DeleteDataException {
        Long reqClubAlarmId = Long.parseLong(id);
        ClubAlarm clubAlarm = clubAlarmRepository.findById(reqClubAlarmId).orElseThrow(NotFoundEntityException::new);

        clubAlarmRepository.delete(clubAlarm);

        return DeleteDataopsRes.success("ClubAlarm", id);
    }

    public DeleteDataopsRes deleteClubReport(String id) throws DeleteDataException {
        Long reqClubReportId = Long.parseLong(id);
        ClubReport clubReport = clubReportRepository.findById(reqClubReportId).orElseThrow(NotFoundEntityException::new);

        clubReportRepository.delete(clubReport);

        return DeleteDataopsRes.success("ClubReport", id);
    }

    public DeleteDataopsRes deleteClubActivity(String id) throws DeleteDataException {
        Long reqClubActivityId = Long.parseLong(id);
        ClubActivity clubActivity = clubActivityRepository.findById(reqClubActivityId).orElseThrow(NotFoundEntityException::new);

        // TODO : 로직 작성 필요

        return DeleteDataopsRes.success("ClubActivity", id);
    }

    public DeleteDataopsRes deleteClubActivityComment(String id) throws DeleteDataException {
        Long reqClubActivityCommentId = Long.parseLong(id);
        ClubActivityComment clubActivityComment = clubActivityCommentRepository.findById(reqClubActivityCommentId).orElseThrow(NotFoundEntityException::new);

        // TODO : 로직 작성 필요

        return DeleteDataopsRes.success("ClubActivityComment", id);
    }

    public DeleteDataopsRes deleteClubActivityLike(String id) throws DeleteDataException {
        Long reqClubActivityLikeId = Long.parseLong(id);
        ClubActivityLike clubActivityLike = clubActivityLikeRepository.findById(reqClubActivityLikeId).orElseThrow(NotFoundEntityException::new);

        clubActivityLikeRepository.delete(clubActivityLike);

        return DeleteDataopsRes.success("ClubActivityLike", id);
    }

    public DeleteDataopsRes deleteClubActivityCommentLike(String id) throws DeleteDataException {
        Long reqClubActivityCommentLikeId = Long.parseLong(id);
        ClubActivityCommentLike clubActivityCommentLike = clubActivityCommentLikeRepository.findById(reqClubActivityCommentLikeId).orElseThrow(NotFoundEntityException::new);

        clubActivityCommentLikeRepository.delete(clubActivityCommentLike);

        return DeleteDataopsRes.success("ClubActivityCommentLike", id);
    }

    public DeleteDataopsRes deleteImage(String id) throws DeleteDataException {
        Long reqImageId = Long.parseLong(id);
        Image image = imageRepository.findById(reqImageId).orElseThrow(NotFoundEntityException::new);

        imageRepository.delete(image);

        return DeleteDataopsRes.success("Image", id);
    }

    public DeleteDataopsRes deleteClubActivityReport(String id) throws DeleteDataException {
        Long reqClubActivityReportId = Long.parseLong(id);
        ClubActivityReport clubActivityReport = clubActivityReportRepository.findById(reqClubActivityReportId).orElseThrow(NotFoundEntityException::new);

        clubActivityReportRepository.delete(clubActivityReport);

        return DeleteDataopsRes.success("ClubActivityReport", id);
    }

    public DeleteDataopsRes deleteClubActivityCommentReport(String id) throws DeleteDataException {
        Long reqClubActivityCommentReportId = Long.parseLong(id);
        ClubActivityCommentReport clubActivityCommentReport = clubActivityCommentReportRepository.findById(reqClubActivityCommentReportId).orElseThrow(NotFoundEntityException::new);

        clubActivityCommentReportRepository.delete(clubActivityCommentReport);

        return DeleteDataopsRes.success("ClubActivityCommentReport", id);
    }

    public DeleteDataopsRes deleteClubReview(String id) throws DeleteDataException {
        Long reqClubReviewId = Long.parseLong(id);
        ClubReview clubReview = clubReviewRepository.findById(reqClubReviewId).orElseThrow(NotFoundEntityException::new);

        // TODO : 로직 작성 필요

        return DeleteDataopsRes.success("ClubReview", id);
    }

    public DeleteDataopsRes deleteClubReviewTag(String id) throws DeleteDataException {
        Long reqClubReviewTagId = Long.parseLong(id);
        ClubReviewTag clubReviewTag = clubReviewTagRepository.findById(reqClubReviewTagId).orElseThrow(NotFoundEntityException::new);

        clubReviewTagRepository.delete(clubReviewTag);

        return DeleteDataopsRes.success("ClubReviewTag", id);
    }

    public DeleteDataopsRes deleteClubReviewReport(String id) throws DeleteDataException {
        Long reqClubReviewReportId = Long.parseLong(id);
        ClubReviewReport clubReviewReport = clubReviewReportRepository.findById(reqClubReviewReportId).orElseThrow(NotFoundEntityException::new);

        clubReviewReportRepository.delete(clubReviewReport);

        return DeleteDataopsRes.success("ClubReviewReport", id);
    }

    public DeleteDataopsRes deleteClubQuestion(String id) throws DeleteDataException {
        Long reqClubQuestionId = Long.parseLong(id);
        ClubQuestion clubQuestion = clubQuestionRepository.findById(reqClubQuestionId).orElseThrow(NotFoundEntityException::new);

        // TODO : 로직 작성 필요

        return DeleteDataopsRes.success("ClubQuestion", id);
    }

    public DeleteDataopsRes deleteClubAnswer(String id) throws DeleteDataException {
        Long reqClubAnswerId = Long.parseLong(id);
        ClubAnswer clubAnswer = clubAnswerRepository.findById(reqClubAnswerId).orElseThrow(NotFoundEntityException::new);

        // TODO : 로직 작성 필요

        return DeleteDataopsRes.success("ClubAnswer", id);
    }

    public DeleteDataopsRes deleteClubQuestionReport(String id) throws DeleteDataException {
        Long reqClubQuestionReportId = Long.parseLong(id);
        ClubQuestionReport clubQuestionReport = clubQuestionReportRepository.findById(reqClubQuestionReportId).orElseThrow(NotFoundEntityException::new);

        clubQuestionReportRepository.delete(clubQuestionReport);

        return DeleteDataopsRes.success("ClubQuestionReport", id);
    }

    public DeleteDataopsRes deletePassReview(String id) throws DeleteDataException {
        Long reqPassReviewId = Long.parseLong(id);
        PassReview passReview = passReviewRepository.findById(reqPassReviewId).orElseThrow(NotFoundEntityException::new);

        // TODO : 로직 작성 필요

        return DeleteDataopsRes.success("PassReview", id);
    }

    public DeleteDataopsRes deletePassReviewNote(String id) throws DeleteDataException {
        Long reqPassReviewNoteId = Long.parseLong(id);
        PassReviewNote passReviewNote = passReviewNoteRepository.findById(reqPassReviewNoteId).orElseThrow(NotFoundEntityException::new);

        passReviewNoteRepository.delete(passReviewNote);

        return DeleteDataopsRes.success("PassReviewNote", id);
    }

    public DeleteDataopsRes deletePassReviewReport(String id) throws DeleteDataException {
        Long reqPassReviewReportId = Long.parseLong(id);
        PassReviewReport passReviewReport = passReviewReportRepository.findById(reqPassReviewReportId).orElseThrow(NotFoundEntityException::new);

        passReviewReportRepository.delete(passReviewReport);

        return DeleteDataopsRes.success("PassReviewReport", id);
    }

    public DeleteDataopsRes deleteClubEvent(String id) throws DeleteDataException {
        Long reqClubEventId = Long.parseLong(id);
        ClubEvent clubEvent = clubEventRepository.findById(reqClubEventId).orElseThrow(NotFoundEntityException::new);

        // TODO : 로직 작성 필요

        return DeleteDataopsRes.success("ClubEvent", id);
    }

    public DeleteDataopsRes deleteAttendance(String id) throws DeleteDataException {
        Long reqAttendanceId = Long.parseLong(id);
        Attendance attendance = attendanceRepository.findById(reqAttendanceId).orElseThrow(NotFoundEntityException::new);

        attendanceRepository.delete(attendance);

        return DeleteDataopsRes.success("Attendance", id);
    }

    public DeleteDataopsRes deleteClubNotice(String id) throws DeleteDataException {
        Long reqClubNoticeId = Long.parseLong(id);
        ClubNotice clubNotice = clubNoticeRepository.findById(reqClubNoticeId).orElseThrow(NotFoundEntityException::new);

        // TODO : 로직 작성 필요

        return DeleteDataopsRes.success("ClubNotice", id);
    }

    public DeleteDataopsRes deleteClubFaq(String id) throws DeleteDataException {
        Long reqClubFaqId = Long.parseLong(id);
        ClubFaq clubFaq = clubFaqRepository.findById(reqClubFaqId).orElseThrow(NotFoundEntityException::new);

        clubFaqRepository.delete(clubFaq);

        return DeleteDataopsRes.success("ClubFaq", id);
    }

    public DeleteDataopsRes deleteFinancialRecord(String id) throws DeleteDataException {
        Long reqFinancialRecordId = Long.parseLong(id);
        FinancialRecord financialRecord = financialRecordRepository.findById(reqFinancialRecordId).orElseThrow(NotFoundEntityException::new);

        financialRecordRepository.delete(financialRecord);

        return DeleteDataopsRes.success("FinancialRecord", id);
    }

    public DeleteDataopsRes deleteRecruitment(String id) throws DeleteDataException {
        Long reqRecruitmentId = Long.parseLong(id);
        Recruitment recruitment = recruitmentRepository.findById(reqRecruitmentId).orElseThrow(NotFoundEntityException::new);

        // TODO : 로직 작성 필요

        return DeleteDataopsRes.success("Recruitment", id);
    }

    public DeleteDataopsRes deleteRecruitmentBookmark(String id) throws DeleteDataException {
        Long reqRecruitmentBookmarkId = Long.parseLong(id);
        RecruitmentBookmark recruitmentBookmark = recruitmentBookmarkRepository.findById(reqRecruitmentBookmarkId).orElseThrow(NotFoundEntityException::new);

        recruitmentBookmarkRepository.delete(recruitmentBookmark);

        return DeleteDataopsRes.success("RecruitmentBookmark", id);
    }

    public DeleteDataopsRes deleteRecruitmentNote(String id) throws DeleteDataException {
        Long reqRecruitmentNoteId = Long.parseLong(id);
        RecruitmentNote recruitmentNote = recruitmentNoteRepository.findById(reqRecruitmentNoteId).orElseThrow(NotFoundEntityException::new);

        recruitmentNoteRepository.delete(recruitmentNote);

        return DeleteDataopsRes.success("RecruitmentNote", id);
    }

    public DeleteDataopsRes deleteRecruitmentReport(String id) throws DeleteDataException {
        Long reqRecruitmentReportId = Long.parseLong(id);
        RecruitmentReport recruitmentReport = recruitmentReportRepository.findById(reqRecruitmentReportId).orElseThrow(NotFoundEntityException::new);

        recruitmentReportRepository.delete(recruitmentReport);

        return DeleteDataopsRes.success("RecruitmentReport", id);
    }

    public DeleteDataopsRes deleteApply(String id) throws DeleteDataException {
        Long reqApplyId = Long.parseLong(id);
        Apply apply = applyRepository.findById(reqApplyId).orElseThrow(NotFoundEntityException::new);

        // TODO : 로직 작성 필요

        return DeleteDataopsRes.success("Apply", id);
    }

    public DeleteDataopsRes deleteApplyAnswer(String id) throws DeleteDataException {
        Long reqApplyAnswerId = Long.parseLong(id);
        ApplyAnswer applyAnswer = applyAnswerRepository.findById(reqApplyAnswerId).orElseThrow(NotFoundEntityException::new);

        applyAnswerRepository.delete(applyAnswer);

        return DeleteDataopsRes.success("ApplyAnswer", id);
    }

    public DeleteDataopsRes deleteApplyTemp(String id) throws DeleteDataException {
        Long reqApplyTempId = Long.parseLong(id);
        ApplyTemp applyTemp = applyTempRepository.findById(reqApplyTempId).orElseThrow(NotFoundEntityException::new);

        // TODO : 로직 작성 필요

        return DeleteDataopsRes.success("ApplyTemp", id);
    }

    public DeleteDataopsRes deleteApplyAnswerTemp(String id) throws DeleteDataException {
        Long reqApplyAnswerTempId = Long.parseLong(id);
        ApplyAnswerTemp applyAnswerTemp = applyAnswerTempRepository.findById(reqApplyAnswerTempId).orElseThrow(NotFoundEntityException::new);

        applyAnswerTempRepository.delete(applyAnswerTemp);

        return DeleteDataopsRes.success("ApplyAnswerTemp", id);
    }

    public DeleteDataopsRes deleteApplyReport(String id) throws DeleteDataException {
        Long reqApplyReportId = Long.parseLong(id);
        ApplyReport applyReport = applyReportRepository.findById(reqApplyReportId).orElseThrow(NotFoundEntityException::new);

        applyReportRepository.delete(applyReport);

        return DeleteDataopsRes.success("ApplyReport", id);
    }

    public DeleteDataopsRes deleteApplyForm(String id) throws DeleteDataException {
        Long reqApplyFormId = Long.parseLong(id);
        ApplyForm applyForm = applyFormRepository.findById(reqApplyFormId).orElseThrow(NotFoundEntityException::new);

        // TODO : 로직 작성 필요

        return DeleteDataopsRes.success("ApplyForm", id);
    }

    public DeleteDataopsRes deleteApplyQuestion(String id) throws DeleteDataException {
        Long reqApplyQuestionId = Long.parseLong(id);
        ApplyQuestion applyQuestion = applyQuestionRepository.findById(reqApplyQuestionId).orElseThrow(NotFoundEntityException::new);

        // TODO : 로직 작성 필요

        return DeleteDataopsRes.success("ApplyQuestion", id);
    }

    public DeleteDataopsRes deleteSystemAlarm(String id) throws DeleteDataException {
        Long reqSystemAlarmId = Long.parseLong(id);
        SystemAlarm systemAlarm = systemAlarmRepository.findById(reqSystemAlarmId).orElseThrow(NotFoundEntityException::new);

        systemAlarmRepository.delete(systemAlarm);

        return DeleteDataopsRes.success("SystemAlarm", id);
    }

    public DeleteDataopsRes deleteSystemFaq(String id) throws DeleteDataException {
        Long reqSystemFaqId = Long.parseLong(id);
        SystemFaq systemFaq = systemFaqRepository.findById(reqSystemFaqId).orElseThrow(NotFoundEntityException::new);

        systemFaqRepository.delete(systemFaq);

        return DeleteDataopsRes.success("SystemFaq", id);
    }

    public DeleteDataopsRes deleteSystemNotice(String id) throws DeleteDataException {
        Long reqSystemNoticeId = Long.parseLong(id);
        SystemNotice systemNotice = systemNoticeRepository.findById(reqSystemNoticeId).orElseThrow(NotFoundEntityException::new);

        systemNoticeRepository.delete(systemNotice);

        return DeleteDataopsRes.success("SystemNotice", id);
    }

    public DeleteDataopsRes deleteSystemTerm(String id) throws DeleteDataException {
        Long reqSystemTermId = Long.parseLong(id);
        SystemTerm systemTerm = systemTermRepository.findById(reqSystemTermId).orElseThrow(NotFoundEntityException::new);

        systemTermRepository.delete(systemTerm);

        return DeleteDataopsRes.success("SystemTerm", id);
    }

    public DeleteDataopsRes deleteSecurityAccessLog(String id) throws DeleteDataException {
        Long reqSecurityAccessLogId = Long.parseLong(id);
        SecurityAccessLog securityAccessLog = securityAccessLogRepository.findById(reqSecurityAccessLogId).orElseThrow(NotFoundEntityException::new);

        securityAccessLogRepository.delete(securityAccessLog);

        return DeleteDataopsRes.success("SecurityAccessLog", id);
    }
}
