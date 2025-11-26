package com.ariari.ariari.domain.admin.dataops;

import com.ariari.ariari.domain.admin.dataops.dto.res.DeleteDataopsRes;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class HandleDataDeleteService {

    private final DataDeleteService dataDeleteService;

    @Transactional
    public DeleteDataopsRes handleDeleteData(String table, String id) {
        // 스네이크 케이스를 파스칼 케이스로 변환 (프론트엔드 호환)
        String normalizedTable = convertToPascalCase(table);

        switch (normalizedTable) {
            // ========== Member 도메인 ==========
            case "Member":
                return dataDeleteService.deleteMember(id);

            case "MemberAlarm":
                return dataDeleteService.deleteMemberAlarm(id);

            case "MemberReport":
                return dataDeleteService.deleteMemberReport(id);

            case "Block":
                return dataDeleteService.deleteBlock(id);

            case "Club":
                return dataDeleteService.deleteClub(id);

            case "ClubMember":
                return dataDeleteService.deleteClubMember(id);

            case "ClubBookmark":
                return dataDeleteService.deleteClubBookmark(id);

            case "ClubAlarm":
                return dataDeleteService.deleteClubAlarm(id);

            case "ClubReport":
                return dataDeleteService.deleteClubReport(id);

            case "ClubActivity":
                return dataDeleteService.deleteClubActivity(id);

            case "ClubActivityComment":
                return dataDeleteService.deleteClubActivityComment(id);

            case "ClubActivityLike":
                return dataDeleteService.deleteClubActivityLike(id);

            case "ClubActivityCommentLike":
                return dataDeleteService.deleteClubActivityCommentLike(id);

            case "ClubActivityImage":
                return dataDeleteService.deleteImage(id);

            case "ClubActivityReport":
                return dataDeleteService.deleteClubActivityReport(id);

            case "ClubActivityCommentReport":
                return dataDeleteService.deleteClubActivityCommentReport(id);

            case "ClubReview":
                return dataDeleteService.deleteClubReview(id);

            case "ClubReviewTag":
                return dataDeleteService.deleteClubReviewTag(id);

            case "ClubReviewReport":
                return dataDeleteService.deleteClubReviewReport(id);

            case "Tag":
                return DeleteDataopsRes.refused(normalizedTable, id);

            case "ClubQuestion":
                return dataDeleteService.deleteClubQuestion(id);

            case "ClubAnswer":
                return dataDeleteService.deleteClubAnswer(id);

            case "ClubQuestionReport":
                return dataDeleteService.deleteClubQuestionReport(id);

            case "PassReview":
                return dataDeleteService.deletePassReview(id);

            case "PassReviewNote":
                return dataDeleteService.deletePassReviewNote(id);

            case "PassReviewReport":
                return dataDeleteService.deletePassReviewReport(id);

            case "ClubEvent":
                return dataDeleteService.deleteClubEvent(id);

            case "Attendance":
                return dataDeleteService.deleteAttendance(id);

            case "ClubNotice":
                return dataDeleteService.deleteClubNotice(id);

            case "ClubNoticeImage":
                return dataDeleteService.deleteImage(id);

            case "ClubFaq":
                return dataDeleteService.deleteClubFaq(id);

            case "FinancialRecord":
                return dataDeleteService.deleteFinancialRecord(id);

            case "Recruitment":
                return dataDeleteService.deleteRecruitment(id);

            case "RecruitmentBookmark":
                return dataDeleteService.deleteRecruitmentBookmark(id);

            case "RecruitmentImage":
                return dataDeleteService.deleteImage(id);

            case "RecruitmentNote":
                return dataDeleteService.deleteRecruitmentNote(id);

            case "RecruitmentReport":
                return dataDeleteService.deleteRecruitmentReport(id);

            case "Apply":
                return dataDeleteService.deleteApply(id);

            case "ApplyAnswer":
                return dataDeleteService.deleteApplyAnswer(id);

            case "ApplyTemp":
                return dataDeleteService.deleteApplyTemp(id);

            case "ApplyAnswerTemp":
                return dataDeleteService.deleteApplyAnswerTemp(id);

            case "ApplyReport":
                return dataDeleteService.deleteApplyReport(id);

            case "ApplyForm":
                return dataDeleteService.deleteApplyForm(id);

            case "ApplyQuestion":
                return dataDeleteService.deleteApplyQuestion(id);

            case "SystemAlarm":
                return dataDeleteService.deleteSystemAlarm(id);

            case "SystemFaq":
                return dataDeleteService.deleteSystemFaq(id);

            case "SystemNotice":
                return dataDeleteService.deleteSystemNotice(id);

            case "SystemNoticeImage":
                return dataDeleteService.deleteImage(id);

            case "SystemTerm":
                return dataDeleteService.deleteSystemTerm(id);

            case "SecurityAccessLog":
                return dataDeleteService.deleteSecurityAccessLog(id);

            case "School":
                return DeleteDataopsRes.refused(normalizedTable, id);

            case "AdminMember":
                return DeleteDataopsRes.refused(normalizedTable, id);

            default:
                return DeleteDataopsRes.refused(normalizedTable, id);
        }
    }

    /**
     * 스네이크 케이스를 파스칼 케이스로 변환
     * 예: member_alarm -> MemberAlarm, club_activity_comment -> ClubActivityComment
     * 이미 파스칼 케이스인 경우 그대로 반환
     */
    private String convertToPascalCase(String input) {
        if (input == null || input.isEmpty()) {
            return input;
        }

        // 이미 파스칼 케이스인 경우 (언더스코어 없고 첫 글자가 대문자)
        if (!input.contains("_") && Character.isUpperCase(input.charAt(0))) {
            return input;
        }

        // 스네이크 케이스인 경우 변환
        StringBuilder result = new StringBuilder();
        String[] parts = input.split("_");

        for (String part : parts) {
            if (part.isEmpty()) continue;

            // 첫 글자를 대문자로, 나머지는 소문자로
            result.append(Character.toUpperCase(part.charAt(0)));
            if (part.length() > 1) {
                result.append(part.substring(1).toLowerCase());
            }
        }

        return result.toString();
    }
}
