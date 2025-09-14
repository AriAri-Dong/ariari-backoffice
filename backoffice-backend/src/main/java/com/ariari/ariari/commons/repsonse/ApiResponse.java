package com.ariari.ariari.commons.repsonse;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;


@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ApiResponse<T> {

    private String status;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String message;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T data;


    public static <T> ApiResponse<T> success(T Data) {
        return new ApiResponse<>("success", null, Data);
    }

    public static <T> ApiResponse<T> successMessage(String message) {
        return new ApiResponse<>("success", message, null);
    }

    public static <T> ApiResponse<T> failMessage(String message) {
        return new ApiResponse<>("fail", message, null);
    }

}
