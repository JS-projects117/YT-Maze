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
//container for main app content, used to allow global esc access to fetchvideo context
function AppContent(){
  const {getPrevVidID, currentVidID, moveToPrevVidID, moveToNextVidID, getSavedVidList, currentVidIndex} = useFetchVid();

function VideoDisplayFetch(){


const containerRef = React.useRef(null);
const [centerX, setCenterX] = React.useState(null);

useEffect(() => {
  if(containerRef.current){
    setCenterX(containerRef.current.offsetWidth / 2)
  }
}, []);


console.log("VIDEO ID:  " + currentVidID);
return(

  <div className="carousel_container" ref={containerRef}>

      {getSavedVidList().map((vidID, index) => {
        
//calculates offset from current vid and adjusts sizes to emphasize current video
let vidWidthHeight = 450;


              let currVid = currentVidIndex.current;
//restricts rendered vids to only 5 on screen at a time
let imgDistance = Math.abs(index - currVid)
if(!(imgDistance < 3)){
  return;
}

let xOffset = 0;

let sizeOffset = Math.abs(index - currVid) + 1;
let scaledWidth = vidWidthHeight / sizeOffset;

// base spacing between video centers (fixed, independent of scaled width)
let baseSpacing = 420;

// calculate distance from center
let distance = index - currVid;

// X offset = distance * baseSpacing
xOffset = distance * baseSpacing;

if(index !== currVid){
        return(
    //console.log("x center is " + centerX),
    //divides width by 2 to center video at a position then applies calculated offset e.g. + xOffset
    <div className="video_container" style={{transform: `translateX(${((centerX - (scaledWidth/2)) + xOffset)}px) translateY(20px)`, position: "absolute", opacity: (1 / 1.5) ** Math.abs(index - currVid) }}>
<img width={(scaledWidth)} height={scaledWidth} src={`https://img.youtube.com/vi/${vidID}/hqdefault.jpg`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
</img>
    </div>
        )
      }
      else{
return(
    <div className="video_container" style={{transform: `translateX(${((centerX - (scaledWidth/2)) + xOffset)}px) translateY(20px)`, position: "absolute", opacity: (1 / 1.5) ** Math.abs(index - currVid) }}>
<iframe width={scaledWidth} height={scaledWidth} src={`https://www.youtube.com/embed/${vidID}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen>
</iframe>
    </div>
)
        }
      }
      )}
  </div>

);
}

//used for navigating between old and new videos
function VideoNavButtons(){
  return(
    <div className="video_nav_buttons">
    <button onClick = {
      () => {
      moveToPrevVidID();
    }}>Prev Video</button>
    <button onClick = {() => {

    moveToNextVidID();
   
    }}>New Video</button>
    </div>
  )
}


  return(
<div className = "app_container">
  
  <HeaderNavbar/>
  <div className="carousel_wrapper">
<VideoDisplayFetch/>
<VideoNavButtons/>
</div>
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
