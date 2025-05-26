package com.ariari.ariari.domain.club.passreview.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PassReviewMapper {
    int findPassReviewOfClubCount(Long clubId);
}