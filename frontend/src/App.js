import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";

function App() {

const [message, setMessage] = useState("literally nothing")

//connection to backend
// useEffect( () => {
//   fetch("http://localhost:8080/api/testpage")
//   .then(response => response.text())
//   .then(data => setMessage(data))
//   .catch(error => console.error("Some stupid error happended: " + error))
// }
// )

  return (

<AppContent/>
  );
}

function AppContent(){
    const [searchWord, setSearchWord] = useState(GenerateSearchWords());
    const [vidID, setVidID] = useState("dQw4w9WgXcQ"); //default video
    let prevVideos = [];
    const API_KEY = "";
//fetches 1st video from youtube api v3
useEffect(() => {
    fetch(
              `https://www.googleapis.com/youtube/v3/search?` +
      `part=snippet&type=video&maxResults=1&q=${searchWord}&safeSearch=none&key=${API_KEY}`
    ).then((response) => response.json()
     .then((data) => {
      if (data.items && data.items.length > 0) {
        setVidID(data.items[0].id.videoId);
        console.log("SEARCH WORD: " + searchWord);
      }
      else{
        console.error("No video results found for the search term: " + searchWord);
      }
    }
  ).catch((error) => {
    console.error("Error fetching video using youtube api3: " + error);
    })
  )

  }, [searchWord]);


function VideoDisplayFetch({videoID}){

  //console.log("FOUND:  " + videoID);

prevVideos.push(`https://www.youtube.com/embed/${videoID}`);
  return(
    <div className="video_container">
<iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoID}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
  )
}

//used for navigating between old and new videos
function VideoNavButtons(){
  return(
    <row>
    <button onClick = {console.log("clicked button")}>Prev Video</button>
    <button onClick = {() => {

    setSearchWord(GenerateSearchWords)
    
    }}>New Video</button>
    </row>
  )
}


  return(
<div className = "app_container">
  
  <HeaderNavbar/>
  <main>
<VideoDisplayFetch videoID={vidID}/>
<VideoNavButtons/>
</main>
</div>
  );
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
  


function HeaderNavbar(){
  return(

<div className="header_navbar">

<text className="app_title">Random Video Recommender</text>
  <button onClick={{}}>Top Funniest</button>
   <button onClick={{}}>Top Scariest</button>
</div>

  );
}

export default App;
