package com.ariari.ariari.commons.manager;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class PageableFactoryManger {

    private PageableFactoryManger() {

    }

    public static Pageable of(Integer page, Integer pageSize, String sortProperty, boolean descending) {
        int p = (page != null && page > 0) ? page - 1 : 0;
        int size = (pageSize != null && pageSize > 0) ? pageSize : 10;
        Sort sort = descending ? Sort.by(sortProperty).descending() : Sort.by(sortProperty).ascending();
        return PageRequest.of(p, size, sort);
    }

    public static Pageable ofDefault(String sortProperty) {
        return of(null, null, sortProperty, true);
    }
}
