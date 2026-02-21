import { data, useNavigate } from "react-router-dom"
import "./ratedVidPage.css"
import { useState, useEffect } from "react";
import Foo from "./starRating";

const FetchFunnyVidRanks = (async () => {
console.log("fetching ranked funny vids");
return await(fetch("http://localhost:8080/api/get-funny-vids")
.then(response => response.json())
.then(data => {
    return(data)
})
.catch(error => console.error(error))
);
})

const UpdateRating = async (videoId, rating) => {
    try {
        const response = await fetch(
            `http://localhost:8080/api/save-update-funny_rating?videoId=${videoId}&rating=${rating}`, {method:"POST"}
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
const [vidId, setVidId] = useState(null); //when not null dialogue will appear
    return(
        <>
        {vidId !== null && <RateVideoDialogue/>}
        <div className="app-content">
        <div className="nav-bar">
            <button className="nav-button" onClick={() => navigate("/")}>
                RETURN
            </button>
            <div className="nav-title">Ranked Videos</div>
        </div>
                     <div style={{display:"flex", flexDirection:"row", justifyContent:"center", paddingTop:"10px"}}>
            <RatedVideoColumn/>
            <RatedVideoColumn/>
            <RatedVideoColumn/>
            </div>
        </div>
        </>
    )




    function RatedVideoColumn(){
          const [funnyVidMap, setFunnyVidMap] = useState(new Map());

  useEffect(() => {
    async function fetchData() {
      const data = await FetchFunnyVidRanks();
      setFunnyVidMap(new Map(Object.entries(data)));
    }
    fetchData();
  }, []);
    return (
        <div className="ranked-column">
            Funniest
            {Array.from(funnyVidMap.entries()).map(([videoId, rating], i) => (
                <button key={videoId} onClick={() => setVidId(videoId)} className="video-container">
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
    setVidId(null);
}
})
    if(rating > 0){
        UpdateRating(vidId, rating)
        setVidId(null);
    }
    return(
        <div className="darken-screen">
        <div className="rate-vid-dialogue">
<iframe src={`https://www.youtube.com/embed/${vidId}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen>
</iframe>
<div className="rating-bar">
    <Foo rating={rating} setRating={setRating} fontSize={70}/>
    <button className="escape-button" onClick={() => setVidId(null)}>Esc</button>
</div>
        </div>
        </div>
    )
}
}