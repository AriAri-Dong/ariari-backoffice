package com.ariari.ariari.domain.system.term;

import com.ariari.ariari.commons.entity.AdminMember;
import com.ariari.ariari.commons.exception.exceptions.NotFoundEntityException;
import com.ariari.ariari.commons.entity.SystemTerm;
import com.ariari.ariari.commons.repsonse.ApiResponse;
import com.ariari.ariari.commons.repsonse.PageResponse;
import com.ariari.ariari.domain.admin.AdminMemberRepository;
import com.ariari.ariari.domain.system.enums.TermType;
import com.ariari.ariari.domain.system.notice.dto.req.SystemNoticeModifyReq;
import com.ariari.ariari.domain.system.term.dto.req.SystemTermModifyReq;
import com.ariari.ariari.domain.system.term.dto.req.SystemTermSaveReq;
import com.ariari.ariari.domain.system.term.dto.res.SystemTermDetailRes;
import com.ariari.ariari.domain.system.term.dto.res.SystemTermListRes;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SystemTermService {
    private final SystemTermRepository systemTermRepository;
    private final AdminMemberRepository adminMemberRepository;

    // 이용약관 목록 조회
    @Transactional(readOnly = true)
    public PageResponse<SystemTermListRes> findSystemTerms(Long adminMemberId, Pageable pageable) {
        AdminMember reqMember = adminMemberRepository.findById(adminMemberId).orElseThrow(NotFoundEntityException::new);

        Page<SystemTerm> systemTermPage = systemTermRepository.findAll(pageable);
        Page<SystemTermListRes> dtoPage = systemTermPage.map(SystemTermListRes::fromEntity);
        return PageResponse.of(dtoPage);
    }

    // 이용약관 상세 조회
    @Transactional(readOnly = true)
    public ApiResponse<SystemTermDetailRes> findSystemTermDetail(Long adminMemberId, Long systemTermId) {
        AdminMember reqMember = adminMemberRepository.findById(adminMemberId).orElseThrow(NotFoundEntityException::new);
        SystemTerm systemTerm = systemTermRepository.findById(systemTermId).orElseThrow(NotFoundEntityException::new);
        return ApiResponse.success(SystemTermDetailRes.fromEntity(systemTerm));
    }

    @Transactional(readOnly = true)
    public SystemTermDetailRes getSystemTermByTermType(Long adminMemberId, TermType termType) {
        AdminMember reqMember = adminMemberRepository.findById(adminMemberId).orElseThrow(NotFoundEntityException::new);

        SystemTerm systemTerm = systemTermRepository.findByTermType(termType).orElseThrow(NotFoundEntityException::new);
        return SystemTermDetailRes.fromEntity(systemTerm);
    }


    @Transactional
    public void saveSystemTerm(Long adminMemberId, SystemTermSaveReq systemTermSaveReq) {
        AdminMember reqMember = adminMemberRepository.findById(adminMemberId).orElseThrow(NotFoundEntityException::new);

        SystemTerm systemTerm = systemTermSaveReq.toEntity(reqMember);
        systemTermRepository.save(systemTerm);
    }

    @Transactional
    public ApiResponse<SystemTermDetailRes>  modifySystemTerm(Long adminMemberId, SystemTermModifyReq systemTermModifyReq, Long systemTermId) {
        AdminMember reqMember = adminMemberRepository.findById(adminMemberId).orElseThrow(NotFoundEntityException::new);

        SystemTerm systemTerm = systemTermRepository.findById(systemTermId).orElseThrow(NotFoundEntityException::new);
        systemTermModifyReq.modifyEntity(systemTerm,  reqMember);
        systemTermRepository.saveAndFlush(systemTerm);

        return ApiResponse.success(SystemTermDetailRes.fromEntity(systemTerm));
    }

    @Transactional
    public ApiResponse<Void> removeSystemTerm(Long adminMemberId, Long systemTermId) {
        AdminMember reqMember = adminMemberRepository.findById(adminMemberId).orElseThrow(NotFoundEntityException::new);

        SystemTerm systemTerm = systemTermRepository.findById(systemTermId).orElseThrow(NotFoundEntityException::new);
        systemTermRepository.delete(systemTerm);
        return ApiResponse.successMessage("이용약관이 삭제되었습니다.");
    }

}
