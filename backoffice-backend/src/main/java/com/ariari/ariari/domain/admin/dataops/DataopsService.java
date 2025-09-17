package com.ariari.ariari.domain.admin.dataops;

import com.ariari.ariari.domain.admin.dataops.dto.res.DeleteDataopsRes;
import com.ariari.ariari.domain.admin.dataops.dto.res.FindDataopsRes;
import com.ariari.ariari.domain.admin.dataops.dto.res.GetDataopsRes;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DataopsService {
    private final DataopsMapper dataopsMapper;

    public FindDataopsRes findDataops(){
        return null;
    }

    public GetDataopsRes getDataops(){
        return null;
    }

    public DeleteDataopsRes deleteDataops(){
        return null;
    }
}
