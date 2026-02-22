package com.mazetube.rand_vid_finder.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.mazetube.rand_vid_finder.entities.GeneralVideoEntity;
import com.mazetube.rand_vid_finder.repositories.GeneralVidRepository;

@Service
public class GeneralVideoRepoService {
    
    @Autowired
    GeneralVidRepository repo;

    //adds video to repo, does nothing if already existing
    public void saveUpdateToRepository(String videoId){
        if(checkVideoInRepo(videoId)){
            return;
        }
        else{
            repo.save(new GeneralVideoEntity(videoId));
        }
    }
    
    private boolean checkVideoInRepo(String videoId){
        List<GeneralVideoEntity> videoList = repo.findByVideoId(videoId);
        if(videoList.size() > 0){
            return true;
        }
        return false;
    }
}
