import React, { ReactElement } from 'react'

interface Props {
    text: string,
    onClick: () => {}
}

function ActionButton({text, onClick}: Props): ReactElement {
    return (
        <button onClick={onClick} className="w-fit place-self-center bg-sky-400 text-white p-2 rounded-lg shadow-lg border-solid border-2 border-gray-200
                                             duration-200 hover:bg-white hover:ease-in-out hover:text-black hover:border-black">
            {text}
        </button>
    )
}

export default ActionButton
