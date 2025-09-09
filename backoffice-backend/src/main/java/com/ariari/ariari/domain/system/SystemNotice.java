package com.ariari.ariari.domain.system;

import com.ariari.ariari.commons.entity.LogicalDeleteEntity;
import com.ariari.ariari.commons.pkgenerator.CustomPkGenerate;
import com.ariari.ariari.domain.club.notice.image.ClubNoticeImage;
import com.ariari.ariari.domain.member.Member;
import com.ariari.ariari.domain.system.image.SystemNoticeImage;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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
public class SystemNotice extends LogicalDeleteEntity {

    @Id
    @CustomPkGenerate
    @Column(name = "system_notice_id")
    private Long id;

    @Column(length = 50)
    private String title;

    @Column(length = 1000)
    private String body;

    private boolean isPopup;

    private LocalDateTime popupStartDate;

    private LocalDateTime popupEndDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Setter
    @OneToMany(mappedBy = "systemNotice", cascade = CascadeType.ALL)
    private List<SystemNoticeImage> systemNoticeImages = new ArrayList<>();

    @Builder
    private SystemNotice(String title, String body, Member member,
                         boolean isPopup, LocalDateTime popupStartDate, LocalDateTime popupEndDate) {
        this.title = title;
        this.body = body;
        this.member = member;
        this.isPopup = isPopup;
        this.popupStartDate = popupStartDate;
        this.popupEndDate = popupEndDate;
    }

    public static SystemNotice create(String title, String body, Member member, boolean isPopup, LocalDateTime popupStartDate, LocalDateTime popupEndDate) {
        return SystemNotice.builder()
                .title(title)
                .body(body)
                .isPopup(isPopup)
                .member(member)
                .popupStartDate(popupStartDate)
                .popupEndDate(popupEndDate)
                .build();
    }


    public void modify(String title, String body) {
        this.title = title;
        this.body = body;
    }


}
