package com.ariari.ariari.domain.system.faq;

import com.ariari.ariari.commons.exception.exceptions.NotFoundEntityException;
import com.ariari.ariari.domain.member.Member;
import com.ariari.ariari.domain.member.member.MemberRepository;
import com.ariari.ariari.domain.system.SystemFaq;
import com.ariari.ariari.domain.system.faq.dto.req.SystemFaqModifyReq;
import com.ariari.ariari.domain.system.faq.dto.req.SystemFaqSaveReq;
import com.ariari.ariari.domain.system.faq.dto.res.SystemFaqDetailRes;
import com.ariari.ariari.domain.system.faq.dto.res.SystemFaqListRes;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SystemFaqService {

    private final SystemFaqRepository systemFaqRepository;
    private final MemberRepository memberRepository;


    @Transactional(readOnly = true)
    public SystemFaqListRes findSystemFaqs(Pageable pageable) {
        Page<SystemFaq> systemFaqList = systemFaqRepository.findAllByOrderByCreatedDateTimeDesc(pageable);
        return SystemFaqListRes.from(systemFaqList);
    }

    @Transactional(readOnly = true)
    public SystemFaqDetailRes findSystemFaqsDetail(Long systemFaqId) {
        SystemFaq systemFaq = systemFaqRepository.findById(systemFaqId).orElseThrow(NotFoundEntityException::new);
        return SystemFaqDetailRes.createRes(systemFaq);
    }

    @Transactional
    public void saveSystemFaq(Long reqMemberId, SystemFaqSaveReq saveReq) {
        Member reqMember = memberRepository.findById(reqMemberId).orElseThrow(NotFoundEntityException::new);
        // 검증 로직 추가 필요
        SystemFaq systemFaq = saveReq.toEntity();
        systemFaqRepository.save(systemFaq);
    }

    @Transactional
    public void modifySystemFaq(Long reqMemberId, Long systemFaqId, SystemFaqModifyReq modifyReq) {
        Member reqMember = memberRepository.findById(reqMemberId).orElseThrow(NotFoundEntityException::new);
        // 검증 로직 추가 필요
        SystemFaq systemFaq = systemFaqRepository.findById(systemFaqId).orElseThrow(NotFoundEntityException::new);
        modifyReq.modifyEntity(systemFaq);
    }

    @Transactional
    public void removeSystemFaq(Long reqMemberId, Long systemFaqId) {
        Member reqMember = memberRepository.findById(reqMemberId).orElseThrow(NotFoundEntityException::new);
        // 검증 로직 추가 필요
        SystemFaq systemFaq = systemFaqRepository.findById(systemFaqId).orElseThrow(NotFoundEntityException::new);
        systemFaqRepository.delete(systemFaq);
    }



}
