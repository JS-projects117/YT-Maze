package com.mazetube.rand_vid_finder.services;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.mazetube.rand_vid_finder.entities.InterestingVideoEntity;
import com.mazetube.rand_vid_finder.repositories.InterestingVidRepository;
import java.util.Map;



@Service
public class InterestingVideoRepoService
 {
     
    @Autowired
    InterestingVidRepository repo;

    //updates rating if video exists, adds to repo if not
    public void saveUpdateToRepository(String videoId, Integer rating){
        if(checkVideoInRepo(videoId)){
            updateVideoRating(videoId, rating);
        }
        else{
            repo.save(new InterestingVideoEntity(videoId, rating));
        }
    }

    public Map<String, Float> getAllVideos(){
        List<InterestingVideoEntity> vidInfo = repo.findAll();

    return vidInfo.stream()
            .filter(v -> v.getRating() > 0)
            .sorted((v1, v2) -> Float.compare(v2.getRating(), v1.getRating())) // descending
            .collect(Collectors.toMap(
                    InterestingVideoEntity::getVideoId,          // key
                    InterestingVideoEntity::getRating,           // value
                    (oldVal, newVal) -> oldVal,          // merge function (keeps first if duplicate)
                    LinkedHashMap::new                    // map supplier to preserve order
                ));
    }

    private void updateVideoRating(String videoId, Integer rating){
List<InterestingVideoEntity> videoList = repo.findByVideoId(videoId);

if (!videoList.isEmpty()) {
    InterestingVideoEntity video = videoList.get(0);
    long oldCount = video.getVoteCount();
    Float oldAverage = video.getRating();
    Float newVote = rating.floatValue();

    Float newAverage = ((oldAverage * oldCount) + newVote) / (oldCount + 1);

    video.setVoteCount(oldCount + 1);
    video.setRating(newAverage); // stores full precision
    repo.save(video);
}

    }
    
    private boolean checkVideoInRepo(String videoId){
        List<InterestingVideoEntity> videoList = repo.findByVideoId(videoId);
        if(videoList.size() > 0){
            return true;
        }
        return false;
    }
}
