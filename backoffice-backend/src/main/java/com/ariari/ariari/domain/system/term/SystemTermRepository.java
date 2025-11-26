package com.ariari.ariari.domain.system.term;

import com.ariari.ariari.commons.entity.SystemTerm;
import com.ariari.ariari.domain.system.enums.TermType;
import org.springframework.data.jpa.repository.JpaRepository;



public interface SystemTermRepository extends JpaRepository<SystemTerm, Long> {

    boolean existsByTermTypeAndDeletedDateTimeIsNull(TermType termType);
}
