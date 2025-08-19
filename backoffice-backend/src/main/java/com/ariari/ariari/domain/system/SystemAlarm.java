package com.ariari.ariari.domain.system;

import com.ariari.ariari.commons.entity.LogicalDeleteEntity;
import com.ariari.ariari.commons.pkgenerator.CustomPkGenerate;
import com.ariari.ariari.domain.system.enums.AlarmTargetType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@NoArgsConstructor
@Getter
@SQLDelete(sql = "UPDATE system_Alarm SET deleted_date_time= CURRENT_TIMESTAMP WHERE system_alarm_id= ?")
@SQLRestriction("deleted_date_time is null")
public class SystemAlarm extends LogicalDeleteEntity {

    @Id
    @CustomPkGenerate
    @Column(name = "system_alarm_id")
    private Long id;

    @Column(length = 50)
    private String title;

    @Column(length = 500)
    private String body;

    @Enumerated(EnumType.STRING)
    private AlarmTargetType targetType;

    private SystemAlarm(String title, String body, AlarmTargetType targetType) {
        this.title = title;
        this.body = body;
        this.targetType = targetType;
    }

    public static SystemAlarm create(String title, String body, AlarmTargetType targetType) {
        return new SystemAlarm(title, body, targetType);
    }
}
