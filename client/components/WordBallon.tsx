import React from 'react'

interface Props{
    text: string
}

function WordBallon({text}: Props) {
    return (
        <div className="w-fit break-inside-auto border-solid border-2 p-1 px-3 rounded-lg shadow-lg
                        bg-white">
            <p>{text}</p>
        </div>
    )
}

export default WordBallon
