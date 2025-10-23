package com.ariari.ariari.domain.admin.dataops;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface DataopsMapper {

    List<Map<String, Object>> findIdsForTargetTable(
            @Param("table") String table,
            @Param("id") String id,
            @Param("filter") String filter,
            @Param("keyword") String keyword,
            @Param("size") int size,
            @Param("offset") int offset
    );

    int countTotalForTargetTable(
            @Param("table") String table,
            @Param("filter") String filter,
            @Param("keyword") String keyword
    );

    Map<String, Object> getDetailDataById(
            @Param("table") String table,
            @Param("idColumn") String idColumn,
            @Param("dataId") String dataId
    );
}
