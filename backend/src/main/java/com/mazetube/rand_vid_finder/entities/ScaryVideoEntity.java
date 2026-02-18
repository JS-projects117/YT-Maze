package com.mazetube.rand_vid_finder.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "scary_videos")
public class ScaryVideoEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //primary key

    @Column(name="video_id", nullable = false)
    private String videoId;

    @Column(nullable=false)
    private Integer rating;

    public ScaryVideoEntity(){}

    public ScaryVideoEntity(String videoId, Integer rating){
        this.videoId = videoId;
        this.rating = rating;
    }

        // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }


    public String getVideoId() { return videoId; }
    public void setVideoId(String videoId) { this.videoId = videoId; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
}
