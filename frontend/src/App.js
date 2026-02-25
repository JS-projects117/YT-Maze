import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";
import { useFetchVid, FetchVidProvider } from './FetchVidContext';
import Dropdown from 'react-bootstrap/Dropdown';
import Foo from "./starRating";
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import RatedVidPage from './ratedVidPage';
import { RatingTypes } from './RatingTypes';
import {AboutPage} from './about'

function App() {

  return (

<BrowserRouter>
<FetchVidProvider>
<Routes>
  <Route path='/' element={<AppContent/>}/>
  <Route path='/vid-ranking' element={<RatedVidPage/>}/>
  <Route path='/about' element={<AboutPage/>}/>
</Routes>
</FetchVidProvider>
</BrowserRouter>
  );
}
//container for main app content, used to allow global esc access to fetchvideo context
function AppContent(){
  const {setShowError, showError, currentVidID, moveToPrevVidID, moveToNextVidID, getSavedVidList, currentVidIndex, SaveVidOrUpdateRating} = useFetchVid();

function VideoDisplayFetch(){
const containerRef = React.useRef(null);

//console.log("VIDEO ID:  " + currentVidID);
return(

  <div className="carousel_container" ref={containerRef}>

      {getSavedVidList().map((vidID, index) => {
        
//calculates offset from current vid and adjusts sizes to emphasize current video
let vidWidthHeight = 450;


              let currVid = currentVidIndex;
//restricts rendered vids to only 5 on screen at a time
let imgDistance = Math.abs(index - currVid)
if(!(imgDistance < 3)){
  return;
}

let centerX = window.innerWidth/2;
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
    <div className="video_container" style={{transform: `translateX(${xOffset}px)`, position: "absolute", opacity: (1 / 1.5) ** Math.abs(index - currVid) }}>
<img style={{borderRadius:"15px", boxShadow:`0 ${8/Math.abs(distance)}px 5px`}} width={(scaledWidth)} height={scaledWidth} src={`https://img.youtube.com/vi/${vidID}/hqdefault.jpg`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
</img>
    </div>
        )
      }
      else{
return(
    <div className="video_container" style={{transform: `translateX(${xOffset}px)`, position: "absolute", opacity: (1 / 1.5) ** Math.abs(index - currVid) }}>
<iframe style={{borderRadius:"15px", boxShadow:"0 8px 5px"}} width={scaledWidth} height={scaledWidth} src={`https://www.youtube.com/embed/${vidID}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen>
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
      <div style={{display:'flex', flexDirection:"column", alignItems:"center"}}>
    <div style={{display:'flex', flexDirection:"row"}}>
    <button className="nav-button" onClick = {
      () => {
      moveToPrevVidID();
    }}>Prev Video</button>
    <button className="nav-button" onClick = {() => {

    moveToNextVidID();
   
    }}>New Video</button>
    </div>
    <VideoRateDropdown/>
    </div>
    </div>
  )
}

function ErrorDialogue(){
document.addEventListener("keydown", function(event){
if(event.key === "Escape"){
    setShowError(false)
}
})

    return(
        <div className="darken-screen">
        <div className="rate-vid-dialogue">
<div className='error-text'>Video Requests Are Shared Among Users and Do Run Out, Please Check The Site Again Tomorrow When More Requests Are Available.</div>
    <button className="escape-button" onClick={() => setShowError(false)}>Esc</button>

        </div>
        </div>
    )
}
function VideoRateDropdown(){
  const [selected, setSelected] = useState(false);
  const [category, setCategory] = useState(null);
  const [rating, setRating] = useState(0);

  //if the user inputs any rating the rating in the db will be updates
  //TODO add selection limit to prevent overrating exploit
if(rating > 0){
 SaveVidOrUpdateRating(currentVidID, rating, category);

}

  if(selected === true && category === null){
  return (
<div>
      <button className='rating-button' onClick={() => setCategory(RatingTypes.FUNNY)}>Funny</button>
    <button className='rating-button' onClick={() => setCategory(RatingTypes.SCARY)}>Scary</button>
    <button className='rating-button' onClick={() => setCategory(RatingTypes.INTERESTING)}> Interesting</button>
</div>
  );
}else if(category !== null){
return(
<>
<Foo rating={rating} setRating={setRating}/>
</>
);
}
  else{
  return(
    <div>
      <button className="nav-button" value="red" onClick={() => setSelected(true)}>Rate Video</button>
</div>
)
}
}


  return(
<div className = "app_container">
  
  <HeaderNavbar/>
    <div class="mountain-foreground"></div>
  <div class="cloud"></div>
  <div class="particle-container">
  <div class="particle"></div>
  <div class="particle"></div>
  <div class="particle"></div>
    <div class="particle"></div>
  <div class="particle"></div>
    <div class="particle"></div>
  <div class="particle"></div>
</div>
    <h1 className='night-background'></h1>
  <h1 className='spin'></h1>
{!showError && <VideoDisplayFetch/>}
{!showError && <VideoNavButtons/>}
{showError && <ErrorDialogue/>}
</div>
  );
}


function HeaderNavbar(){
  const navigate = useNavigate();
  return(

<div className="header_navbar">

  <div className="nav-left">
    <button
      className="nav-button"
      onClick={() => navigate("/vid-ranking")}
    >
      Ranked Videos
    </button>
  </div>

  <div className="nav-center">
    Vidi Maze
  </div>

  <div className="nav-right">
    <button
      className="nav-button"
      onClick={() => navigate("/about")}
    >
      About
    </button>
  </div>

</div>
  );
}

export default App;
