package com.ariari.ariari.commons.entity;

import com.ariari.ariari.commons.commonentity.report.Report;
import com.ariari.ariari.commons.commonentity.report.enums.LocationType;
import com.ariari.ariari.commons.enums.ReportType;
import com.ariari.ariari.commons.entity.Member;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@SQLDelete(sql = "UPDATE report SET deleted_date_time = CURRENT_TIMESTAMP WHERE report_id = ?")
@SQLRestriction("deleted_date_time IS NULL")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class ClubActivityReport extends Report {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reported_club_activity_id")
    private ClubActivity reportedClubActivity;

    @Builder
    public ClubActivityReport(ReportType reportType , String body, Member reporter, ClubActivity reportedClubActivity, String locationUrl, LocationType locationType) {
        super(reportType, body, reporter, locationUrl, locationType);
        this.reportedClubActivity = reportedClubActivity;
    }

}
