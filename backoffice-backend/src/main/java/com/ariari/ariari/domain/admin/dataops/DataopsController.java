package com.ariari.ariari.domain.admin.dataops;

import com.ariari.ariari.domain.admin.dataops.dto.res.DeleteDataopsRes;
import com.ariari.ariari.domain.admin.dataops.dto.res.FindDataopsRes;
import com.ariari.ariari.domain.admin.dataops.dto.res.GetDataopsRes;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/dataops")
@RequiredArgsConstructor
public class DataopsController {
    private final DataopsService dataopsService;

    @GetMapping
    public FindDataopsRes findDataops(
            @RequestParam(required = true) String table,
            @RequestParam(required = false) String filter,
            @RequestParam(required = false) String keyword,
            @RequestParam int page,
            @RequestParam int pageSize) {
        return dataopsService.findDataops();
    }

    @GetMapping("/detail/{table}/{id}")
    public GetDataopsRes getDataops(@PathVariable(value = "table") String table, @PathVariable(value = "id") String id) {
        return dataopsService.getDataops();
    }

    @DeleteMapping("/{table}/{id}")
    public DeleteDataopsRes deleteDataops(@PathVariable(value = "table") String table, @PathVariable(value = "id") String id) {
        return dataopsService.deleteDataops();
    }
}
