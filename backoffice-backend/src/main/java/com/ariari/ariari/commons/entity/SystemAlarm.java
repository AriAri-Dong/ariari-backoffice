package com.ariari.ariari.commons.entity;

import com.ariari.ariari.commons.commonentity.LogicalDeleteEntity;
import com.ariari.ariari.commons.pkgenerator.CustomPkGenerate;
import com.ariari.ariari.domain.system.enums.AlarmTargetType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@SQLDelete(sql = "UPDATE system_Alarm SET deleted_date_time= CURRENT_TIMESTAMP WHERE system_alarm_id= ?")
@SQLRestriction("deleted_date_time is null")
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class SystemAlarm extends LogicalDeleteEntity {

    @Id
    @CustomPkGenerate
    @Column(name = "system_alarm_id")
    private Long id;

    @Column(length = 50)
    private String title;

    @Column(length = 500)
    private String body;

    private int views;

    @Enumerated(EnumType.STRING)
    private AlarmTargetType targetType;

    @Setter
    @OneToMany(mappedBy = "systemAlarm", cascade = CascadeType.ALL)
    private List<SystemAlarmImage> systemAlarmImages = new ArrayList<>();


    public static SystemAlarm create(String title, String body, AlarmTargetType targetType) {
        return SystemAlarm.builder()
                .title(title)
                .body(body)
                .targetType(targetType)
                .views(0)
                .build();
    }
}
