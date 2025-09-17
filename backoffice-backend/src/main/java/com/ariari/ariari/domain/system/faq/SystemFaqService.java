package com.ariari.ariari.domain.system.faq;

import com.ariari.ariari.commons.entity.AdminMember;
import com.ariari.ariari.commons.exception.exceptions.NotFoundEntityException;
import com.ariari.ariari.commons.entity.Member;
import com.ariari.ariari.commons.repsonse.ApiResponse;
import com.ariari.ariari.commons.repsonse.PageResponse;
import com.ariari.ariari.domain.admin.AdminMemberRepository;
import com.ariari.ariari.domain.member.member.MemberRepository;
import com.ariari.ariari.commons.entity.SystemFaq;
import com.ariari.ariari.domain.system.faq.dto.req.SystemFaqModifyReq;
import com.ariari.ariari.domain.system.faq.dto.req.SystemFaqSaveReq;
import com.ariari.ariari.domain.system.faq.dto.res.SystemFaqDetailRes;
import com.ariari.ariari.domain.system.faq.dto.res.SystemFaqListRes;
import com.ariari.ariari.domain.system.faq.dto.res.SystemFaqModifyRes;
import com.ariari.ariari.domain.system.faq.dto.res.SystemFaqSaveRes;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SystemFaqService {

    private final SystemFaqRepository systemFaqRepository;
    private final AdminMemberRepository adminMemberRepository;


    @Transactional(readOnly = true)
    public PageResponse<SystemFaqListRes> findSystemFaqs(Long adminMemberId, String category, Pageable pageable) {
        Page<SystemFaq> systemFaqList = systemFaqRepository.findAllByOrderByCreatedDateTimeDesc(pageable);
        Page<SystemFaqListRes> systemFaqListResPage = systemFaqList.map(SystemFaqListRes::fromEntity);
        Page<SystemFaqListRes> dtoPage = systemFaqList.map(SystemFaqListRes::fromEntity);
        return PageResponse.of(dtoPage);
    }

    @Transactional(readOnly = true)
    public ApiResponse<SystemFaqDetailRes> findSystemFaqsDetail(Long adminMemberId, Long systemFaqId) {
        SystemFaq systemFaq = systemFaqRepository.findById(systemFaqId).orElseThrow(NotFoundEntityException::new);
        return ApiResponse.success(SystemFaqDetailRes.fromEntity(systemFaq));
    }

    @Transactional
    public ApiResponse<SystemFaqSaveRes> saveSystemFaq(Long reqMemberId, SystemFaqSaveReq saveReq) {
        AdminMember reqMember = adminMemberRepository.findById(reqMemberId).orElseThrow(NotFoundEntityException::new);
        // 검증 로직 추가 필요
        SystemFaq systemFaq = saveReq.toEntity(reqMember);
        systemFaqRepository.saveAndFlush(systemFaq);

        return ApiResponse.success(SystemFaqSaveRes.fromEntity(systemFaq));
    }

    @Transactional
    public ApiResponse<SystemFaqModifyRes> modifySystemFaq(Long reqMemberId, Long systemFaqId, SystemFaqModifyReq modifyReq) {
        AdminMember reqMember = adminMemberRepository.findById(reqMemberId).orElseThrow(NotFoundEntityException::new);
        // 검증 로직 추가 필요
        SystemFaq systemFaq = systemFaqRepository.findById(systemFaqId).orElseThrow(NotFoundEntityException::new);
        modifyReq.modifyEntity(systemFaq, reqMember);

        systemFaqRepository.saveAndFlush(systemFaq);

        return ApiResponse.success(SystemFaqModifyRes.fromEntity(systemFaq));
    }

    @Transactional
    public ApiResponse<Void> removeSystemFaq(Long reqMemberId, Long systemFaqId) {
        AdminMember reqMember = adminMemberRepository.findById(reqMemberId).orElseThrow(NotFoundEntityException::new);
        // 검증 로직 추가 필요
        SystemFaq systemFaq = systemFaqRepository.findById(systemFaqId).orElseThrow(NotFoundEntityException::new);
        systemFaqRepository.delete(systemFaq);
        return ApiResponse.successMessage(null);
    }



}
