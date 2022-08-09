import React, { ReactElement } from 'react'
import RoundButton from './RoundButton'

interface Props {
    name: string,
    value: number,
    minusClick: () => void,
    addClick: () => void
}

function AttributeAdjustor({name, value, minusClick, addClick}: Props): ReactElement {

    return (
        <div className="flex items-center justify-center w-fit place-self-center gap-8 rounded-lg bg-white p-2 shadow-lg hover:scale-110 transition-all">
            <button onClick={minusClick} className="round-btn"> - </button>
            <span className="flex-1 text-center">{name}: {value}</span>
            <button onClick={addClick} className="round-btn "> + </button>
        </div>
    )
}

export default AttributeAdjustor
