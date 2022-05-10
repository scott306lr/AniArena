import React, { ReactElement } from 'react'

interface Props {
    text: string,
    onClick: () => {}
}

function RoundButton({text, onClick}: Props): ReactElement {
    return (
        <button onClick={onClick} className="rounded-full bg-gray-700 w-12 h-12 text-white border-solid border-2 border-white
                                             hover:bg-white hover:border-black hover:text-black hover:ease-in-out duration-200">
            {text}
        </button>
    )
}

export default RoundButton
