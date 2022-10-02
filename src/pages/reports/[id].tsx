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
import { isContext } from 'vm';

const Report: NextPage = () => {
  // Todo: fetch data here
  const router = useRouter();
  const BattleLogID = parseInt(router.query.id as string);
  const { data: BattleLog, isLoading } = trpc.arena.getBattleLog.useQuery({ id: BattleLogID });
  const logContent = BattleLog?.content as unknown as CombatLog | undefined;
  const creatorID = logContent?.combater1.id;

  const combater1_maxHP = logContent?.combater1.attr.maxHP || 0;
  const combater1_HP =
    logContent?.logs.reduce((prev, curr) => {
      if (curr.logger == null) return prev;
      if (curr.logger.id === creatorID) {
        return +curr.logger.attr.HP;
      } else {
        return prev;
      }
    }, 0) || 0;
  const combater1_maxAP = logContent?.combater1.attr.maxAP || 0;
  const combater1_AP =
    logContent?.logs.reduce((prev, curr) => {
      if (curr.logger == null) return prev;
      if (curr.logger.id === creatorID) {
        return +curr.logger.attr.AP;
      } else {
        return prev;
      }
    }, 0) || 0;

  const combater2_maxHP = logContent?.combater2.attr.maxHP || 0;
  const combater2_HP =
    logContent?.logs.reduce((prev, curr) => {
      if (curr.logger == null) return prev;
      if (curr.logger.id !== creatorID) {
        return +curr.logger.attr.HP;
      } else {
        return prev;
      }
    }, 0) || 0;
  const combater2_maxAP = logContent?.combater1.attr.maxAP || 0;
  const combater2_AP =
    logContent?.logs.reduce((prev, curr) => {
      if (curr.logger == null) return prev;
      if (curr.logger.id === creatorID) {
        return +curr.logger.attr.AP;
      } else {
        return prev;
      }
    }, 0) || 0;

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <main className="flex h-auto justify-center overflow-hidden p-4">
        {BattleLog && (
          <div className="m-2 flex h-auto w-full justify-center gap-10 p-2">
            <section className="flex h-fit w-5/12 justify-items-center rounded-lg bg-slate-50 p-4 md:top-16 lg:grid lg:w-min lg:gap-4">
              <PlayerInfo id={BattleLog?.creatorId} />
              <AttributeBar attribute="HP" max={combater1_maxHP} val={combater1_HP} />
              {/* <AttributeBar attribute="AP" max={combater1_maxAP} val={combater1_AP} /> */}
            </section>

            <section className="flex h-fit w-5/12 justify-items-center rounded-lg bg-slate-50 p-4 md:top-16 lg:order-last lg:grid lg:w-min lg:gap-4">
              <PlayerInfo id={BattleLog?.opponentId} />
              <AttributeBar attribute="HP" max={combater2_maxHP} val={combater2_HP} />
              {/* <AttributeBar attribute="AP" max={combater2_maxAP} val={combater2_AP} /> */}
            </section>

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
                    <>
                      <p className="text-blue-500">||</p>
                      &nbsp;
                      {round.log}
                    </>
                  ) : is_me ? (
                    <>
                      <p className="text-blue-500">||</p>
                      &nbsp;
                      <BattleIcon type={round.type} />
                      &nbsp;
                      {round.log}
                    </>
                  ) : (
                    <>
                      <BattleIcon type={round.type} />
                      &nbsp;
                      {round.log}
                      &nbsp;
                      <p className="text-red-500">||</p>
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
