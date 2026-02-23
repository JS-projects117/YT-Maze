package com.mazetube.rand_vid_finder.entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import jakarta.persistence.*;

@Entity
@Table(name = "general_videos")
public class GeneralVideoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // primary key

    @Column(name = "video_id", nullable = false)
    private String videoId;

    // Required no-arg constructor
    public GeneralVideoEntity() {}

    // Constructor for convenience
    public GeneralVideoEntity(String videoId) {
        this.videoId = videoId;
        
    }

    @CreationTimestamp
    @Column(nullable = false, updatable = false, name = "date_added")
    private LocalDateTime dateAdded;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }


    public String getVideoId() { return videoId; }
    public void setVideoId(String videoId) { this.videoId = videoId; }


}
