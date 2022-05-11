import React from 'react'
import Link from 'next/link'
import Avatar from './NavItem'

import {
    HomeIcon,
    UserGroupIcon,
    GlobeIcon,
    PlayIcon
} from "@heroicons/react/outline"

function Navbar() {

    return (
        <div className="flex w-min border-2 p-2 gap-2 bg-white rounded-lg">
            <Link href="/" passHref>
                <a>
                    <Avatar Icon={HomeIcon} title="Home"/>
                </a>
            </Link>
            <Link href="characters" passHref>
                <a>
                    <Avatar Icon={UserGroupIcon} title="Characters"/>
                </a>
            </Link>
            <Link href="playerList" passHref>
                <a>
                    <Avatar Icon={GlobeIcon} title="Rank"/>
                </a>
            </Link>
            <Link href="battle" passHref>
                <a>
                    <Avatar Icon={PlayIcon} title="Battle" />
                </a>
            </Link>
        </div>
    )
}

export default Navbar
