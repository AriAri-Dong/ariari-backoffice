package com.ariari.ariari.commons.entity;

import com.ariari.ariari.commons.commonentity.LogicalDeleteEntity;
import com.ariari.ariari.commons.pkgenerator.CustomPkGenerate;
import com.ariari.ariari.domain.admin.enums.AdminRoleType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDateTime;


@Entity
@NoArgsConstructor
@Getter
@Setter
@SQLDelete(sql = "UPDATE admin_member SET deleted_date_time= CURRENT_TIMESTAMP WHERE admin_member_id= ?")
@SQLRestriction("deleted_date_time is null")
public class AdminMember extends LogicalDeleteEntity {

    @Id
    @CustomPkGenerate
    @Column(name = "admin_member_id")
    private Long id;

    private String username;

    private String password;

    @Enumerated(EnumType.STRING)
    private AdminRoleType adminRoleType;

    private boolean enabled = true;

    private boolean locked =  false;

    private LocalDateTime lockedAt;

    private int loginFailCount = 0;

    private LocalDateTime lastLoginDateTime = LocalDateTime.now();

    public void countPlus(){
        this.loginFailCount++;
    }

    public void lock(){
        this.locked = true;
        this.lockedAt = LocalDateTime.now();
    }

    public void onLoginSuccess(){
        this.locked = false;
        this.loginFailCount = 0;
        this.lockedAt = null;
        this.lastLoginDateTime = LocalDateTime.now();
    }

    // 현재 잠금 상태
    public boolean isCurrentlyLocked() {
        return locked && lockedAt != null && lockedAt.plusMinutes(30).isAfter(LocalDateTime.now());
    }

    public void updateLastLoginDateTime(){
        this.lastLoginDateTime = LocalDateTime.now();
    }
}
