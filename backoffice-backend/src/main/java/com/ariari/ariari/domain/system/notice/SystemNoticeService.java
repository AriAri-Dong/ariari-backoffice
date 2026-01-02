package com.ariari.ariari.domain.system.notice;

import com.ariari.ariari.commons.commonentity.image.ImageRepository;
import com.ariari.ariari.commons.entity.*;
import com.ariari.ariari.commons.exception.exceptions.NotFoundEntityException;
import com.ariari.ariari.commons.manager.MemberAlarmManger;
import com.ariari.ariari.commons.manager.PageableFactoryManger;
import com.ariari.ariari.commons.manager.file.FileManager;
import com.ariari.ariari.commons.repsonse.ApiResponse;
import com.ariari.ariari.commons.repsonse.PageResponse;
import com.ariari.ariari.domain.admin.AdminMemberRepository;
import com.ariari.ariari.domain.club.notice.image.exception.NotBelongInClubNoticeException;
import com.ariari.ariari.domain.member.member.MemberRepository;
import com.ariari.ariari.domain.system.image.SystemNoticeImageRepository;
import com.ariari.ariari.domain.system.notice.dto.req.SystemNoticeModifyReq;
import com.ariari.ariari.domain.system.notice.dto.req.SystemNoticeSaveReq;
import com.ariari.ariari.domain.system.notice.dto.req.SystemNoticeSearchReq;
import com.ariari.ariari.domain.system.notice.dto.res.SystemNoticeDetailRes;
import com.ariari.ariari.domain.system.notice.dto.res.SystemNoticeListRes;
import com.ariari.ariari.domain.system.notice.dto.res.SystemNoticeModifyRes;
import com.ariari.ariari.domain.system.notice.dto.res.SystemNoticeSaveRes;
import com.ariari.ariari.domain.system.term.dto.res.SystemTermListRes;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SystemNoticeService {

    private final SystemNoticeRepository systemNoticeRepository;
    private final FileManager fileManager;
    private final SystemNoticeImageRepository systemNoticeImageRepository;
    private final AdminMemberRepository adminMemberRepository;


    // 공지사항 목록 조회
    @Transactional(readOnly = true)
    public PageResponse<SystemNoticeListRes> findSystemNotices(Long adminMemberId, SystemNoticeSearchReq req) {
        Pageable pageable = PageableFactoryManger.of(req.getPage(), req.getPageSize(), "createdDateTime", true);
        Page<SystemNotice> systemNoticesPage = systemNoticeRepository.searchSystemNotices(req, pageable);
        Page<SystemNoticeListRes> dtoPage = systemNoticesPage.map(SystemNoticeListRes::fromEntity);
        return PageResponse.of(dtoPage);
    }


    // 공지사항 상세 조회
    @Transactional(readOnly = true)
    public ApiResponse<SystemNoticeDetailRes> findSystemNoticeDetail(Long adminMemberId, Long systemNoticeId) {
        SystemNotice systemNotice = systemNoticeRepository.findWithImagesById(systemNoticeId);
        if (systemNotice == null) throw new NotFoundEntityException();
        return ApiResponse.success(SystemNoticeDetailRes.fromEntity(systemNotice));
    }

    // 공지사항 저장
    @Transactional
    public ApiResponse<SystemNoticeSaveRes> saveSystemNotice(Long reqMemberId, SystemNoticeSaveReq saveReq, List<MultipartFile> files) {
        AdminMember reqMember = adminMemberRepository.findById(reqMemberId).orElseThrow(NotFoundEntityException::new);

        // 검증 로직이 필요함

        SystemNotice systemNotice = saveReq.toEntity(reqMember);


        systemNoticeRepository.saveAndFlush(systemNotice);
        // systemNoticeImages를 매핑할 때 FK(system_notice_id) 값이 필요하기 때문에 ID를 미리 확보


        // 이미지 처리
        if (files != null) {
            if (files.size() > 10) {
                return ApiResponse.failMessage("이미지는 최대 10장까지 업로드 가능합니다.");
            }
            for (MultipartFile file : files) {

                String originalFilename = file.getOriginalFilename();
                if (originalFilename == null || !originalFilename.matches("(?i).+\\.(jpg|jpeg|png|gif)$")) {
                    return ApiResponse.failMessage("이미지는 JPG, JPEG, PNG, GIF 형식만 업로드 가능합니다.");
                }

                String filePath = fileManager.saveFile(file, "system_alarm_image");
                systemNotice.getSystemNoticeImages().add(new SystemNoticeImage(filePath, systemNotice));
            }
        }


        return ApiResponse.success(SystemNoticeSaveRes.fromEntity(systemNotice));
    }

    // 공지사항 수정
    @Transactional
    public ApiResponse<SystemNoticeModifyRes> modifySystemNotice(Long reqMemberId, Long systemNoticeId, SystemNoticeModifyReq modifyReq, List<MultipartFile> files) {

        AdminMember reqMember = adminMemberRepository.findById(reqMemberId).orElseThrow(NotFoundEntityException::new);
        SystemNotice systemNotice = systemNoticeRepository.findById(systemNoticeId).orElseThrow(NotFoundEntityException::new);


        // 검증 로직 추가

        modifyReq.modifyEntity(systemNotice, reqMember);

        // 삭제 이미지 처리
        if (modifyReq.getRemoveImages() != null && !modifyReq.getRemoveImages().isEmpty()) {
            List<SystemNoticeImage> deletedImages = systemNoticeImageRepository.findAllByImageUriIn(modifyReq.getRemoveImages());
            for (SystemNoticeImage deletedImage : deletedImages) {
                if (!deletedImage.getSystemNotice().equals(systemNotice)) {
                    throw new NotBelongInClubNoticeException();
                }
                systemNoticeImageRepository.delete(deletedImage);
                fileManager.deleteFile(deletedImage.getImageUri());
            }
        }

        // 새 이미지 추가
        if (files != null && !files.isEmpty()) {
            for (MultipartFile file : files) {
                String filePath = fileManager.saveFile(file, "system_notice_image");
                systemNotice.getSystemNoticeImages().add(new SystemNoticeImage(filePath, systemNotice));
            }
        }
        systemNoticeRepository.saveAndFlush(systemNotice);
        return ApiResponse.success(SystemNoticeModifyRes.fromEntity(systemNotice));
    }

    // 공지사항 삭제
    @Transactional
    public ApiResponse<Void>  removeSystemNotice(Long reqMemberId, Long systemNoticeId) {

        AdminMember reqMember = adminMemberRepository.findById(reqMemberId).orElseThrow(NotFoundEntityException::new);
        SystemNotice systemNotice = systemNoticeRepository.findById(systemNoticeId).orElseThrow(NotFoundEntityException::new);

        // 검증 로직 추가

        for (SystemNoticeImage image : systemNotice.getSystemNoticeImages()) {
            fileManager.deleteFile(image.getImageUri());
        }

        systemNoticeRepository.delete(systemNotice);
        return ApiResponse.successMessage("공지사항이 삭제되었습니다.");
    }



}
