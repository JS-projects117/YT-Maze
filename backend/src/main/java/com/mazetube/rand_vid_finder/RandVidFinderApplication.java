package com.mazetube.rand_vid_finder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.mazetube.rand_vid_finder.services.YoutubeAPI;

@SpringBootApplication
public class RandVidFinderApplication {

	public static void main(String[] args) {
		SpringApplication.run(RandVidFinderApplication.class, args);
	}

}
