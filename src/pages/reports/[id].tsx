import type { NextPage } from 'next';
import AttributeBar from '../../components/AttributeBar';
import RectCard from '../../components/RectCard';
import React from 'react';
import Navbar from '../../components/Navbar';
import Avatar from '../../components/Avatar';
import { trpc } from '../../utils/trpc';
import { useRouter } from 'next/router';
import { CombatLog } from '../../utils/AniClasses/Arena';

const Report: NextPage = () => {
  const [hpMax, setHpMax] = React.useState(15);
  const [hpVal, setHpVal] = React.useState(10);
  const increaseHp = () => setHpVal(Math.min(hpMax, hpVal + 1));
  const decreaseHp = () => setHpVal(Math.max(0, hpVal - 1));

  const [hp, setHp] = React.useState(7);
  // Todo: fetch data here
  const router = useRouter();
  const BattleLogID = parseInt(router.query.id as string);
  const { data: BattleLog, isLoading } = trpc.proxy.arena.getBattleLog.useQuery({ id: BattleLogID });
  return (
    <div>
      <Navbar />
      <main className="grid">
        {/* sections */}
        {BattleLog && (
          <div className="m-2 flex flex-wrap justify-center gap-4 p-2">
            {/* Character A status section */}
            <div className="flex w-5/12 justify-items-center rounded-lg bg-slate-50 p-4 lg:grid lg:w-min lg:gap-4">
              <PlayerInfo id={BattleLog?.creatorId} />
            </div>

            {/* Character B status section */}
            <div className="flex w-5/12 justify-items-center rounded-lg bg-slate-50 p-4 lg:order-last lg:grid lg:w-min lg:gap-4">
              <PlayerInfo id={BattleLog?.opponentId} />
            </div>

            <div className="w-full lg:hidden"></div>

            <div className="flex w-full lg:w-1/3">
              {BattleLog && <BattleContent context={BattleLog.content as unknown as CombatLog} />}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const PlayerInfo: React.FC<{ id: string }> = (props) => {
  const { data: PlayerData, isLoading } = trpc.proxy.getInfo.getProfileByID.useQuery({ id: props.id });
  // const { data: creatorProfile } = trpc.proxy.getInfo.getProfileByID({id: BattleLog?.creatorId})
  if (isLoading || PlayerData == null) {
    return <div>is Loading...</div>;
  }

  return (
    <div>
      <div>
        <div className="hidden gap-4 lg:grid">
          <RectCard imgsrc={PlayerData.combater?.character.image} />
          <p className="word-bubble">{PlayerData.description}</p>
        </div>
        <div className="lg:hidden">
          <Avatar
            imgsrc={PlayerData.combater?.character.image}
            org_width={225}
            org_height={350}
            className="h-12 w-12"
          />
        </div>
      </div>
      <div className="w-full">
        <AttributeBar attribute="HP" max={10} val={5} />
        <AttributeBar attribute="AP" max={10} val={4} />
      </div>
    </div>
  );
};

const BattleContent: React.FC<{ context: CombatLog }> = (props) => {
  console.log(props.context);
  const creatorID = props.context.combater1.id;
  return (
    <ul className="grid h-fit w-full gap-4 p-2">
      {props.context.logs.map((round, index) => {
        return (
          <li
            key={index}
            className={`flex w-full ${round.logger?.id === creatorID ? 'justify-start pr-6' : 'justify-end pl-6'}`}
          >
            <p className="word-bubble">{round.log}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Report;
