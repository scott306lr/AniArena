import React from 'react'
import Link from 'next/link'
import NavItem from './NavItem'

import {
    HomeIcon,
    UserGroupIcon,
    GlobeIcon,
    PlayIcon,
    LoginIcon,
} from "@heroicons/react/outline"
import { signIn, signOut, useSession } from 'next-auth/react'
import Avatar from './Avatar'

function Navbar() {
    const { data: session } = useSession()

    return (
        <div className='flex justify-center items-center max-w-6xl mx-5 my-2 lg:mx-auto'>
            <div className="flex w-min p-2 bg-white rounded-lg shadow-xl hover:scale-110 transition-all hover:translate-y-4">
                <Link href="/" passHref>
                    <a>
                        <NavItem Icon={HomeIcon} title="Home"/>
                    </a>
                </Link>
                <Link href="/characters" passHref>
                    <a>
                        <NavItem Icon={UserGroupIcon} title="Characters"/>
                    </a>
                </Link>
                <Link href="/playerList" passHref>
                    <a>
                        <NavItem Icon={GlobeIcon} title="Rank"/>
                    </a>
                </Link>
                <Link href="/battle" passHref>
                    <a>
                        <NavItem Icon={PlayIcon} title="Battle" />
                    </a>
                </Link>

                {session ? (
                    <a onClick={() => signOut()}>
                        <Avatar className="h-12 w-12" imgsrc={session.user.image}/>
                    </a>
                ) : (
                    <a onClick={() => signIn()}>
                        <NavItem Icon={LoginIcon} title="Login" />
                    </a>
                )}
                
            </div>
        </div>
    )
}

export default Navbar
