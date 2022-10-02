import type { NextPage } from 'next';
import AttributeBar from '../../components/AttributeBar';
import RectCard from '../../components/RectCard';
import React from 'react';
import Navbar from '../../components/Navbar';
import Avatar from '../../components/Avatar';
import { trpc } from '../../utils/trpc';
import { useRouter } from 'next/router';
import { CombatLog } from '../../utils/AniClasses/Arena';
import { GiHearts, GiBroadsword, GiQueenCrown, GiHarryPotterSkull, GiTrophy, GiBrokenHeart } from 'react-icons/gi';

const Report: NextPage = () => {
  // Todo: fetch data here
  const router = useRouter();
  const BattleLogID = parseInt(router.query.id as string);
  const { data: BattleLog, isLoading } = trpc.arena.getBattleLog.useQuery({ id: BattleLogID });
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <main className="flex h-auto justify-center overflow-hidden p-4">
        {/* sections */}
        {BattleLog && (
          <div className="m-2 flex h-auto w-full justify-center gap-10 p-2">
            {/* Character A status section */}
            <section className="flex h-fit w-5/12 justify-items-center rounded-lg bg-slate-50 p-4 md:top-16 lg:grid lg:w-min lg:gap-4">
              <PlayerInfo id={BattleLog?.creatorId} />
            </section>

            {/* Character B status section */}
            <section className="flex h-fit w-5/12 justify-items-center rounded-lg bg-slate-50 p-4 md:top-16 lg:order-last lg:grid lg:w-min lg:gap-4">
              <PlayerInfo id={BattleLog?.opponentId} />
            </section>

            {/* <section className="h-auto w-full lg:hidden"></section> */}

            <section className="flex h-auto w-full justify-center overflow-hidden rounded-md bg-slate-50 lg:w-1/3 ">
              {BattleLog && <BattleContent context={BattleLog.content as unknown as CombatLog} />}
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

const PlayerInfo: React.FC<{ id: string }> = (props) => {
  const { data: PlayerData, isLoading } = trpc.getInfo.getProfileByID.useQuery({ id: props.id });
  // const { data: creatorProfile } = trpc.proxy.getInfo.getProfileByID({id: BattleLog?.creatorId})
  if (isLoading || PlayerData == null) {
    return <div>is Loading...</div>;
  }
  return (
    <div className="grid gap-y-2 scroll-auto">
      <p className="flex justify-center text-xl leading-tight">{PlayerData.name}</p>
      <div className="hidden md:grid">
        <RectCard imgsrc={PlayerData.combater?.character.image} />
      </div>
      <div className="md:hidden">
        <Avatar imgsrc={PlayerData.combater?.character.image} org_width={225} org_height={350} className="h-12 w-12" />
      </div>

      <p className="word-bubble">{PlayerData.description}</p>
      {/* <AttributeBar attribute="HP" max={10} val={5} />
        <AttributeBar attribute="AP" max={10} val={4} /> */}
    </div>
  );
};

const BattleContent: React.FC<{ context: CombatLog }> = (props) => {
  console.log(props.context);
  const creatorID = props.context.combater1.id;
  return (
    <div className="flex h-auto w-full justify-center">
      <div className="h-auto w-full overflow-y-auto">
        <ul className="my-4 grid h-auto w-full gap-4 px-4">
          {props.context.logs.map((round, index) => {
            const is_me = round.logger?.id === creatorID;
            return (
              <li key={index} className={`flex w-full ${is_me ? 'justify-start pr-6' : 'justify-end pl-6'}`}>
                <p
                  className={`word-bubble flex items-center justify-center ${
                    round.type === 'effected' && 'bg-gray-300'
                  }`}
                >
                  {round.type === 'effected' ? (
                    round.log
                  ) : is_me ? (
                    <>
                      <BattleIcon type={round.type} />
                      &nbsp;
                      {round.log}
                    </>
                  ) : (
                    <>
                      {round.log}
                      &nbsp;
                      <BattleIcon type={round.type} />
                    </>
                  )}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const BattleIcon: React.FC<{ type: string | undefined }> = (props) => {
  if (props.type === 'hurt') {
    return <GiBrokenHeart />;
  } else if (props.type === 'attack') {
    return <GiBroadsword />;
  } else if (props.type === 'die') {
    return <GiHarryPotterSkull />;
  } else if (props.type === 'win') {
    return <GiQueenCrown />;
    // } else if (props.type === 'effected') {
    //   return <GiQueenCrown />;
  } else {
    return <div>undefined</div>;
  }
};

export default Report;
