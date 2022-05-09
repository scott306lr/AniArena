import React, { ReactElement } from 'react'

interface Props {
    attribute: string,
    max: number,
    val: number
}

function AttributeBar({attribute, max, val}: Props): ReactElement {
    let length = Math.ceil(val / (max / 12))
    return (
        <div className="grid justify-items-stretch w-64 border-solid border-2 gap-1 p-3 rounded-lg shadow-lg bg-white">
            {/* bar */}
            <div className="flex ">
                {/* Todo: change bar propotion accroding to max and val */}
                <div className="w-8/12 h-1 bg-green-500 rounded-l-lg"></div>
                <div className="w-4/12 h-1 bg-gray-500 rounded-r-lg"></div>
            </div>
            {/* attribute text description */}
            <p className="justify-self-end">{attribute} {val}/{max}</p>
        </div>
    )
}

export default AttributeBar
