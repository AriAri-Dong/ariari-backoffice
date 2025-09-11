package com.ariari.ariari.domain.system.faq;

import com.ariari.ariari.commons.entity.SystemFaq;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SystemFaqRepository extends JpaRepository<SystemFaq, Long> {

    Page<SystemFaq> findAllByOrderByCreatedDateTimeDesc(Pageable pageable);
}
