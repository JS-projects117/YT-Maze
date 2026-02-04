import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";
import { useFetchVid, FetchVidProvider } from './FetchVidContext';


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

<FetchVidProvider>
<AppContent/>
</FetchVidProvider>
  );
}

function AppContent(){
  const {getPrevVidID, currentVidID, moveToPrevVidID, moveToNextVidID} = useFetchVid();



function VideoDisplayFetch(){
console.log(getPrevVidID());


  return(
    <div className="video_container">
<iframe width="560" height="315" src={`https://www.youtube.com/embed/${currentVidID}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
  )
}

//used for navigating between old and new videos
function VideoNavButtons(){
  return(
    <row>
    <button onClick = {
      () => {
      moveToPrevVidID();
    }}>Prev Video</button>
    <button onClick = {() => {

    moveToNextVidID();
   
    }}>New Video</button>
    </row>
  )
}


  return(
<div className = "app_container">
  
  <HeaderNavbar/>
  <main>
<VideoDisplayFetch/>
<VideoNavButtons/>
</main>
</div>
  );
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
