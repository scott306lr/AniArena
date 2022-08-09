import React from 'react'

interface Props{
    imgsrc: string
}


function RectCard({imgsrc} : Props) {
    return (
        <div className="char-img">
            <img src={imgsrc} className="rounded-lg" />
        </div>
    )
}

export default RectCard
