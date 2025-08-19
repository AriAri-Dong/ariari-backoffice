package com.ariari.ariari.domain.system.term;

import com.ariari.ariari.commons.exception.exceptions.NotFoundEntityException;
import com.ariari.ariari.domain.system.SystemTerm;
import com.ariari.ariari.domain.system.enums.TermType;
import com.ariari.ariari.domain.system.notice.dto.req.SystemNoticeModifyReq;
import com.ariari.ariari.domain.system.term.dto.req.SystemTermModifyReq;
import com.ariari.ariari.domain.system.term.dto.req.SystemTermSaveReq;
import com.ariari.ariari.domain.system.term.dto.res.SystemTermDetailRes;
import com.ariari.ariari.domain.system.term.dto.res.SystemTermListRes;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SystemTermService {
    private final SystemTermRepository systemTermRepository;

    @Transactional(readOnly = true)
    public SystemTermDetailRes getSystemTermByTermType(TermType termType) {
        SystemTerm systemTerm = systemTermRepository.findByTermType(termType).orElseThrow(NotFoundEntityException::new);
        return SystemTermDetailRes.fromEntity(systemTerm);
    }


    @Transactional(readOnly = true)
    public SystemTermDetailRes findSystemTermDetail(Long systemTermId) {
        SystemTerm systemTerm = systemTermRepository.findById(systemTermId).orElseThrow(NotFoundEntityException::new);
        return SystemTermDetailRes.fromEntity(systemTerm);
    }

    @Transactional(readOnly = true)
    public SystemTermListRes findSystemTerms() {
        List<SystemTerm> systemTerms = systemTermRepository.findAll();
        return SystemTermListRes.create(systemTerms);
    }


    @Transactional
    public void saveSystemTerm(SystemTermSaveReq systemTermSaveReq) {

        SystemTerm systemTerm = systemTermSaveReq.toEntity();
        systemTermRepository.save(systemTerm);
    }

    @Transactional
    public void modifySystemTerm(SystemTermModifyReq systemTermModifyReq, Long systemTermId) {
        SystemTerm systemTerm = systemTermRepository.findById(systemTermId).orElseThrow(NotFoundEntityException::new);
        systemTermModifyReq.modifyEntity(systemTerm);
    }

    @Transactional
    public void removeSystemTerm(Long systemTermId) {
        SystemTerm systemTerm = systemTermRepository.findById(systemTermId).orElseThrow(NotFoundEntityException::new);
        systemTermRepository.delete(systemTerm);
    }

}
