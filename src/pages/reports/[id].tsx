import type { NextPage } from 'next';
import AttributeBar from '../../components/AttributeBar';
import RectCard from '../../components/RectCard';
import React from 'react';
import Navbar from '../../components/Navbar';
import Avatar from '../../components/Avatar';
import { trpc } from '../../utils/trpc';
import { useRouter } from 'next/router';
import { CombatLog } from '../../utils/AniClasses/Arena';
import { GiHearts, GiBroadsword } from 'react-icons/gi';

const Report: NextPage = () => {
  // Todo: fetch data here
  const router = useRouter();
  const BattleLogID = parseInt(router.query.id as string);
  const { data: BattleLog, isLoading } = trpc.arena.getBattleLog.useQuery({ id: BattleLogID });
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <main className="grid">
        {/* sections */}
        {BattleLog && (
          <div className="m-2 flex flex-wrap justify-center gap-10 p-2">
            {/* Character A status section */}
            <section className="relative flex h-fit w-5/12 justify-items-center rounded-lg bg-slate-50 p-4 md:sticky md:top-16 lg:grid lg:w-min lg:gap-4">
              <PlayerInfo id={BattleLog?.creatorId} />
            </section>

            {/* Character B status section */}
            <section className="relative flex h-fit w-5/12 justify-items-center rounded-lg bg-slate-50 p-4 md:sticky md:top-16 lg:order-last lg:grid lg:w-min lg:gap-4">
              <PlayerInfo id={BattleLog?.opponentId} />
            </section>

            <section className="w-full lg:hidden"></section>

            <section className="flex h-screen w-full overflow-y-auto rounded-md bg-slate-50 lg:w-1/2">
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
    <div className="flex h-fit w-full items-center justify-center">
      <ul className="my-4 grid h-fit w-full gap-4 p-2 lg:w-11/12">
        {props.context.logs.map((round, index) => {
          return (
            <li
              key={index}
              className={`flex w-full ${round.logger?.id === creatorID ? 'justify-start pr-6' : 'justify-end pl-6'}`}
            >
              <p className="word-bubble flex items-center justify-center">
                {round.logger?.id !== creatorID ? <GiBroadsword /> : <GiHearts />}
                &nbsp;
                {round.log}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Report;
