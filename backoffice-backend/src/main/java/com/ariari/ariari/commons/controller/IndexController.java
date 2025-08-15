package com.ariari.ariari.commons.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {
    private static final String INDEX = "index";

    @GetMapping(value = {"/", "/operate/**", "/report/**", "/data/**", "/crud/**"})
    public String root() {
        return INDEX;
    }

}
