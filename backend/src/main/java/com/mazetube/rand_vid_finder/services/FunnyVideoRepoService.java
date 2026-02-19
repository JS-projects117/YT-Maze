package com.mazetube.rand_vid_finder.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mazetube.rand_vid_finder.entities.FunniestVideos;
import com.mazetube.rand_vid_finder.repositories.FunniestVidRepository;

@Service
public class FunnyVideoRepoService {
    
    @Autowired
    FunniestVidRepository repo;

    //updates rating if video exists, adds to repo if not
    public void saveUpdateToRepository(String videoId, Integer rating){
        if(checkVideoInRepo(videoId)){
            updateVideoRating(videoId, rating);
        }
        else{
            repo.save(new FunniestVideos(videoId, rating));
        }
    }

    private void updateVideoRating(String videoId, Integer rating){
List<FunniestVideos> videoList = repo.findByVideoId(videoId);

if (!videoList.isEmpty()) {
    FunniestVideos video = videoList.get(0);
    long oldCount = video.getVoteCount();
    Float oldAverage = video.getRating();
    Float newVote = rating.floatValue();

    Float newAverage = ((oldAverage * oldCount) + newVote) / (oldCount + 1);

    video.setVoteCount(oldCount + 1);
    video.setRating(newAverage); // store full precision
    repo.save(video);
}

    }
    
    private boolean checkVideoInRepo(String videoId){
        List<FunniestVideos> videoList = repo.findByVideoId(videoId);
        if(videoList.size() > 0){
            return true;
        }
        return false;
    }
}
