package com.mazetube.rand_vid_finder.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mazetube.rand_vid_finder.entities.FunniestVideos;
import com.mazetube.rand_vid_finder.repositories.FunniestVidRepository;
import com.mazetube.rand_vid_finder.services.YoutubeAPI;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000/")


public class MainPageController {

    @Autowired
    FunniestVidRepository repo;

    @GetMapping("/random-video")
    public String randomVideoID() {
        for(int i =0; i < 100 ; ++i){
repo.save(new FunniestVideos("derp", 1));
        }
        return YoutubeAPI.fetchRandVideoID();
    }

}
