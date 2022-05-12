import React from 'react'

interface Props{
    text: string
}

function WordBallon({text}: Props) {
    return (
        <div className="w-fit break-inside-auto p-1 px-3 rounded-lg shadow-lg bg-white">
            {text}
        </div>
    )
}

export default WordBallon
