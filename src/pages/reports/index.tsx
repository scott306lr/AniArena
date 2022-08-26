import type { NextPage } from 'next';
import AttributeBar from '../../components/AttributeBar';
import Avatar from '../../components/Avatar';
import RectCard from '../../components/RectCard';
import React, { useState } from 'react';
import SkillCard from '../../components/SkillCard';
import AttributeAdjustor from '../../components/AttributeAdjustor';
import Navbar from '../../components/Navbar';
import { trpc } from '../../utils/trpc';

const Reports: NextPage = () => {
  const { data: BattleLogs, isLoading } = trpc.proxy.arena.getBattleLogs.useQuery();
  // Todo: fetch data here

  return (
    <div>
      <Navbar />
      <main className="grid">
        {/* sections */}
        <div className="flex justify-center m-8 p-4 gap-8">
          {/* middle characters section*/}
          <div className="grid place-content-center p-2">
            <ul className="flex flex-col h-auto bg-white rounded-lg shadow-lg p-2 space-y-2 hover:scale-110 transition-all">
              {BattleLogs &&
                BattleLogs.map((log, index) => {
                  if (log.content == null) {
                    return null;
                  }

                  return (
                    <li key={index} className="flex h-auto md:w-1/2 md:h-1/2">
                      <div className="flex h-auto border-2 border-gray-500">
                        <div className="flex flex-col justify-center">
                          <h3>{log.content?.combater1.name}</h3>
                          <Avatar imgsrc={log.content?.combater1.character.image} />
                        </div>

                        <div className="flex flex-col justify-center">
                          <h3>{log.content?.combater2.name}</h3>
                          <Avatar imgsrc={log.content?.combater2.character.image} />
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
