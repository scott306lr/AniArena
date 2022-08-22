import React from 'react'
import Link from 'next/link'
import NavItem from './NavItem'

import {
    HomeIcon,
    UsersIcon,
    GlobeIcon,
    PlayIcon,
    LoginIcon,
} from "@heroicons/react/solid"
import { signIn, signOut, useSession } from 'next-auth/react'
import Avatar from './Avatar'

function Navbar() {
    const { data: session } = useSession()

    return (
        <div className='flex justify-center mx-5 my-2'>

            <div className="flex justify-between w-full lg:w-10/12 py-2 px-4 bg-white rounded-lg shadow-xl">
                {/* left */}
                <p className='font-bold text-lg self-center '>AniArena</p>
                
                {/* middle */}
                <div className='flex'>
                    <Link href="/" passHref>
                        <div>
                            <NavItem Icon={HomeIcon} title="首頁"/>
                        </div>
                    </Link>
                    <Link href="/characters" passHref>
                        <a>
                            <NavItem Icon={UsersIcon} title="角色"/>
                        </a>
                    </Link>
                    <Link href="/playerList" passHref>
                        <a>
                            <NavItem Icon={GlobeIcon} title="排名"/>
                        </a>
                    </Link>
                    <Link href="/battle" passHref>
                        <a>
                            <NavItem Icon={PlayIcon} title="戰鬥" />
                        </a>
                    </Link>
                </div>
                
                
                {/* right */}
                <div>
                    {session ? (
                        <a onClick={() => signOut({ callbackUrl: "/" })}>
                            <Avatar className="h-8 w-8" imgsrc={session.user.image}/>
                        </a>
                    ) : (
                        <a onClick={() => signIn()}>
                            <NavItem Icon={LoginIcon} title="登入" />
                        </a>
                    )}
                </div>
                
            </div>
        </div>
    )
}

export default Navbar
