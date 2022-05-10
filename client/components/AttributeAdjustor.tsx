import React, { ReactElement } from 'react'
import RoundButton from './RoundButton'

interface Props {
    name: string,
    value: number,
    minusClick: () => {},
    addClick: () => {}
}

function AttributeAdjustor({name, value, minusClick, addClick}: Props): ReactElement {
    return (
        <div className="flex items-center justify-center w-fit place-self-center p-2 gap-8 rounded-lg bg-white p-2 shadow-lg">
            <RoundButton text="-" onClick={minusClick} className="flex-1"/>
            <span className="flex-1 text-center">{name}: {value}</span>
            <RoundButton text="+" onClick={addClick} className="flex-1"/>
        </div>
    )
}

export default AttributeAdjustor
