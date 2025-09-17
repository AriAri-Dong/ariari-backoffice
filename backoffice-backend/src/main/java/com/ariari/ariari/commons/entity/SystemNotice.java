package com.ariari.ariari.commons.entity;

import com.ariari.ariari.commons.commonentity.LogicalDeleteEntity;
import com.ariari.ariari.commons.pkgenerator.CustomPkGenerate;
import com.ariari.ariari.domain.system.notice.enums.PopStatusType;
import jakarta.persistence.*;
import lombok.*;
import org.checkerframework.checker.units.qual.A;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@SQLDelete(sql = "UPDATE system_notice SET deleted_date_time= CURRENT_TIMESTAMP WHERE system_notice_id= ?")
@SQLRestriction("deleted_date_time is null")
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class SystemNotice extends LogicalDeleteEntity {

    @Id
    @CustomPkGenerate
    @Column(name = "system_notice_id")
    private Long id;

    @Column(length = 50)
    private String title;

    @Column(length = 1000)
    private String body;

    @Enumerated(EnumType.STRING)
    private PopStatusType postStatus;

    private boolean popupEnabled;

    private LocalDateTime popupStartDate;

    private LocalDateTime popupEndDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_id")
    private AdminMember createdBy; // 최초 작성자

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "updated_by_id")
    private AdminMember updatedBy; // 마지막 수정자

    @Version
    private Long version;

    @Setter
    @OneToMany(mappedBy = "systemNotice", cascade = CascadeType.ALL)
    @Builder.Default
    private List<SystemNoticeImage> systemNoticeImages = new ArrayList<>();


    public static SystemNotice create(String title, String body, AdminMember adminMember,
                                      PopStatusType postStatus, boolean popupEnabled, LocalDateTime popupStartDate, LocalDateTime popupEndDate) {
        return SystemNotice.builder()
                .title(title)
                .body(body)
                .createdBy(adminMember)
                .updatedBy(adminMember)
                .postStatus(postStatus)
                .popupEnabled(popupEnabled)
                .popupStartDate(popupStartDate)
                .popupEndDate(popupEndDate)
                .build();
    }


    public void modify(String title,
                       String body,
                       boolean popupEnabled,
                       PopStatusType postStatus,
                       LocalDateTime popupStartDate,
                       LocalDateTime popupEndDate,
                       AdminMember updatedBy) {
        this.title = title;
        this.body = body;
        this.popupEnabled = popupEnabled;
        this.postStatus = postStatus;
        this.popupStartDate = popupStartDate;
        this.popupEndDate = popupEndDate;
        this.updatedBy = updatedBy;
    }


}
