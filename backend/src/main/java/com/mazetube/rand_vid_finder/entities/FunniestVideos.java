package com.mazetube.rand_vid_finder.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "funniest_videos")
public class FunniestVideos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // primary key

    @Column(name = "video_id", nullable = false)
    private String videoId;

    @Column(nullable = false)
    private Integer rating;

    // Required no-arg constructor
    public FunniestVideos() {}

    // Constructor for convenience
    public FunniestVideos(String videoId, Integer rating) {
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
