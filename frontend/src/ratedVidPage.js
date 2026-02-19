import { useNavigate } from "react-router-dom"
import "./ratedVidPage.css"

 export default function RatedVidPage(){
const navigate = useNavigate();
    return(
        <>
        <div className="nav-bar">
            <button className="nav-button" onClick={() => navigate("/")}>
                RETURN
            </button>
        </div>

                     <div style={{display:"flex", flexDirection:"row", justifyContent:"center", paddingTop:"10px"}}>
            <RatedVideoColumn/>
            <RatedVideoColumn/>
            <RatedVideoColumn/>
            </div>
        </>
    )




    function RatedVideoColumn(){
let mcriblist = [203,1,1,1,1,1];

        return(

            <div style={{display:"flex", flexDirection:"column", margin:"10%"}}>
            {Array.from({length:mcriblist.length}).map((_,i) =>
                

            <button>
                <img width={300} key={i} src={`https://img.youtube.com/vi/${"dQw4w9WgXcQ"}/hqdefault.jpg`}/>
              </button>

            )}
                </div>
                

        )
    }
}