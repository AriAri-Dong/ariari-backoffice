package com.ariari.ariari.commons.entity;

import com.ariari.ariari.commons.commonentity.image.Image;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class SystemAlarmImage extends Image {


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "system_notice_id")
    private SystemAlarm systemAlarm;

    public SystemAlarmImage(String imageUri, SystemAlarm systemAlarm) {
        super(imageUri);
        this.systemAlarm = systemAlarm;
    }
}