import type { NextPage } from 'next';
import AttributeBar from '../components/AttributeBar';
import Avatar from '../components/Avatar';
import RectCard from '../components/RectCard';
import React, { useState } from 'react';
import SkillCard from '../components/SkillCard';
import AttributeAdjustor from '../components/AttributeAdjustor';
import Navbar from '../components/Navbar';

const MakeProfile: NextPage = () => {
  // const [expMax, setExpMax] = useState(4);
  const expMax = 4;
  const [expVal, setExpVal] = useState(1);
  const [hp, setHp] = useState(7);

  const increaseExp = () => setExpVal((prev) => Math.min(expMax, prev + 1));
  const decreaseExp = () => setExpVal((prev) => Math.max(0, prev - 1));
  const addHp = () => setHp(hp + 1);
  const minusHp = () => setHp(Math.max(0, hp - 1));

  const confirmClick = () => {
    console.log('confirm clicked');
  };
  const resetClick = () => {
    console.log('reset clicked');
  };
  // Todo: fetch data here

  const Avatars = [
    {
      name: 'Kirito',
      imgsrc:
        'https://images-ext-1.discordapp.net/external/x08twzHAcDIWcqHEPgEIdfLNoIGST3tHUdti0Ww3b00/https/mudae.net/uploads/1232276/v6uL2AsAjYy0QE0-4OKy~0P98O5C.png',
    },
    {
      name: 'Megumin',
      imgsrc: 'https://media.discordapp.net/attachments/872026548692209738/872045442450485288/6fm6YnX.png',
    },
    {
      name: 'Saber',
      imgsrc: 'https://media.discordapp.net/attachments/872026548692209738/872045678669484062/nkmBV7R.png',
    },
  ];

  const Skills = [
    {
      name: 'Explosion',
      type: '攻擊',
      description: '黑より黑く 闇より暗き漆黑に ，無謬の境界に落ちし理，無行の歪みとなりて，現出せよ！Explosion！',
    },
    {
      name: 'Explosion',
      type: '防禦',
      description: '防禦魔法！',
    },
    {
      name: 'Explosion',
      type: '攻擊',
      description: '黑より黑く 闇より暗き漆黑に ，無謬の境界に落ちし理，無行の歪みとなりて，現出せよ！Explosion！',
    },
  ];

  return (
    <div>
      <Navbar />
      <main className="grid">
        {/* sections */}
        <div className="m-8 flex flex-wrap justify-center gap-8 p-4">
          {/* middle characters section*/}
          <div className="grid place-content-center p-2">
            <ul className="flex flex-wrap space-y-2 rounded-lg bg-white p-2 shadow-lg transition-all hover:scale-110 md:grid">
              {Avatars.map((avatar, index) => (
                <li key={index} className="md:h-1/2 md:w-1/2">
                  <Avatar imgsrc={avatar.imgsrc} org_width={225} org_height={350} className="h-24 w-24" />
                </li>
              ))}
            </ul>
          </div>

          {/* Character status section */}
          <div className="grid place-content-center">
            <div className="grid w-min justify-items-center gap-4">
              <RectCard imgsrc="https://media.discordapp.net/attachments/872026548692209738/872045442450485288/6fm6YnX.png" />
              <p className="word-bubble">{'其名惠惠，職業乃大法師，使役最強之攻擊魔法：爆裂魔法之人！'}</p>
              <div>
                <AttributeBar attribute="EXP" max={expMax} val={expVal} />
                <button onClick={increaseExp} className="button-primary">
                  {'addExp'}
                </button>
                <button onClick={decreaseExp} className="button-primary">
                  {'minusExp'}
                </button>
              </div>
            </div>
          </div>

          {/* Attribute Secion */}
          <div className="grid place-content-center">
            <div className="grid gap-4">
              <AttributeAdjustor name="HP" value={hp} minusClick={minusHp} addClick={addHp} />
              <AttributeAdjustor name="HP" value={hp} minusClick={minusHp} addClick={addHp} />
              <AttributeAdjustor name="HP" value={hp} minusClick={minusHp} addClick={addHp} />
              <button onClick={confirmClick} className="button-primary">
                {'重設'}
              </button>
              <button onClick={resetClick} className="button-primary">
                {'確認'}
              </button>
            </div>
          </div>

          {/* SkillCards Section */}
          {/*Todo: change it to filter map  */}
          <div className="grid place-content-center lg:w-1/3">
            <ul className="grid gap-4">
              {Skills.map((skill, index) => (
                <li key={index} className="grid w-full">
                  <SkillCard
                    name={skill.name}
                    type={skill.type}
                    description={skill.description}
                    imgsrc="https://media.discordapp.net/attachments/872026548692209738/872045442450485288/6fm6YnX.png"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MakeProfile;
