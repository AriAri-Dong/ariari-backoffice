package com.ariari.ariari.domain.club.activity.comment.report;

import com.ariari.ariari.commons.entity.report.Report;
import com.ariari.ariari.commons.entity.report.enums.LocationType;
import com.ariari.ariari.commons.enums.ReportType;
import com.ariari.ariari.domain.club.activity.comment.ClubActivityComment;
import com.ariari.ariari.domain.member.Member;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@SQLDelete(sql = "UPDATE report SET deleted_date_time = CURRENT_TIMESTAMP WHERE report_id = ?")
@SQLRestriction("deleted_date_time IS NULL")
@Entity
@NoArgsConstructor
@Getter
public class ClubActivityCommentReport extends Report{


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reported_club_activity_comment_id")
    private ClubActivityComment reportedClubActivityComment;

    @Builder
    public ClubActivityCommentReport(ReportType reportType,
                                     String body,
                                     Member reporter,
                                     ClubActivityComment reportedClubActivityComment,
                                     String locationUrl,
                                     LocationType locationType
    ){
        super(reportType, body, reporter, locationUrl, locationType);
        this.reportedClubActivityComment = reportedClubActivityComment;
    }

}
