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

    @Builder
    private SystemFaq(String title, String body, String color, SystemFaqStatusType systemFaqStatusType) {
        this.title = title;
        this.body = body;
        this.color = color;
        this.systemFaqStatusType = systemFaqStatusType;
    }

    public static SystemFaq create(String title, String body, String color, SystemFaqStatusType  systemFaqStatusType){
        return SystemFaq.builder()
                .title(title)
                .body(body)
                .color(color)
                .systemFaqStatusType(systemFaqStatusType)
                .build();
    }

    public void modify(String title, String body, String color, SystemFaqStatusType systemFaqStatusType) {
        this.title = title;
        this.body = body;
        this.color = color;
        this.systemFaqStatusType = systemFaqStatusType;
    }
}
