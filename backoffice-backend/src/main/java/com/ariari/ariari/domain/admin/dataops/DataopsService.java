package com.ariari.ariari.domain.admin.dataops;

import com.ariari.ariari.domain.admin.dataops.dto.FindDataopsData;
import com.ariari.ariari.domain.admin.dataops.dto.GetDataopsData;
import com.ariari.ariari.domain.admin.dataops.dto.res.DeleteDataopsRes;
import com.ariari.ariari.domain.admin.dataops.dto.res.FindDataopsRes;
import com.ariari.ariari.domain.admin.dataops.dto.res.GetDataopsRes;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import static com.ariari.ariari.commons.manager.StringUtilsManager.extractPrimaryKeyColumnOfTable;

@Service
@RequiredArgsConstructor
public class DataopsService {
    private final DataopsMapper dataopsMapper;
    private final HandleDataDeleteService handleDataDeleteService;

    // 논리삭제(deleted_date_time) 컬럼이 없는 테이블 목록
    private static final Set<String> TABLES_WITHOUT_SOFT_DELETE = new HashSet<>(Arrays.asList(
            "block", "club_bookmark", "recruitment_bookmark",
            "club_activity_like", "club_activity_comment_like", "security_access_log"
    ));

    public FindDataopsRes findDataops(String table, String filter, String keyword, int page, int pageSize) {
        String idColumn = extractPrimaryKeyColumnOfTable(table);
        int offset = (page - 1) * pageSize;

        // 논리삭제가 없는 테이블은 deleted_date_time 없이 조회
        int total;
        List<Map<String, Object>> idResults;
        if (TABLES_WITHOUT_SOFT_DELETE.contains(table)) {
            total = dataopsMapper.countTotalForTargetTableWithoutSoftDelete(table, filter, keyword);
            idResults = dataopsMapper.findIdsForTargetTableWithoutSoftDelete(
                table, idColumn, filter, keyword, pageSize, offset
            );
        } else {
            total = dataopsMapper.countTotalForTargetTable(table, filter, keyword);
            idResults = dataopsMapper.findIdsForTargetTable(
                table, idColumn, filter, keyword, pageSize, offset
            );
        }

        FindDataopsData data = FindDataopsData.of(total, page, pageSize, table, idResults, idColumn);
        return FindDataopsRes.success(data);
    }

    public GetDataopsRes getDataops(String table, String id) {
        String idColumn = extractPrimaryKeyColumnOfTable(table);

        Map<String, Object> detailData = dataopsMapper.getDetailDataById(table, idColumn, id);

        GetDataopsData data = GetDataopsData.of(id, detailData, idColumn);
        return GetDataopsRes.success(data);
    }

    public DeleteDataopsRes deleteDataops(String table, String id){
        return handleDataDeleteService.handleDeleteData(table, id);
    }
}
