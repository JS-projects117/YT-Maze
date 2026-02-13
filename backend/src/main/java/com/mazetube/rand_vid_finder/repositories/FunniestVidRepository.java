package com.mazetube.rand_vid_finder.repositories;

import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.mazetube.rand_vid_finder.entities.FunniestVideos;

    @Repository
    public interface FunniestVidRepository extends JpaRepository<FunniestVideos, Long> {
       // List<FunniestVideos> findById(Long id);

        
    }

