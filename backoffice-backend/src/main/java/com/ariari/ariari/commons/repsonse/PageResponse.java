package com.ariari.ariari.commons.repsonse;


import lombok.*;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class PageResponse<T>{

    private String status;
    private long total;
    private int page;
    private int pageSize;
    private List<T> items;



    public static <T> PageResponse<T> of(List<T> items, long total, int page, int pageSize) {
        return new PageResponse<>("success", total, page, pageSize, items);
    }

    public static <T> PageResponse<T> of(Page<T> pageData) {
        return new PageResponse<>(
                "success",
                pageData.getTotalElements(),
                pageData.getNumber() + 1,
                pageData.getSize(),
                pageData.getContent()
        );
    }
}
