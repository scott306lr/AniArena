import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react';
import RectCard from '../components/RectCard';
import WordBallon from '../components/WordBallon';
import { inferQueryOutput, trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const { data: myProfile, isLoading } = trpc.proxy.me.getProfile.useQuery();

  return (
    <div>
      <Navbar />
      <main className="grid">
        {/* sections */}
        <div className="flex items-center justify-center m-8 gap-8">
          {
            (isLoading || myProfile == null) ?
              <WordBallon text="Loading..." /> :
            <div className="flex flex-col items-center justify-center m-8 gap-8">
              <UserProfile profile={myProfile}/>
              <CharProfile combater={myProfile.combater}/>
            </div>
          }
        </div>
      </main>
    </div>
  )
}

type ProfileType = inferQueryOutput<"me.getProfile">;
const UserProfile: React.FC<{profile: ProfileType}> = (props) => {
  
  return (
    <div className='flex flex-col items-center justify-center '>
      <WordBallon text={`Name: ${props.profile.name}`} />
      <WordBallon text={`Description: ${props.profile.description}`} />
    </div>
  )
}

const CharProfile: React.FC<{combater:ProfileType["combater"]}> = (props) => {
  if (props.combater == null) {
    return <WordBallon text="No profile" />
  }

  return (
    <div className='flex flex-col items-center justify-center '>
      <h2 className='text-xl text-center p-2'> {props.combater.character.name} </h2>
      <RectCard imgsrc={props.combater.character.image}/>
      <p className='text-lg text-center p-2'> {"可使用技能:"} </p>
      {
        props.combater.character.skills.map((skill, index) => {
          return (
            <WordBallon text={`${skill.name}: ${skill.description}`} key={index}/>
          )
        })
      }
    </div>
  )
}

export default Home
