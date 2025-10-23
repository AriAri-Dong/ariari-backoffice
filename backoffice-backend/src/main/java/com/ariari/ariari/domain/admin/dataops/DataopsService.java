package com.ariari.ariari.domain.admin.dataops;

import com.ariari.ariari.domain.admin.dataops.dto.FindDataopsData;
import com.ariari.ariari.domain.admin.dataops.dto.GetDataopsData;
import com.ariari.ariari.domain.admin.dataops.dto.res.DeleteDataopsRes;
import com.ariari.ariari.domain.admin.dataops.dto.res.FindDataopsRes;
import com.ariari.ariari.domain.admin.dataops.dto.res.GetDataopsRes;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import static com.ariari.ariari.commons.manager.StringUtilsManager.extractPrimaryKeyColumnOfTable;

@Service
@RequiredArgsConstructor
public class DataopsService {
    private final DataopsMapper dataopsMapper;
    private final HandleDataDeleteService handleDataDeleteService;

    public FindDataopsRes findDataops(String table, String filter, String keyword, int page, int pageSize) {
        String idColumn = extractPrimaryKeyColumnOfTable(table);
        int offset = (page - 1) * pageSize;

        int total = dataopsMapper.countTotalForTargetTable(table, filter, keyword);
        List<Map<String, Object>> idResults = dataopsMapper.findIdsForTargetTable(
            table, idColumn, filter, keyword, pageSize, offset
        );

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
