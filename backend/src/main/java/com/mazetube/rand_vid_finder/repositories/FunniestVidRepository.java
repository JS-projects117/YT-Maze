package com.mazetube.rand_vid_finder.repositories;

import org.springframework.stereotype.Repository;

public class FunniestVidRepository {
    
    @Repository
    public interface FunniestVidRepository extends JpaRepository<FunniestVideos, Long> {
        List<FunniestVideos> findFunnyVideoListId(Long id);

        
    }
}
