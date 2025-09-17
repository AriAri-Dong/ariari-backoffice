package com.ariari.ariari.commons.validator;

import com.ariari.ariari.domain.system.notice.dto.req.SystemNoticeSaveReq;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PopDateValidator implements ConstraintValidator<ValidPopupDateRange, SystemNoticeSaveReq> {

        @Override
        public boolean isValid(SystemNoticeSaveReq req, ConstraintValidatorContext constraintValidatorContext) {
            if(!req.isPopupEnabled()){ //팝업이 아니면 검증 X
                return true;
            }

            if (req.getPopupStartDate() == null || req.getPopupEndDate() == null) {
                constraintValidatorContext.disableDefaultConstraintViolation();
                constraintValidatorContext.buildConstraintViolationWithTemplate("팝업이 활성화되어 있으면 시작일과 종료일이 필수입니다.")
                        .addPropertyNode("popupStartDate").addConstraintViolation();
                return false;
            }

            // 팝업이면 시작, 종료일 체크 또한 시작 < 종료 체크
            if (!req.getPopupStartDate().isBefore(req.getPopupEndDate())) {
                constraintValidatorContext.disableDefaultConstraintViolation();
                constraintValidatorContext.buildConstraintViolationWithTemplate("팝업 종료일은 시작일 이후여야 합니다.")
                        .addPropertyNode("popupEndDate").addConstraintViolation();
                return false;
            }

            return true;
        }
}
