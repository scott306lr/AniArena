import React from 'react'

interface Props{
    text: string
}

function WordBallon({text}: Props) {
    return (
        <div className="word-bubble">
            {text}
        </div>
    )
}

export default WordBallon
