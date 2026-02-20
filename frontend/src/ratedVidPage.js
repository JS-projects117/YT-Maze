import { useNavigate } from "react-router-dom"
import "./ratedVidPage.css"

 export default function RatedVidPage(){
const navigate = useNavigate();
    return(
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
    )




    function RatedVideoColumn(){
let mcriblist = [203,1,1,1,1,1];
let rating = Math.random() * 10
        return(

            <div className="ranked-column">
                Funniest
            {Array.from({length:mcriblist.length}).map((_,i) =>
                

            <button className="video-container">
                <img width={300} key={i} src={`https://img.youtube.com/vi/${"dQw4w9WgXcQ"}/hqdefault.jpg`}/>
                <div className="video-stat-bar">Rating {rating}</div>
              </button>

            )}
                </div>
                

        )
    }
}