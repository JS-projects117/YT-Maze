 export default function RatedVidPage(){
    return(
        <div className="rated-vid-page">
            <RatedVideoColumn/>
        </div>
    )




    function RatedVideoColumn(){


        return(
            <>
            <div className="rated-vid-column">
            {Array.from({length:10}).map((_,i) =>
                
                <img src={`https://img.youtube.com/vi/${"dQw4w9WgXcQ"}/hqdefault.jpg`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                
                </img>
              
            )}
            
                </div>
                </>
        )
    }
}