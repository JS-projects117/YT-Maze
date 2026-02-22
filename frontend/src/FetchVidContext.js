import { createContext, useContext, useRef, useState, useEffect   } from "react";
import { RatingTypes } from "./RatingTypes";

const FetchVidContext = createContext();


export function FetchVidProvider({children}){

const [prevVid, setPrevVidID] = useState([]);
const [showError, setShowError] = useState(false);
const [currentVidID, setCurrentVidID] = useState(null);
const [currentVidIndex, setCurrentVidIndex] = useState(null);

const FetchRandVidID = async () =>{
    
    console.log("consulting backend");
    return await
  fetch("http://localhost:8080/api/random-video")
  .then(response => response.text())
  .then(data => {
    if(data !== undefined){
    return data.toString();
    }
  })
  .catch(error => console.error(error + " Server Likely Down"))
} 

const SaveVidOrUpdateRating = async (videoId, rating, category = null) =>{

    let url="";
    if(category == null){
    return await
  fetch(`http://localhost:8080/api/save-video-general?videoId=${videoId}`,{method:"POST"})
  .then(response => response.text())
  .then(data => {

return "success"
  })
  .catch(error => console.error("Error: " + error))
}
else{
    switch(category){
        case RatingTypes.FUNNY:
            url=(`http://localhost:8080/api/save-update-funny_rating?videoId=${videoId}&rating=${rating}`);
            break;
        case RatingTypes.SCARY:
            url=(`http://localhost:8080/api/save-update-scary_rating?videoId=${videoId}&rating=${rating}`);
             break;
        case RatingTypes.INTERESTING:
            url=(`http://localhost:8080/api/save-update-interesting_rating?videoId=${videoId}&rating=${rating}`);
             break;
        
    }
}

    return await
  fetch(url, {method:"POST"})
  .then(response => response.text())
  .then(data => {

return "success"
  })
  .catch(error => console.error("Error: " + error))
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
  let searchAttempts = 0;
const APIFindVidBySearch = async () => {
    try{
    let VidID = await FetchRandVidID();
    if(VidID !==undefined){
        if(prevVid.length <= 0){
                setPrevVidID(prev => [VidID]);
    setCurrentVidID(VidID);
    SaveVidOrUpdateRating(VidID, 0)
        setCurrentVidIndex(0);
        }
        else{
     addVidToMemory(VidID);
        }
    console.log("Fetched and added new video to memory: " + VidID);
    }
    else{
        throw new Error("No Result Returned");
    }
    }
    catch(error){
        console.error("Error fetching video: " + error);
        console.log("retrying...");
        console.log("search attempts " + searchAttempts);
        searchAttempts +=1;
        if(searchAttempts < 5){
        APIFindVidBySearch();
        }
        else{
setShowError(true);
        }   
    }
}

//initializes first video when page loads
useEffect(() => {
    APIFindVidBySearch();
    //moveToNextVidID();
}, []);
return(
    <FetchVidContext.Provider value={{setShowError,addVidToMemory, getPrevVidID, currentVidID, moveToPrevVidID, moveToNextVidID, getSavedVidList, currentVidIndex, SaveVidOrUpdateRating, showError}}>
        {children}
        </FetchVidContext.Provider>
)
}

export function useFetchVid(){
    return useContext(FetchVidContext);
}