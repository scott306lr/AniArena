import Image from 'next/image'
import React from 'react'

interface Props{
    imgsrc: string
}


function RectCard({imgsrc} : Props) {
    return (
        <div className="relative char-img w-52 h-72">
            <Image className="rounded-lg" src={imgsrc} layout="fill" alt="rect-card" priority/>
        </div>
    )
}

export default RectCard
