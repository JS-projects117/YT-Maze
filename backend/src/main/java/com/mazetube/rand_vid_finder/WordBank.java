package com.mazetube.rand_vid_finder;

public class WordBank {
    private static final String[] NOUNS = {
  "toaster",
  "nebula",
  "dumpster",
  "velociraptor",
  "hoodie",
  "microwave",
  "banjo",
  "asteroid",
  "gremlin",
  "thermostat",
  "waffle",
  "spaceship",
  "meme",
  "hamster",
  "skyscraper",
  "glitch",
  "sandwich",
  "tornado",
  "yogurt",
  "laser",
  "penguin",
  "volcano",
  "keyboard",
  "cactus",
  "drama",
  "cannon",
  "pyramid",
  "sock",
  "algorithm",
  "cheeseburger",
  "satellite",
  "wizard",
  "pickle",
  "galaxy",
  "pogoStick",
  "marble",
  "dragon",
  "headphones",
  "firework",
  "pancake",
  "portal",
  "battery",
  "bunker",
  "crystal",
  "hoverboard",
  "dust",
  "paradox",
  "helmet",
  "anchor",
  "vortex"
    };
    public static String getRandomNouns(){
        String randomNouns = "";
        for(int i = 0; i < Math.random() * 3; i++){
            randomNouns += NOUNS[(int)(Math.random() * NOUNS.length - 1)] + " ";
        }
        return randomNouns;
    }
}
