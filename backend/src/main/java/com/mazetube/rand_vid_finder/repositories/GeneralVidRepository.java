package com.mazetube.rand_vid_finder.repositories;

import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.mazetube.rand_vid_finder.entities.GeneralVideoEntity;

    @Repository
    public interface GeneralVidRepository extends JpaRepository<GeneralVideoEntity, Long> {
       List<GeneralVideoEntity> findByVideoId(String videoId);

        
    }

