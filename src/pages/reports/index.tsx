import type { NextPage } from 'next';
import Avatar from '../../components/Avatar';
import React from 'react';
import Navbar from '../../components/Navbar';
import { trpc } from '../../utils/trpc';
import Link from 'next/link';
import { CombatLog } from '../../utils/AniClasses/Arena';

const Reports: NextPage = () => {
  const { data: BattleLogs, isLoading } = trpc.proxy.arena.getBattleLogs.useQuery();
  // Todo: fetch data here

  return (
    <div>
      <Navbar />
      <main className="grid">
        {/* sections */}
        <div className="m-8 flex justify-center gap-8 p-4">
          {/* middle characters section*/}
          <div className="grid place-content-center p-2">
            <ul className="flex h-auto flex-col space-y-2 rounded-lg bg-white p-2 shadow-lg transition-all hover:scale-110">
              {isLoading != null &&
                BattleLogs &&
                BattleLogs.map((log, index) => {
                  const content = (log.content as unknown as CombatLog) || undefined;
                  if (content == null) {
                    return null;
                  }

                  return (
                    <li key={index} className="flex h-auto md:h-1/2 md:w-1/2">
                      <Link href={`/reports/${log.id}`} passHref>
                        <div className="flex h-auto border-2 border-gray-500">
                          <div className="flex flex-col justify-center">
                            <h3>{content?.combater1.name}</h3>
                            <Avatar imgsrc={content?.combater1.character.image} />
                          </div>

                          <div className="flex flex-col justify-center">
                            <h3>{content?.combater2.name}</h3>
                            <Avatar imgsrc={content?.combater2.character.image} />
                          </div>
                        </div>
                      </Link>
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
