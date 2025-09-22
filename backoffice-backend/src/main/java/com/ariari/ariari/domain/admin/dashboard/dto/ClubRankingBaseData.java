package com.ariari.ariari.domain.admin.dashboard.dto;

import lombok.Data;

import java.util.List;

@Data
public class ClubRankingBaseData {
    // 동아리 기본 정보
    private Long clubId;
    private String clubName;
    private Integer clubRanking;

    // 랭킹 계산용 원본 데이터
    private Integer totalScore = 0;
    private Double regularizedScore = 0.0;
    private Integer memberCount;              // 동아리별 회원 수
    private Integer activityPostCount;        // 활동내역 게시글 수
    private Integer activityCommentCount;     // 활동내역 게시글의 댓글 수
    private Integer activityLikeCount;        // 활동내역 게시글 좋아요 수
    private Integer clubViews;                // 동아리 조회수 (club의 views)
    private Integer clubRecruitmentViews; // 동아리 모집 조회수 (recruitment의 views)
    private Integer recentParticipantCount;       // 최근 3일간 들어온 유저 수

    public static void initData(List<ClubRankingBaseData> clubRankingBaseDataList){
        for(ClubRankingBaseData clubRankingBaseData : clubRankingBaseDataList){
            clubRankingBaseData.setTotalScore(clubRankingBaseData.getTotalScore() + clubRankingBaseData.getMemberCount() * 37);
            clubRankingBaseData.setTotalScore(clubRankingBaseData.getTotalScore() + clubRankingBaseData.getActivityPostCount() * 14);
            clubRankingBaseData.setTotalScore(clubRankingBaseData.getTotalScore() + clubRankingBaseData.getActivityCommentCount() * 14);
            clubRankingBaseData.setTotalScore(clubRankingBaseData.getTotalScore() + clubRankingBaseData.getActivityLikeCount() * 7);
            clubRankingBaseData.setTotalScore(clubRankingBaseData.getTotalScore() +
                    (clubRankingBaseData.getClubViews() + clubRankingBaseData.getClubRecruitmentViews()) * 14);
            clubRankingBaseData.setTotalScore(clubRankingBaseData.getTotalScore() + clubRankingBaseData.recentParticipantCount * 14);
        }
    }

    public static void regularizeData(List<ClubRankingBaseData> clubRankingBaseDataList){
        int minScore = 99999999;
        int maxScore = 0;

        for(ClubRankingBaseData clubRankingBaseData : clubRankingBaseDataList){
            if(clubRankingBaseData.getTotalScore() < minScore){
                minScore = clubRankingBaseData.getTotalScore();
            }
            if(clubRankingBaseData.getTotalScore() > maxScore){
                maxScore = clubRankingBaseData.getTotalScore();
            }
        }

        for(ClubRankingBaseData clubRankingBaseData : clubRankingBaseDataList){
            clubRankingBaseData.setRegularizedScore((double) ((clubRankingBaseData.getTotalScore() - minScore) / (maxScore - minScore)));
        }
    }
}