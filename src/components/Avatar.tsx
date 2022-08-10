import Image from 'next/image'
import React from 'react'

interface Props{
    imgsrc: string
    className?: string
}

function Avatar({imgsrc, className} : Props) {
    return (
        <div className="w-min h-min p-1 rounded-lg hover:bg-gray-500 hover:ease-in-out duration-200">
            <div className="border-solid border-black border-2 rounded-full p-0.5">
                <div className={`relative overflow-hidden h-24 w-24 rounded-full ${className}`}>
                    <Image className="border-solid" src={imgsrc} layout="fill" alt="Avatar"/>
                </div>
            </div>
        </div>
    )
}

export default Avatar

