import React from 'react'

import Avatar from './Avatar'

import {
    HomeIcon,
    UserGroupIcon,
    GlobeIcon
} from "@heroicons/react/outline"

function Navbar() {

    return (
        <div className="flex items-center justify-center ">
            <div className="flex items-center justify-center mx-100 my-4 border-2 p-2 gap-2">
                <Avatar Icon={HomeIcon} title="Home"/>
                <Avatar Icon={UserGroupIcon} title="Characters"/>
                <Avatar Icon={GlobeIcon} title="Rank"/>
            </div>
        </div>
    )
}

export default Navbar
