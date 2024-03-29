import type { NextPage } from 'next';
import RectCard from '../components/RectCard';
import SearchBar from '../components/SearchBar';
import PlayerCard from '../components/PlayerCard';
import Navbar from '../components/Navbar';
import { trpc } from '../utils/trpc';
import { Dispatch, SetStateAction, useState } from 'react';

import type { inferProcedureOutput, inferProcedureInput } from '@trpc/server';
import type { AppRouter } from '../server/trpc/router';
import { useRouter } from 'next/router';

const BattleList: NextPage = () => {
  const { data: profiles, isLoading } = trpc.getInfo.getAllProfiles.useQuery();
  const [selected, setSelected] = useState(0);
  const selectedProfile = profiles?.[selected];

  return (
    <div>
      <Navbar />
      <main className="grid">
        {/* sections */}
        <div className="m-4 flex justify-center text-center">
          {/* section: battle list */}
          <div className="grid w-fit gap-4">
            <SearchBar onClick={() => console.log('search click')} />
            {isLoading ? <div>loading...</div> : <PlayerList profiles={profiles} setSelected={setSelected} />}
          </div>
          <div className="w-1/12"></div>
          {/* section: player profile */}
          <div className="grid w-fit items-center justify-center gap-2">
            {isLoading ? <div>loading...</div> : <PlayerProfile profile={selectedProfile} />}
          </div>
        </div>
      </main>
    </div>
  );
};

type ProfilesFromServer = inferProcedureOutput<AppRouter['getInfo']['getAllProfiles']> | undefined;
type SelectedProfile = inferProcedureOutput<AppRouter['getInfo']['getAllProfiles']>[number] | undefined;

// Ensured that profile is not undefined before passing in, but checked again for typescript ensurance
const PlayerProfile: React.FC<{ profile: SelectedProfile }> = (props) => {
  const { mutate, isLoading, data } = trpc.arena.battle.useMutation();
  const [hasClick, setHasClick] = useState(false);
  const router = useRouter();

  const handleBattle = () => {
    if (props.profile == null) {
      console.log('profile is null');
      return;
    }

    console.log('Battle!');
    mutate({ with_id: props.profile.id });
    setHasClick(true);
  };

  const handleRedirect = () => {
    if (data) {
      router.push(`/reports/${data?.id}`);
    }
  };

  return (
    <>
      {props.profile == null ? (
        <div>loading...</div>
      ) : (
        <>
          <h1 className="flex justify-center text-center text-2xl">{props.profile.name}</h1>
          <RectCard imgsrc={props.profile.combater?.character?.image} />
          {hasClick ? (
            <button disabled={isLoading} onClick={handleRedirect} className="button-primary text-lg">
              查看戰報
            </button>
          ) : (
            <button disabled={isLoading} onClick={handleBattle} className="button-primary text-lg">
              發起決鬥
            </button>
          )}
        </>
      )}
    </>
  );
};

const PlayerList: React.FC<{ profiles: ProfilesFromServer; setSelected: Dispatch<SetStateAction<number>> }> = (
  props
) => {
  return (
    <>
      {props.profiles ? (
        <ul className="grid w-full gap-1">
          {props.profiles.map((profile, index) => {
            return (
              <li className="flex h-auto w-full" onClick={() => props.setSelected(index)} key={index}>
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
