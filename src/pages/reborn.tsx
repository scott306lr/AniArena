import type { NextPage } from 'next';
import AttributeBar from '../components/AttributeBar';
import Avatar from '../components/Avatar';
import RectCard from '../components/RectCard';
import React, { useState } from 'react';
import SkillCard from '../components/SkillCard';
import AttributeAdjustor from '../components/AttributeAdjustor';
import Navbar from '../components/Navbar';
import { trpc } from '../utils/trpc';
import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';

const Reborn: NextPage = () => {
  const [selected, setSelected] = useState(0);

  const { data: unlockedChars, isLoading: u_isLoading } = trpc.proxy.me.getUnlockedChar.useQuery();
  // const {data: combater, isLoading: c_isLoading} = trpc.proxy.me.getCombater.useQuery();

  const [attr, setAttr] = useState({ HP: 0, AP: 0, APRegen: 0 } as attr);
  const addHP = () => setAttr({ ...attr, HP: attr.HP + 1 });
  const minusHP = () => setAttr({ ...attr, HP: attr.HP - 1 });
  const addAP = () => setAttr({ ...attr, AP: attr.AP + 1 });
  const minusAP = () => setAttr({ ...attr, AP: attr.AP - 1 });
  const addAPRegen = () => setAttr({ ...attr, APRegen: attr.APRegen + 1 });
  const minusAPRegen = () => setAttr({ ...attr, APRegen: attr.APRegen - 1 });

  // console.log(props.character?.orgAttr)
  const selectClick = (index: number) => {
    setSelected(index);
    if (unlockedChars != null) {
      setAttr(unlockedChars[index]?.orgAttr as attr);
    }
  };

  const resetClick = () => {
    if (unlockedChars != null && unlockedChars[selected] != undefined) {
      setAttr(unlockedChars[selected]?.orgAttr as attr);
    }
  };

  const { mutate: mutateName, isLoading, error } = trpc.proxy.me.reborn.useMutation();

  const confirmClick = () => {
    console.log('confirm clicked');
    if (
      unlockedChars != undefined &&
      unlockedChars[selected] != undefined &&
      unlockedChars[selected]?.id != undefined
    ) {
      const id = Number(unlockedChars[selected]?.id);
      mutateName({ characterId: id, attr: attr });
    }
  };

  return (
    <div>
      <Navbar />
      <main className="grid gap-4">
        {/* middle characters section*/}
        {/*      Add click event */}
        <div className="grid place-content-center p-2">
          <ul className="flex flex-wrap rounded-lg bg-white shadow-lg">
            {u_isLoading || unlockedChars == null ? (
              <div className="flex justify-center">
                <div className="spinner"></div>
              </div>
            ) : (
              unlockedChars.map((character, index) => (
                <li key={index} className="md:h-1/2 md:w-1/2" onClick={() => selectClick(index)}>
                  <Avatar imgsrc={character?.image} />
                </li>
              ))
            )}
          </ul>
        </div>
        {/* Character status section */}
        {u_isLoading || unlockedChars == null || unlockedChars[selected] == null ? (
          <div>loading...</div>
        ) : (
          <div className="m-4 flex w-10/12 flex-wrap justify-center gap-4 justify-self-center rounded-md bg-white p-4 shadow-lg sm:w-auto">
            <div className="grid justify-items-center gap-4">
              <RectCard imgsrc={unlockedChars[selected]?.image} />
              <div className="word-bubble">{unlockedChars[selected]?.description}</div>
            </div>
            <div className="grid place-content-center">
              <div className="grid gap-4">
                <AttributeAdjustor name="HP" value={attr.HP} minusClick={minusHP} addClick={addHP} />
                <AttributeAdjustor name="AP" value={attr.AP} minusClick={minusAP} addClick={addAP} />
                <AttributeAdjustor
                  name="APRegen"
                  value={attr.APRegen}
                  minusClick={minusAPRegen}
                  addClick={addAPRegen}
                />
                <button onClick={resetClick} className="action-btn">
                  {'重設'}
                </button>
                <Link href="/" passHref>
                  <button onClick={confirmClick} className="action-btn">
                    {'確認'}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Reborn;

type attr = {
  AP: number;
  HP: number;
  APRegen: number;
};
