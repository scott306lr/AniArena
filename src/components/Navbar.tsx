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
    <div className="flex justify-center mx-5 my-2">
      <div className="flex justify-between w-full lg:w-10/12 py-2 px-4 bg-white rounded-lg shadow-xl">
        {/* left */}
        <p className="hidden sm:grid font-bold text-lg self-center ">AniArena</p>

        {/* middle */}
        <div className="flex">
          <Link href="/" passHref>
            <div className="navItem">
              <IconContext.Provider value={{ size: '1.5em' }}>
                <TiHome />
              </IconContext.Provider>
              <div>首頁</div>
            </div>
          </Link>
          <Link href="/reborn" passHref>
            <div className="navItem">
              <IconContext.Provider value={{ size: '1.5em' }}>
                <FaCross />
              </IconContext.Provider>
              <div>轉生</div>
            </div>
          </Link>
          <Link href="/battleList" passHref>
            <div className="navItem">
              <IconContext.Provider value={{ size: '1.5em' }}>
                <FaGlobeAsia />
              </IconContext.Provider>
              <div>排名</div>
            </div>
          </Link>
          <Link href="/reports" passHref>
            <div className="navItem">
              <IconContext.Provider value={{ size: '1.5em' }}>
                <RiSwordFill />
              </IconContext.Provider>
              <div>戰報</div>
            </div>
          </Link>
          <Link href="/example" passHref>
            <div className="navItem">
              <IconContext.Provider value={{ size: '1.5em' }}>
                <HiBeaker />
              </IconContext.Provider>
              <div>測試</div>
            </div>
          </Link>
          <Link href="/makeProfile" passHref>
            <div className="navItem">
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
              <Avatar className="h-8 w-8" imgsrc={session.user?.image} />
            </a>
          ) : (
            <a onClick={() => signIn()}>
              <div className="navItem">
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
