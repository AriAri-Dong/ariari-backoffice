package com.ariari.ariari.domain.system.faq;

import com.ariari.ariari.commons.entity.SystemFaq;
import com.ariari.ariari.domain.system.enums.SystemFaqStatusType;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SystemFaqRepository extends JpaRepository<SystemFaq, Long> {

    Page<SystemFaq> findAllByOrderByCreatedDateTimeDesc(Pageable pageable);

    @Query("""
           SELECT s
           FROM SystemFaq s
           WHERE s.systemFaqStatusType = :category
           ORDER BY s.createdDateTime DESC
           """)
    Page<SystemFaq> findAllByCategory(@Param("category") SystemFaqStatusType category, Pageable pageable);
}
