package com.mazetube.rand_vid_finder.services;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.mazetube.rand_vid_finder.WordBank;

@Service            
public class YoutubeAPI {
    private static final String API_KEY = "AIzaSyDcf5eX02jheu3dGNMFGXgbAb-YSP_HpA8";

    public static String fetchRandVideoID(){
         String response = "";
        try{
        String searchWords = WordBank.getRandomNouns();
System.out.println("fetched  " + searchWords);
         String url = "https://www.googleapis.com/youtube/v3/search?" + "part=snippet&type=video&maxResults=1&q=" + searchWords + "&safeSearch=none&key=" + API_KEY;
         RestTemplate restTemplate = new RestTemplate();
        response = restTemplate.getForObject(url, String.class);
         
        }catch(Exception e){
            System.out.println("Error Fetching Video ID, retrying...");
            fetchRandVideoID();
        }

        String searchTerm = "videoId\": \"";
        // Finds index end index of search term by adding length of itelf
        int idStartIndex = response.indexOf(searchTerm) + searchTerm.length();
        System.out.println(response);
        int idEndIndex = response.indexOf('"', idStartIndex);
        String videoID = response.substring(idStartIndex, idEndIndex);
        return videoID;
    }
}
