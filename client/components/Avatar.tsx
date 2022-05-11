import React from 'react'

interface Props{
    imgsrc: string
}


function Avatar({imgsrc} : Props) {
    return (
        <div className="w-min h-min p-1 rounded-lg hover:bg-gray-500 hover:ease-in-out duration-200">
            <div className="border-solid border-black border-2 rounded-full p-0.5">
                <div className="overflow-hidden h-24 w-24 rounded-full">
                    <div className="border-solid">
                        <img src={imgsrc}></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Avatar

