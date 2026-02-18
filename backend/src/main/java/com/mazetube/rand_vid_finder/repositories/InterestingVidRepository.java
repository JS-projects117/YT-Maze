package com.mazetube.rand_vid_finder.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mazetube.rand_vid_finder.entities.InterestingVideoEntity;
import com.mazetube.rand_vid_finder.entities.ScaryVideoEntity;

@Repository
public interface InterestingVidRepository extends JpaRepository<InterestingVideoEntity, Long> {
    List<InterestingVideoEntity> findByVideoId(String videoId);
}
