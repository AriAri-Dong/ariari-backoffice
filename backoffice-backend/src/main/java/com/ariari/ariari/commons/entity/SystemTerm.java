package com.ariari.ariari.commons.entity;

import com.ariari.ariari.commons.commonentity.LogicalDeleteEntity;
import com.ariari.ariari.commons.pkgenerator.CustomPkGenerate;
import com.ariari.ariari.domain.system.enums.TermType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@NoArgsConstructor
@Getter
@SQLDelete(sql = "UPDATE system_term SET deleted_date_time= CURRENT_TIMESTAMP WHERE system_term_id= ? AND version=?")
@SQLRestriction("deleted_date_time is null")
public class SystemTerm extends LogicalDeleteEntity {
    @Id
    @CustomPkGenerate
    @Column(name = "system_term_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "term_type")
    private TermType termType;

    @Lob
    @Column(columnDefinition = "TEXT", name = "body")
    private String body;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_id")
    private AdminMember createdBy; // 최초 작성자

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "updated_by_id")
    private AdminMember updatedBy; // 마지막 수정자

    @Version
    private Long version;

    private SystemTerm(TermType termType, String body, AdminMember createdBy) {
        this.termType = termType;
        this.body = body;
        this.createdBy = createdBy;
        this.updatedBy = createdBy; // 생성 시 최초 수정자 = 작성자
    }

    public static SystemTerm create(TermType termType, String body, AdminMember adminMember) {
        return new SystemTerm(termType, body, adminMember);
    }


    public void modify(TermType termType, String body, AdminMember updatedBy) {
        this.termType = termType;
        this.body = body;
        this.updatedBy = updatedBy;
    }

}
