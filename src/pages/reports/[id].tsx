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
        <div className="m-2 flex flex-wrap justify-center gap-4 p-2">
          {/* Character A status section */}
          <div className="flex w-5/12 justify-items-center rounded-lg bg-slate-50 p-4 lg:grid lg:w-min lg:gap-4">
            <div>
              <div className="hidden gap-4 lg:grid">
                <RectCard imgsrc="https://media.discordapp.net/attachments/872026548692209738/872045442450485288/6fm6YnX.png" />
                <p className="word-bubble">{'其名惠惠，職業乃大法師，使役最強之攻擊魔法：爆裂魔法之人！'}</p>
              </div>
              <div className="lg:hidden">
                <Avatar
                  className="h-12 w-12"
                  imgsrc="https://media.discordapp.net/attachments/872026548692209738/872045442450485288/6fm6YnX.png"
                />
              </div>
            </div>
            <div className="w-full">
              <AttributeBar attribute="HP" max={hpMax} val={hpVal} />
              <AttributeBar attribute="HP" max={hpMax} val={hpVal} />
            </div>
          </div>

          {/* Character B status section */}
          <div className="flex w-5/12 justify-items-center rounded-lg bg-slate-50 p-4 lg:order-last lg:grid lg:w-min lg:gap-4">
            <div>
              <div className="hidden gap-4 lg:grid">
                <RectCard imgsrc="https://media.discordapp.net/attachments/872026548692209738/872045442450485288/6fm6YnX.png" />
                <p className="word-bubble">{'其名惠惠，職業乃大法師，使役最強之攻擊魔法：爆裂魔法之人！'}</p>
              </div>
              <div className="lg:hidden">
                <Avatar
                  className="h-12 w-12"
                  imgsrc="https://media.discordapp.net/attachments/872026548692209738/872045442450485288/6fm6YnX.png"
                />
              </div>
            </div>
            <div className="w-full">
              <AttributeBar attribute="HP" max={hpMax} val={hpVal} />
              <AttributeBar attribute="HP" max={hpMax} val={hpVal} />
            </div>
          </div>

          <div className="w-full lg:hidden"></div>

          <div className="flex w-full lg:w-1/3">
            {BattleLog && <BattleContent context={BattleLog.content as unknown as CombatLog} />}

            {/* <ul className="grid gap-4 h-fit p-2">
              <li className="flex justify-start w-full pr-6">
                <p className="word-bubble">
                  {
                    '黑より黑く 闇より暗き漆黑に ，我が深紅の混淆を望みたもう，覺醒のとき來たれり，無謬の境界に落ちし理，無行の歪みとなりて，現出せよ！Explosion！'
                  }
                </p>
              </li>
              <li className="flex justify-end w-full pl-6">
                <p className="word-bubble">{'亞絲娜！克萊茵！拜託幫我撐個十秒左右就好！Switch！Startbrust Steam！'}</p>
              </li>
            </ul> */}
          </div>
        </div>
      </main>
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
            className={`flex w-full pr-6 ${round.logger?.id === creatorID ? 'justify-start pr-6' : 'justify-end pl-6'}`}
          >
            <p className="word-bubble">{round.log}</p>
          </li>
        );
      })}
    </ul>
    // <div>{props.context.combater1.id}</div>;
  );
};

export default Report;
