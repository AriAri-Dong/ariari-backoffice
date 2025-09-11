package com.ariari.ariari.domain.system.alarm;

import com.ariari.ariari.commons.entity.SystemAlarm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SystemAlarmRepository extends JpaRepository<SystemAlarm, Long> {

    Page<SystemAlarm> findAllByOrderByCreatedDateTimeDesc(Pageable pageable);
}
