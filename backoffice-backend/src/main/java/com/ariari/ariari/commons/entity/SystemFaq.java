package com.ariari.ariari.commons.entity;

import com.ariari.ariari.commons.commonentity.LogicalDeleteEntity;
import com.ariari.ariari.commons.pkgenerator.CustomPkGenerate;
import com.ariari.ariari.domain.system.enums.SystemFaqStatusType;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@NoArgsConstructor
@Getter
@Setter
@SQLDelete(sql = "UPDATE system_faq SET deleted_date_time= CURRENT_TIMESTAMP WHERE system_faq_id= ?")
@SQLRestriction("deleted_date_time is null")
public class SystemFaq extends LogicalDeleteEntity {

    @Id
    @CustomPkGenerate
    @Column(name = "system_faq_id")
    private Long id;

    @Column(length = 50)
    private String title;

    @Column(length = 500)
    private String body;

    private String color;

    @Enumerated(EnumType.STRING)
    private SystemFaqStatusType systemFaqStatusType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_member_id")
    private AdminMember createdBy; // 최초 작성자

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "updated_by")
    private AdminMember updatedBy; // 마지막 수정자

    @Version
    private Long version; // 낙관적 락

    @Builder
    private SystemFaq(String title, String body, String color, SystemFaqStatusType systemFaqStatusType, AdminMember adminMember) {
        this.title = title;
        this.body = body;
        this.color = color;
        this.systemFaqStatusType = systemFaqStatusType;
        this.createdBy = adminMember;
        this.updatedBy = adminMember;
    }

    public static SystemFaq create(String title, String body, String color, SystemFaqStatusType  systemFaqStatusType, AdminMember adminMember){
        return SystemFaq.builder()
                .title(title)
                .body(body)
                .color(color)
                .systemFaqStatusType(systemFaqStatusType)
                .adminMember(adminMember)
                .build();
    }

    public void modify(String title, String body, String color, SystemFaqStatusType systemFaqStatusType, AdminMember updatedBy) {
        this.title = title;
        this.body = body;
        this.color = color;
        this.systemFaqStatusType = systemFaqStatusType;
        this.updatedBy = updatedBy;
    }
}
