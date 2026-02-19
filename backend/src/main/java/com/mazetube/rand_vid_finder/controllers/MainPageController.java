package com.mazetube.rand_vid_finder.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mazetube.rand_vid_finder.entities.FunniestVideos;
import com.mazetube.rand_vid_finder.repositories.FunniestVidRepository;
import com.mazetube.rand_vid_finder.services.FunnyVideoRepoService;
import com.mazetube.rand_vid_finder.services.InterestingVideoRepoService;
import com.mazetube.rand_vid_finder.services.ScaryVideoRepoService;
import com.mazetube.rand_vid_finder.services.YoutubeAPI;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000/")


public class MainPageController {

    @GetMapping("/random-video")
    public String randomVideoID() {

        return YoutubeAPI.fetchRandVideoID();
    }

@Autowired
private FunnyVideoRepoService funnyVidService;

@Autowired
private ScaryVideoRepoService scaryVidService;

@Autowired
private InterestingVideoRepoService interestingVidService;

    @PostMapping("/save-update_rating")
    public void saveVidOrUpdateRating(@RequestParam(name="videoId") String videoId, @RequestParam(name="rating") Integer rating){
        funnyVidService.saveUpdateToRepository(videoId, rating);
    }


    @PostMapping("/save-update-funny_rating")
    public void saveVidUpdateFunnyRating(@RequestParam(name="videoId") String videoId, @RequestParam(name="rating") Integer rating){
        funnyVidService.saveUpdateToRepository(videoId, rating);
    }

    @PostMapping("/save-update-scary_rating")
    public void saveVidUpdateScaryRating(@RequestParam(name="videoId") String videoId, @RequestParam(name="rating") Integer rating){
        scaryVidService.saveUpdateToRepository(videoId, rating);
    }

    @PostMapping("/save-update-interesting_rating")
    public void saveVidUpdateInterestingRating(@RequestParam(name="videoId") String videoId, @RequestParam(name="rating") Integer rating){
        interestingVidService.saveUpdateToRepository(videoId, rating);
    }
}
