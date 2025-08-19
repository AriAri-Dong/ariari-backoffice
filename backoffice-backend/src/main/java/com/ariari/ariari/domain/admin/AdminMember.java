package com.ariari.ariari.domain.admin;

import com.ariari.ariari.commons.entity.LogicalDeleteEntity;
import com.ariari.ariari.commons.pkgenerator.CustomPkGenerate;
import com.ariari.ariari.domain.admin.enums.AdminRoleType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDateTime;


@Entity
@NoArgsConstructor
@Getter
@SQLDelete(sql = "UPDATE admin_member SET deleted_date_time= CURRENT_TIMESTAMP WHERE admin_member_id= ?")
@SQLRestriction("deleted_date_time is null")
public class AdminMember extends LogicalDeleteEntity {

    @Id
    @CustomPkGenerate
    @Column(name = "admin_member_id")
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, length = 20)
    private AdminRoleType adminRoleType;

    @Column(nullable = false)
    private boolean enabled = true;  // 계정 활성화 여부

    @Column(nullable = false)
    private boolean locked = false; // 비밀번호 오류 횟수 초과로 잠금 여부

    private LocalDateTime lastLoginAt;

}
