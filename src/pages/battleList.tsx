import type { NextPage } from 'next';
import RectCard from '../components/RectCard';
import SearchBar from '../components/SearchBar';
import PlayerCard from '../components/PlayerCard';
import Navbar from '../components/Navbar';
import { inferQueryOutput, trpc } from '../utils/trpc';
import { useEffect, useState } from 'react';

const BattleList: NextPage = () => {
  const { data: profiles, isLoading } = trpc.proxy.getInfo.getAllProfiles.useQuery();
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <Navbar />
      <main className="grid">
        {/* sections */}
        <div className="flex flex-wrap items-center justify-center m-4 gap-14">
          {/* section: battle list */}
          <div className="grid gap-4 lg:w-1/4 w-5/6">
            <SearchBar onClick={() => console.log('search click')} />
            {isLoading ? <div>loading...</div> : <PlayerList profiles={profiles} setSelected={setSelected} />}
          </div>
          {/* section: player profile */}
          <div className="">
            {isLoading || profiles == null ? <div>loading...</div> : <PlayerProfile profile={profiles[selected]} />}
          </div>
        </div>
      </main>
    </div>
  );
};

type ProfilesFromServer = inferQueryOutput<'getInfo.getAllProfiles'> | undefined;
type SelectedProfile = inferQueryOutput<'getInfo.getAllProfiles'>[number] | undefined;

// Ensured that profile is not undefined before passing in, but checked again for typescript ensurance
const PlayerProfile: React.FC<{ profile: SelectedProfile }> = (props) => {
  const { mutate, isLoading, data } = trpc.proxy.arena.battle.useMutation();

  const handleBattle = () => {
    if (props.profile == null) {
      console.log('profile is null');
      return;
    }

    console.log('Battle!');
    mutate({ with_id: props.profile.id });
    console.log(data);
  };
  return (
    <div>
      {props.profile == undefined ? (
        <div>loading...</div>
      ) : (
        <>
          <div className="grid items-center gap-4">
            <RectCard imgsrc={props.profile.combater?.character?.image} />
            <button onClick={handleBattle} className="action-btn">
              {`發起決鬥 name: ${props.profile.name}`}
            </button>
          </div>
          <div className="word-bubble">{props.profile.name}</div>
        </>
      )}
    </div>
  );
};

const PlayerList: React.FC<{ profiles: ProfilesFromServer; setSelected: Function }> = (props) => {
  return (
    <>
      {props.profiles ? (
        <ul className="grid w-full">
          {props.profiles.map((profile, index) => {
            return (
              <li onClick={() => props.setSelected(index)} key={index}>
                {profile?.combater && (
                  <PlayerCard
                    name={profile.name}
                    text={profile.description}
                    imgsrc={profile.combater.character.image}
                  />
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <div>
          {'Sad, no available players currently.'}
          <br />
          {"Probably there's a connection error?"}
        </div>
      )}
    </>
  );
};

export default BattleList;
