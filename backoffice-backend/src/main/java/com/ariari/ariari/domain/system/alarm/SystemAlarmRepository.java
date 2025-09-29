package com.ariari.ariari.domain.system.alarm;

import com.ariari.ariari.commons.entity.SystemAlarm;
import com.ariari.ariari.domain.system.enums.AlarmTargetType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SystemAlarmRepository extends JpaRepository<SystemAlarm, Long> {

    Page<SystemAlarm> findAllByOrderByCreatedDateTimeDesc(Pageable pageable);

    Page<SystemAlarm> findByTitleContaining(String title, Pageable pageable);
    Page<SystemAlarm> findByTargetType(AlarmTargetType target, Pageable pageable);
    Page<SystemAlarm> findByTitleContainingAndTargetType(String title, AlarmTargetType target, Pageable pageable);

    SystemAlarm findByTitle(String title);
}
