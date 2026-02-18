package com.mazetube.rand_vid_finder.services;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mazetube.rand_vid_finder.entities.FunniestVideos;
import com.mazetube.rand_vid_finder.entities.ScaryVideoEntity;
import com.mazetube.rand_vid_finder.repositories.ScaryVidRepository;


@Service
public class ScaryVideoRepoService {
    @Autowired 
    ScaryVidRepository repo;

     //updates rating if video exists, adds to repo if not
    public void saveUpdateToRepository(String videoId, Integer rating){
        if(checkVideoInRepo(videoId)){
            updateVideoRating(videoId, rating);
        }
        else{
            repo.save(new ScaryVideoEntity(videoId, rating));
        }
    }

    private void updateVideoRating(String videoId, Integer rating){
        List<ScaryVideoEntity> videoList = repo.findByVideoId(videoId);
        if(videoList.size() > 0){
            //only 1 result should be returned at all points no matter what
           ScaryVideoEntity video = videoList.get(0);
           video.setRating(rating);

//TODO add video rating calculation logic

           //jpa auto translates to SQL update
           repo.save(video);

        }
    }
    
    private boolean checkVideoInRepo(String videoId){
        List<ScaryVideoEntity> videoList = repo.findByVideoId(videoId);
        if(videoList.size() > 0){
            return true;
        }
        return false;
    }
}
