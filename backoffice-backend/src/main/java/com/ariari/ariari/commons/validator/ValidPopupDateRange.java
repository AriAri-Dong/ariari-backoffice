package com.ariari.ariari.commons.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


@Constraint(validatedBy = PopDateValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidPopupDateRange {
    String message() default "팝업이 true일 경우 시작일과 종료일은 필수입니다.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[]  payload() default {};

}
