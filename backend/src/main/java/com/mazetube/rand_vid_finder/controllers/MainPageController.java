package com.mazetube.rand_vid_finder.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000/")


public class MainPageController {

    @GetMapping("/testpage")
    public String hello() {
        System.out.println("mapping called boi");
        return "Hello, World!";
    }

}
