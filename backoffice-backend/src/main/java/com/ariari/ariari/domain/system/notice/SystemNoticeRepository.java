package com.ariari.ariari.domain.system.notice;

import com.ariari.ariari.commons.entity.SystemNotice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SystemNoticeRepository extends JpaRepository<SystemNotice, Long>, SystemNoticeRepositoryCustom {

}
