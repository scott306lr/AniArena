import React, { ReactElement } from 'react'
import Avatar from './Avatar'

interface Props {
    imgsrc: string | null,
    name: string,
    text: string | null
}

function PlayerCard({ imgsrc, name, text }: Props): ReactElement {
    return (
        <div className="flex bg-white hover:bg-gray-500 rounded-lg shadow-lg p-2 gap-2 transition duration-200">
            <Avatar imgsrc={imgsrc}/>
            <div>
                <div className="font-bold text-lg">
                    {name}
                </div>
                <div>
                    {text}
                </div>

            </div>

        </div>
    )
}

export default PlayerCard
