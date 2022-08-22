import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react';
import RectCard from '../components/RectCard';
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
            <p className='word-bubble'>
              {"Loading..."}
            </p> :
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
      <PostableName orgText={props.profile.name}/>
      <PostableDescription orgText={props.profile.description}/>
    </div>
  )
}

const CharProfile: React.FC<{combater:ProfileType["combater"]}> = (props) => {
  if (props.combater == null) {
    return (
      <p className='word-bubble'>
        {"No profile"}
      </p>
    )
  }

  return (
    <div className='flex flex-col items-center justify-center '>
      <h2 className='text-xl text-center p-2'> {props.combater.character.name} </h2>
      <RectCard imgsrc={props.combater.character.image}/>
      <p className='text-lg text-center p-2'> {"可使用技能:"} </p>
      {
        props.combater.character.skills.map((skill, index) => {
          return (
            <li key={index} className="word-bubble">
              {`${skill.name}: ${skill.description}`}
            </li>
          )
        })
      }
    </div>
  )
}

const PostableName: React.FC<{orgText: string}> = (props) => {
  const [text, setText] = useState(props.orgText);
  const [isEditing, setEditing] = useState(false);
  
  // mutation for updating name... trpc v10 has BAD documentation....
  // https://github.com/planetscale/beam/blob/main/pages/index.tsx is a good example
  const utils = trpc.proxy.useContext();
  const {mutate: mutateName, isLoading, error} = trpc.proxy.me.postName.useMutation({
    onMutate: async (input) => {
      await utils.me.getProfile.cancel();
      const previousProfile = utils.me.getProfile.getData();
      utils.me.getProfile.setData(() => {
        return {...previousProfile, name: input.name} as ProfileType;
      })},
    onSuccess: () => {utils.me.getProfile.refetch()}
  });

  return (
    <div className="flex items-center justify-center">
      <input
        className="word-bubble"
        type="text"
        disabled={!isEditing}
        onChange={(e) => setText(e.target.value)}
        value={error ? "Error" : text}
      />
      <button 
        className='action-btn'
        onClick={() => {
          if (text.trim() === "") return;
          if (isEditing) mutateName({name: text.trim()})
          setEditing(prev => !prev);
        }}>
        { isLoading ? "Loading..." : (isEditing ? "Save" : "Edit") }
      </button>
      <button 
        className={`action-btn ${!isEditing ? "hidden" : "block"}`}
        onClick={() => {
          setText(props.orgText)
          setEditing(false)
        }}>
        Cancel
      </button>
    </div>
  )
}

const PostableDescription: React.FC<{orgText: string | null}> = (props) => {
  const [text, setText] = useState(props.orgText ?? "");
  const [isEditing, setEditing] = useState(false);
  
  // mutation for updating name... trpc v10 has BAD documentation....
  // https://github.com/planetscale/beam/blob/main/pages/index.tsx is a good example
  const utils = trpc.proxy.useContext();
  const {mutate: mutateName, isLoading, error} = trpc.proxy.me.postDescription.useMutation({
    onMutate: async (input) => {
      await utils.me.getProfile.cancel();
      const previousProfile = utils.me.getProfile.getData();
      utils.me.getProfile.setData(() => {
        return {...previousProfile, description: input.description} as ProfileType;
      })},
    onSuccess: () => {utils.me.getProfile.refetch()}
  });

  return (
    <div className="flex items-center justify-center">
      <input
        className="word-bubble"
        type="text"
        disabled={!isEditing}
        onChange={(e) => setText(e.target.value)}
        value={error ? "Error" : text}
      />
      <button 
        className='action-btn'
        onClick={() => {
          if (text.trim() === "") return;
          if (isEditing) mutateName({description: text.trim()})
          setEditing(prev => !prev);
        }}>
        { isLoading ? "Loading..." : (isEditing ? "Save" : "Edit") }
      </button>
      <button 
        className={`action-btn ${!isEditing ? "hidden" : "block"}`}
        onClick={() => {
          setText(props.orgText ?? "")
          setEditing(false)
        }}>
        Cancel
      </button>
    </div>
  )
}

export default Home
