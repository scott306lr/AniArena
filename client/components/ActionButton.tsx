import React, { ReactElement } from 'react'

interface Props {
    text: string,
    onClick: () => {}
}

function ActionButton({text, onClick}: Props): ReactElement {
    return (
        <button onClick={onClick} className="bg-sky-400 text-white p-2 rounded-lg shadow-lg">
            {text}
        </button>
    )
}

export default ActionButton
