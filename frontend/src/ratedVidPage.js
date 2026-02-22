import { data, useNavigate } from "react-router-dom"
import "./ratedVidPage.css"
import { useState, useEffect } from "react";
import Foo from "./starRating";

//category options scary interesting and funny
const FetchVidRanks = (async (category) => {
return await(fetch(`http://localhost:8080/api/get-${category}-vids`)
.then(response => response.json())
.then(data => {
    return(data)
})
.catch(error => console.error(error))
);
})

const UpdateRating = async (videoId, rating, category) => {
    try {
        const response = await fetch(
            `http://localhost:8080/api/save-update-${category}_rating?videoId=${videoId}&rating=${rating}`, {method:"POST"}
        );
        const data = await response.text();
        return "success";
    } catch (error) {
        console.log(error);
        return "error";
    }
}


 export default function RatedVidPage(){
const navigate = useNavigate();
//stores video id and category in a list
//a dictionary would be superior for organization
const [vidInfo, setVidInfo] = useState(null); //when not null dialogue will appear
    return(
        <>
        {vidInfo !== null && <RateVideoDialogue/>}
        <div className="app-content">
        <div className="nav-bar">
            <button className="nav-button" onClick={() => navigate("/")}>
                RETURN
            </button>
            <div className="nav-title">
                Ranked Videos
                <h6 className="nav-description">-See what others think</h6>
            </div>
        </div>
                     <div style={{display:"flex", flexDirection:"row", justifyContent:"center", paddingTop:"10px"}}>
            <FunnyVidColumn/>
            <ScaryVidColumn/>
            <InterestingVidColumn/>
            </div>
        </div>
        </>
    )




    function FunnyVidColumn(){
          const [funnyVidMap, setFunnyVidMap] = useState(new Map());
const category = "funny";
  useEffect(() => {
    async function fetchData() {
      const data = await FetchVidRanks(category);
      setFunnyVidMap(new Map(Object.entries(data)));
    }
    fetchData();
  }, []);
    return (
        <div className="ranked-column">
            Funniest
            {Array.from(funnyVidMap.entries()).map(([videoId, rating], i) => (
                <button key={videoId} onClick={() => setVidInfo([videoId,category])} className="video-container">
                    <img 
                        width={300} 
                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
                        alt={`Video ${videoId}`} 
                    />
                    <div className="video-stat-bar">Rating: {(parseFloat(rating).toPrecision(2))}</div>
                </button>
            ))}
        </div>
    );
}
    function ScaryVidColumn(){
          const [funnyVidMap, setFunnyVidMap] = useState(new Map());
        const category = "scary";
  useEffect(() => {
    async function fetchData() {
      const data = await FetchVidRanks(category);
      setFunnyVidMap(new Map(Object.entries(data)));
    }
    fetchData();
  }, []);
    return (
        <div className="ranked-column">
            Scariest
            {Array.from(funnyVidMap.entries()).map(([videoId, rating], i) => (
                <button key={videoId} onClick={() => setVidInfo([videoId,category])} className="video-container">
                    <img 
                        width={300} 
                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
                        alt={`Video ${videoId}`} 
                    />
                    <div className="video-stat-bar">Rating: {(parseFloat(rating).toPrecision(2))}</div>
                </button>
            ))}
        </div>
    );
}
    function InterestingVidColumn(){
          const [funnyVidMap, setFunnyVidMap] = useState(new Map());
const category = "interesting";
  useEffect(() => {
    async function fetchData() {
      const data = await FetchVidRanks(category);
      setFunnyVidMap(new Map(Object.entries(data)));
    }
    fetchData();
  }, []);
    return (
        <div className="ranked-column">
            Ineresting
            {Array.from(funnyVidMap.entries()).map(([videoId, rating], i) => (
                <button key={videoId} onClick={() => setVidInfo([videoId,category])} className="video-container">
                    <img 
                        width={300} 
                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
                        alt={`Video ${videoId}`} 
                    />
                    <div className="video-stat-bar">Rating: {(parseFloat(rating).toPrecision(2))}</div>
                </button>
            ))}
        </div>
    );
}

function RateVideoDialogue(){
    const [rating, setRating] = useState(0);
document.addEventListener("keydown", function(event){
if(event.key === "Escape"){
    setVidInfo(null);
}
})
    if(rating > 0){
        //vid info stores 0->video id and 1 ->video category e.g. "scary"
        UpdateRating(vidInfo[0], rating, vidInfo[1])
        setVidInfo(null);
    }
    return(
        <div className="darken-screen">
        <div className="rate-vid-dialogue">
<iframe src={`https://www.youtube.com/embed/${vidInfo[0]}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen>
</iframe>
<div className="rating-bar">
    <Foo rating={rating} setRating={setRating} fontSize={70}/>
    <button className="escape-button" onClick={() => setVidInfo(null)}>Esc</button>
</div>
        </div>
        </div>
    )
}
}