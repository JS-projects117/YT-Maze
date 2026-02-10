package com.mazetube.rand_vid_finder.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.mazetube.rand_vid_finder.services.YoutubeAPI;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000/")


public class MainPageController {

    @GetMapping("/random-video")
    public String randomVideoID() {
        return YoutubeAPI.fetchRandVideoID();
    }

}
