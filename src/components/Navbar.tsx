import React from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import Avatar from './Avatar';
import { RiSwordFill } from 'react-icons/ri';
import { FaCross, FaGlobeAsia } from 'react-icons/fa';
import { TiHome } from 'react-icons/ti';
import { HiOutlineLogin, HiBeaker, HiIdentification } from 'react-icons/hi';
import { IconContext } from 'react-icons';

function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="sticky top-2 z-10 mx-5 my-2 flex justify-center">
      <div className="flex w-full justify-between rounded-lg bg-white py-2 px-4 shadow-xl lg:w-10/12">
        {/* left */}
        <p className="hidden self-center text-lg font-bold sm:grid ">AniArena</p>

        {/* middle */}
        <div className="flex">
          <Link href="/" passHref>
            <div className="grid place-items-center rounded-lg px-2 text-sm duration-200 hover:bg-gray-500 hover:ease-in-out">
              <IconContext.Provider value={{ size: '1.5em' }}>
                <TiHome />
              </IconContext.Provider>
              <div>首頁</div>
            </div>
          </Link>
          <Link href="/reborn" passHref>
            <div className="grid place-items-center rounded-lg px-2 text-sm duration-200 hover:bg-gray-500 hover:ease-in-out">
              <IconContext.Provider value={{ size: '1.5em' }}>
                <FaCross />
              </IconContext.Provider>
              <div>轉生</div>
            </div>
          </Link>
          <Link href="/battleList" passHref>
            <div className="grid place-items-center rounded-lg px-2 text-sm duration-200 hover:bg-gray-500 hover:ease-in-out">
              <IconContext.Provider value={{ size: '1.5em' }}>
                <FaGlobeAsia />
              </IconContext.Provider>
              <div>排名</div>
            </div>
          </Link>
          <Link href="/reports" passHref>
            <div className="grid place-items-center rounded-lg px-2 text-sm duration-200 hover:bg-gray-500 hover:ease-in-out">
              <IconContext.Provider value={{ size: '1.5em' }}>
                <RiSwordFill />
              </IconContext.Provider>
              <div>戰報</div>
            </div>
          </Link>
          <Link href="/example" passHref>
            <div className="grid place-items-center rounded-lg px-2 text-sm duration-200 hover:bg-gray-500 hover:ease-in-out">
              <IconContext.Provider value={{ size: '1.5em' }}>
                <HiBeaker />
              </IconContext.Provider>
              <div>測試</div>
            </div>
          </Link>
          <Link href="/makeProfile" passHref>
            <div className="grid place-items-center rounded-lg px-2 text-sm duration-200 hover:bg-gray-500 hover:ease-in-out">
              <IconContext.Provider value={{ size: '1.5em' }}>
                <HiIdentification />
              </IconContext.Provider>
              <div>選角</div>
            </div>
          </Link>
        </div>

        {/* right */}
        <div>
          {session ? (
            <a onClick={() => signOut({ callbackUrl: '/' })}>
              <Avatar imgsrc={session.user?.image} org_width={225} org_height={350} className="h-12 w-12" />
            </a> //origin_size={"width": 32, "height":32} scale_to={"width": 32, "height": 32} />
          ) : (
            <a onClick={() => signIn()}>
              <div className="grid place-items-center rounded-lg px-2 text-sm duration-200 hover:bg-gray-500 hover:ease-in-out">
                <IconContext.Provider value={{ size: '1.5em' }}>
                  <HiOutlineLogin />
                </IconContext.Provider>
                <div>登入</div>
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
