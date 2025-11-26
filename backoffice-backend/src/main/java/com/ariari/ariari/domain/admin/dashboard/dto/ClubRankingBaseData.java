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
        // 빈 리스트면 바로 리턴
        if(clubRankingBaseDataList.isEmpty()){
            return;
        }

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

        // ZeroDivision 방지: 모든 점수가 같거나 동아리가 1개인 경우
        int scoreDifference = maxScore - minScore;
        if(scoreDifference == 0){
            // 모든 동아리에 동일한 점수 부여
            for(ClubRankingBaseData clubRankingBaseData : clubRankingBaseDataList){
                clubRankingBaseData.setRegularizedScore(100.0);
            }
            return;
        }

        for(ClubRankingBaseData clubRankingBaseData : clubRankingBaseDataList){
            double rawScore = (double) (clubRankingBaseData.getTotalScore() - minScore) / (double) scoreDifference;
            // 100을 곱하고 소수점 1자리까지 반올림 (0~100 범위)
            double roundedScore = Math.round(rawScore * 1000.0) / 10.0;
            clubRankingBaseData.setRegularizedScore(roundedScore);
        }
    }
}