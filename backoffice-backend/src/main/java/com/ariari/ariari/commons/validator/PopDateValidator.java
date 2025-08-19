package com.ariari.ariari.commons.validator;

import com.ariari.ariari.domain.system.notice.dto.req.SystemNoticeSaveReq;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PopDateValidator implements ConstraintValidator<ValidPopupDateRange, SystemNoticeSaveReq> {

        @Override
        public boolean isValid(SystemNoticeSaveReq systemNoticeSaveReq, ConstraintValidatorContext constraintValidatorContext) {
            if(!systemNoticeSaveReq.isPopup()){ //팝업이 아니면 검증 X
                return true;
            }
            // 팝업이면 시작, 종료일 체크 또한 시작 < 종료 체크
            return systemNoticeSaveReq.getPopupStartDate() != null &&
                    systemNoticeSaveReq.getPopupEndDate() != null &&
                    systemNoticeSaveReq.getPopupStartDate().isBefore(systemNoticeSaveReq.getPopupEndDate());
        }
}
