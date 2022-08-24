import type { NextPage } from 'next'
import ActionButton from '../components/ActionButton';
import RectCard from '../components/RectCard';
import SearchBar from '../components/SearchBar';
import PlayerCard from '../components/PlayerCard';
import Navbar from '../components/Navbar';
import { inferQueryOutput, trpc } from '../utils/trpc';
import { useEffect, useState } from 'react';
import { profile } from 'console';

const BattleList: NextPage = () => {
  
  const { data: profiles, isLoading } = trpc.proxy.getInfo.getAllProfiles.useQuery();
  const [ selectedId, setSelectedId ] = useState<string>();
  const handleSelect = (profileId: string) => {setSelectedId(profileId)};
  const handleSearch = () => {console.log("search click")};

  return (
    <div>
      <Navbar />
      <main className="grid">
        
        {/* sections */}
        <div className="flex flex-wrap items-center justify-center m-4 gap-14">
          {/* section: battle list */}
          <div className="grid gap-4 lg:w-1/4 w-5/6">
              <SearchBar onClick={() => handleSearch}/>
              { isLoading ? <div>loading...</div> : <PlayerList profiles={profiles} onClick={handleSelect}/>}
          </div>
          {/* section: player profile */}
          <div className="">
            <PlayerProfile profiles={profiles} selectedId={selectedId} />
          </div>
        </div>

      </main>
    </div>
  )
}

type ProfilesFromServer = inferQueryOutput<"getInfo.getAllProfiles"> | undefined;

// To do: don't know how to pass a single item from profiles OAO.
const PlayerProfile: React.FC<{profiles: ProfilesFromServer, selectedId: string|undefined}> = (props) => {
  const playerProfile = props.profiles?.find(profile => profile.id === props.selectedId);
  const { mutate, isLoading, data} = trpc.proxy.arena.battle.useMutation();

  const handleBattle = () => {
    console.log("Battle!");
    if(props.selectedId != null){
      mutate({with_id: props.selectedId})
    };
    console.log(data);
    return ;
  }
  
  return (
    <>
      { playerProfile ?
        <div>
          <div className="grid items-center gap-4">
            <RectCard imgsrc={playerProfile.combater?.character.image} />
            <ActionButton text="發起決鬥" onClick={handleBattle} />
          </div>
          <div className='word-bubble'>{playerProfile.name}</div>
        </div>
        :
        <div>
          
        </div>

      }
    </>    
  )
}


const PlayerList: React.FC<{profiles: ProfilesFromServer, onClick: Function}> = (props) => {
  
  return (
    <>
      { props.profiles ? 
        <ul className="grid w-full">
          {
            props.profiles.map((profile, index) => {
              return(
                <li onClick={() => {
                  // console.log("mutate, ", {with_id: profile.id})
                  props.onClick(profile.id);
                }} key={index}>
                  { profile?.combater &&
                    <PlayerCard 
                      name={profile.name} 
                      text={profile.description} 
                      imgsrc={profile.combater.character.image}/>
                  }
                </li> 
              )
            })
          }
        </ul> : <div>{"Sad, no available players currently."}<br />{"Probably there's a connection error?"}</div>
      }
    </>
  )
}

export default BattleList
