import React from 'react'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import Avatar from './Avatar'
import { RiSwordFill } from "react-icons/ri"
import { FaCross, FaGlobeAsia } from "react-icons/fa"
import { TiHome } from 'react-icons/ti'
import { HiOutlineLogin } from 'react-icons/hi'
import { IconContext } from 'react-icons'

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
                        <div className='navItem'>
                            <IconContext.Provider value={{ size: "1.5em"}}>
                                <TiHome />
                            </IconContext.Provider>
                            <div>首頁</div>
                        </div>
                    </Link>
                    <Link href="/characters" passHref>
                        <div className='navItem'>
                            <IconContext.Provider value={{ size: "1.5em"}}>
                                <FaCross />
                            </IconContext.Provider>
                            <div>轉生</div>
                        </div>
                    </Link>
                    <Link href="/playerList" passHref>
                        <div className='navItem'>
                            <IconContext.Provider value={{ size: "1.5em"}}>
                                <FaGlobeAsia />
                            </IconContext.Provider>
                            <div>排名</div>
                        </div>
                    </Link>
                    <Link href="/battle" passHref>
                        <div className='navItem'>
                            <IconContext.Provider value={{ size: "1.5em"}}>     
                                <RiSwordFill />
                            </IconContext.Provider>
                            <div>戰鬥</div>
                        </div>
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
                            <div className='navItem'>
                                <IconContext.Provider value={{ size: "1.5em"}}>
                                    <HiOutlineLogin/>
                                </IconContext.Provider>
                                <div>登入</div>
                            </div>
                        </a>
                    )}
                </div>
                
            </div>
        </div>
    )
}

export default Navbar
