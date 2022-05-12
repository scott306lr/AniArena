import React from 'react'

interface Props{
    imgsrc: string
}


function RectCard({imgsrc} : Props) {
    return (
        <div className="w-fit h-fit p-0.5 border-solid border-2 border-gray-700
                        rounded-lg shadow-xl bg-white hover:scale-105 transition-all ease-in-out">
            <img src={imgsrc} className="rounded-lg" />
        </div>
    )
}

export default RectCard
