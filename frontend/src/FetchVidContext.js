import { createContext, useContext, useRef, useState, useEffect   } from "react";


const FetchVidContext = createContext();


export function FetchVidProvider({children}){
const [prevVid, setPrevVidID] = useState([]);
const [currentVidID, setCurrentVidID] = useState(null);

const addVidToMemory = (vidID) =>{
    setPrevVidID(prev => [... prev, vidID]);
    setCurrentVidID(vidID);
}

const getPrevVidID = () =>{
    let currVidIDIndex = prevVid.indexOf(currentVidID);
    return currVidIDIndex - 1 > 0 ? prevVid[currVidIDIndex - 1] : null;
}

const moveToPrevVidID = () => {
    let currVidIDIndex = prevVid.indexOf(currentVidID);
        if(currVidIDIndex - 1 > 0){
setCurrentVidID(prevVid[currVidIDIndex - 1]);
    }
    else if(prevVid.length > 0){
setCurrentVidID(prevVid[0])
    }
    else{
        setCurrentVidID(null)
    }
}

const moveToNextVidID = async () => {

if(prevVid != null && currentVidID != null){
    let currVidIDIndex = prevVid.indexOf(currentVidID);
    if(currVidIDIndex + 1 < prevVid.length){
       
        setCurrentVidID(prevVid[currVidIDIndex + 1]);
         console.log("Moved to next video:  " + currVidIDIndex);
    }
}else{
    console.log("Fetching new video as there is no current video");
        //fetches and adds new video to memory which then sets curr vid to newly found vid
        await APIFindVidBySearch();
    }
}

const GenerateSearchWords = () => {

   let stramg = ["dog ","minecraft ","cat ","dirt ","bug ","thing" ];   
      let newWord = ""
      for(let i = 0; i < (Math.random() * (stramg.length - 1)) ;i++){
        newWord += stramg[Math.floor(Math.random() * stramg.length)]
      }
  return(
    newWord
  )
}
  
const APIFindVidBySearch = async () => {
    console.log("start of fetch");
    const API_KEY = "";
    let searchWord = GenerateSearchWords();
//fetches 1st video from youtube api v3
await fetch(`https://www.googleapis.com/youtube/v3/search?` +
      `part=snippet&type=video&maxResults=1&q=${searchWord}&safeSearch=none&key=${API_KEY}`
    ).then(response => response.json().then(data => {
         if (data.items && data.items.length > 0) {
         addVidToMemory(data.items[0].id.videoId);
         console.log("Fetched new video with search term: " + searchWord);
      }
      else{
        console.error("No video results found for the search term: " + searchWord);
      }
    }

)).catch(error => console.error("Error fetching video: " + error));

  console.log("end of fetch");
}


// useEffect(() => {
//     moveToNextVidID();
// }, []);
return(
    <FetchVidContext.Provider value={{addVidToMemory, getPrevVidID, currentVidID, moveToPrevVidID, moveToNextVidID}}>
        {children}
        </FetchVidContext.Provider>
)
}

export function useFetchVid(){
    return useContext(FetchVidContext);
}