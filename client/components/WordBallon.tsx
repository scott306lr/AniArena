import React from 'react'

interface Props{
    text: string
}

function WordBallon({text}: Props) {
    return (
        <div className="break-inside-auto border-solid border-2 p-1 px-3 rounded-lf shadow-lg
                        bg-white">
            <p>{text}</p>
        </div>
    )
}

export default WordBallon
