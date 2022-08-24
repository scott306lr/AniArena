import React, { ReactElement } from 'react'

import {HiSearch} from 'react-icons/hi'


interface Props {
    onClick: () => void
}

function SearchBar({onClick}: Props): ReactElement {
    return (
        <div className="flex bg-white rounded-lg p-2 gap-1 shadow-lg">
            <input className="flex-grow bg-gray-200 rounded-lg p-1"></input>
            <button className="hover:bg-gray-500 rounded-lg p-1 hover:ease-in-out duration-200" onClick={onClick}>
                <HiSearch className="w-6 h-6" />
            </button>
        </div>
    )
}

export default SearchBar
