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
const [currentVidIndex, setCurrentVidIndex] = useState(null);

const FetchRandVidID = async () =>{
    
    console.log("consulting backend");
    return await
  fetch("http://localhost:8080/api/random-video")
  .then(response => response.text())
  .then(data => {
    
    return data.toString();
  })
  .catch(error => console.error("Some stupid error happended: " + error))
  return "no video found";
} 

const SaveVidOrUpdateRating = async (videoId, rating, category = null) =>{

    return await
  fetch(`http://localhost:8080/api/save-update_rating?videoId=${videoId}&rating=${rating}`,{method:"POST"})
  .then(response => response.text())
  .then(data => {

return "success"
  })
  .catch(error => console.error("Some stupid error happended: " + error))
} 

const addVidToMemory = (vidID) =>{
    setPrevVidID(prev => [... prev, vidID]);
    setCurrentVidID(vidID);
    SaveVidOrUpdateRating(vidID, 0)

    if(prevVid.length == 0){
        setCurrentVidIndex(0);
    }
    else{
        setCurrentVidIndex(prevVid.length);
    }
}

const getPrevVidID = () =>{
    let currVidIDIndex = currentVidIndex
    return currVidIDIndex - 1 >= 0 ? prevVid[currVidIDIndex - 1] : null;
}

const getSavedVidList = () => {
    return prevVid;
}

const moveToPrevVidID = () => {
    let i = currentVidIndex;
        if(i - 1 > 0){
        setCurrentVidIndex(i - 1);
        setCurrentVidID(prevVid[i - 1]);
    }
    else if(prevVid.length > 0){
        setCurrentVidIndex(0);
        setCurrentVidID(prevVid[0]);
    }
    else{
        APIFindVidBySearch();
    }
}

const moveToNextVidID = async () => {
if(prevVid != null){

    //console.log(prevVid.length.toString() + " " + prevVid.findIndex(currentVidID).toString());

    let i = currentVidIndex;

    if(i + 1 < prevVid.length){
       
        setCurrentVidIndex(i + 1);
        setCurrentVidID(prevVid[i + 1]);
         console.log("Moved to next video:  " + (i + 1));
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

    try{
    let VidID = await FetchRandVidID();
     addVidToMemory(VidID);
    console.log("Fetched and added new video to memory: " + VidID);
    }
    catch(error){
        console.error("Error fetching video: " + error);
        console.log("retrying...");
        APIFindVidBySearch();   
    }
}

//initializes first video when page loads
useEffect(() => {
    APIFindVidBySearch();
    //moveToNextVidID();
}, []);
return(
    <FetchVidContext.Provider value={{addVidToMemory, getPrevVidID, currentVidID, moveToPrevVidID, moveToNextVidID, getSavedVidList, currentVidIndex, SaveVidOrUpdateRating}}>
        {children}
        </FetchVidContext.Provider>
)
}

export function useFetchVid(){
    return useContext(FetchVidContext);
}