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
            "Block", "ClubBookmark", "RecruitmentBookmark",
            "ClubActivityLike", "ClubActivityCommentLike", "SecurityAccessLog"
    ));

    public FindDataopsRes findDataops(String table, String filter, String keyword, int page, int pageSize) {
        String idColumn = extractPrimaryKeyColumnOfTable(table);
        int offset = (page - 1) * pageSize;

        int total = dataopsMapper.countTotalForTargetTable(table, filter, keyword);

        // 논리삭제가 없는 테이블은 deleted_date_time 없이 조회
        List<Map<String, Object>> idResults;
        if (TABLES_WITHOUT_SOFT_DELETE.contains(table)) {
            idResults = dataopsMapper.findIdsForTargetTableWithoutSoftDelete(
                table, idColumn, filter, keyword, pageSize, offset
            );
        } else {
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
