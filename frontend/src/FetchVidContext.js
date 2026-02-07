import { createContext, useContext, useRef, useState, useEffect   } from "react";
import {nouns} from "./wordBank";

const FetchVidContext = createContext();


export function FetchVidProvider({children}){
    //set back to [] later after testing and re-add api key
const [prevVid, setPrevVidID] = useState([]);
//   "dQw4w9WgXcQ", // Rick Astley
//   "3JZ_D3ELwOQ", // ray williamoid
//   "L_jWHffIx5E", // Smells Like Teen Spirit
//   "9bZkp7q19f0", // Gangnam Style
//   "kJQP7kiw5Fk", // Despacito
//   "fLexgOxsZu0", // Uptown Funk
//   "hTWKbfoikeg", // Nirvana - Smells Like Teen Spirit alt
//   "e-ORhEE9VVg", // Taylor Swift - Blank Space
//   "CevxZvSJLk8", // Katy Perry - Roar
//   "OPf0YbXqDm0", // Mark Ronson - Uptown Funk
//   "V-_O7nl0Ii0", // Nyan Cat
//   "tAGnKpE4NCI", // Nothing Else Matters
// ]);
const [currentVidID, setCurrentVidID] = useState(null);
const currentVidIndex = useRef(null);

const addVidToMemory = (vidID) =>{
    setPrevVidID(prev => [... prev, vidID]);
    setCurrentVidID(vidID);
}

const getPrevVidID = () =>{
    let currVidIDIndex = currentVidIndex.current
    return currVidIDIndex - 1 >= 0 ? prevVid[currVidIDIndex - 1] : null;
}

const getSavedVidList = () => {
    return prevVid;
}

const moveToPrevVidID = () => {
    let i = currentVidIndex.current;
        if(i - 1 > 0){
        currentVidIndex.current = i - 1;
setCurrentVidID(prevVid[currentVidIndex.current]);
    }
    else if(prevVid.length > 0){
        currentVidIndex.current = 0;
setCurrentVidID(prevVid[currentVidIndex.current]);
    }
    else{
        APIFindVidBySearch();
    }
}

const moveToNextVidID = async () => {

    //could be improved by using map or saving index, however for this small scale projects its unnecessary
if(prevVid != null){

    //console.log(prevVid.length.toString() + " " + prevVid.findIndex(currentVidID).toString());

    let i = currentVidIndex.current;

    if(i + 1 < prevVid.length){
       
        currentVidIndex.current = i + 1;
        setCurrentVidID(prevVid[currentVidIndex.current]);
         console.log("Moved to next video:  " + currentVidIndex.current);
return;
}
    console.log("Fetching new video as there is no current video");
        //fetches and adds new video to memory which then sets curr vid to newly found vid
        await APIFindVidBySearch();
    }
}
const GenerateSearchWords = () => {

   let stramg = nouns;  
      let newWord = ""
      for(let i = 0; i < (Math.random() * 3) ;i++){
        newWord += stramg[Math.floor(Math.random() * stramg.length)] + " ";
      }
      console.log("Generated search word: " + newWord);
  return(
    newWord
  )
}
  
const APIFindVidBySearch = async () => {
    console.log("start of fetch");
    const API_KEY = "no your mom"; // Replace with your actual API key
    let searchWord = GenerateSearchWords();
//fetches 1st video from youtube api v3
await fetch(`https://www.googleapis.com/youtube/v3/search?` +
      `part=snippet&type=video&maxResults=1&q=${searchWord}&safeSearch=none&key=${API_KEY}`
    ).then(response => response.json().then(data => {
         if (data.items && data.items.length > 0) {
         addVidToMemory(data.items[0].id.videoId);
         currentVidIndex.current = prevVid.length;
         console.log("Fetched new video with search term: " + searchWord);
      }
      else{
        console.error("No video results found for the search term: " + searchWord + " \n Try Checking if API valid and still has quota left");
      }
    }

)).catch(error => console.error("Error fetching video: " + error));

  console.log("end of fetch");
}


useEffect(() => {
    moveToNextVidID();
}, []);
return(
    <FetchVidContext.Provider value={{addVidToMemory, getPrevVidID, currentVidID, moveToPrevVidID, moveToNextVidID, getSavedVidList, currentVidIndex}}>
        {children}
        </FetchVidContext.Provider>
)
}

export function useFetchVid(){
    return useContext(FetchVidContext);
}