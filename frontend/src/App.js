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
  const {getPrevVidID, currentVidID, moveToPrevVidID, moveToNextVidID, getSavedVidList, currentVidIndex} = useFetchVid();

function VideoDisplayFetch(){


const containerRef = React.useRef(null);
const [centerX, setCenterX] = React.useState(null);

useEffect(() => {
  if(containerRef.current){
    setCenterX(containerRef.current.offsetWidth / 2)
  }
}, []);


console.log(getPrevVidID());
return(

  <div className="carousel_container" ref={containerRef}>

      {getSavedVidList().map((vidID, index) => {
        

              let currVid = currentVidIndex.current;
//restricts rendered vids to only 5 on screen at a time
if(!(Math.abs(index - currVid) < 3)){
  return;
}

//calculates offset from current vid and adjusts sizes to emphasize current video
      let vidWidth = 450;
      let vidHeight = 450
      let xOffset = 0
let sizeOffset = Math.abs(index - currVid) + 1;

      if (index > currVid){
        xOffset = (index - currVid) * vidWidth;
        xOffset += vidWidth/index;
      }
      else if (index < currVid){
        xOffset = -1 * (currVid - index) * vidWidth;
        xOffset += vidWidth/index;
      }

        return(
    console.log("x center is " + centerX),
    //divides width by 2 to center video at a position then applies calculated offset e.g. + xOffset
    <div className="video_container" style={{transform: `translateX(${((centerX - (vidWidth/2)) + xOffset)}px) translateY(20px)`, position: "absolute"}}>
<img width={(vidWidth / sizeOffset)} height={vidHeight / sizeOffset} src={`https://img.youtube.com/vi/${vidID}/hqdefault.jpg`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
</img>
    </div>
        )
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
