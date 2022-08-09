import Image from 'next/image'
import React from 'react'

interface Props{
    imgsrc: string
}


function RectCard({imgsrc} : Props) {
    return (
        <div className="char-img">
            <Image className="rounded-lg" src={imgsrc} alt="rect-card"/>
        </div>
    )
}

export default RectCard
