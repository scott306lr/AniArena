import type { NextPage } from 'next';
import Avatar from '../../components/Avatar';
import React from 'react';
import Navbar from '../../components/Navbar';
import { trpc } from '../../utils/trpc';
import Link from 'next/link';
import { CombatLog } from '../../utils/AniClasses/Arena';

const Reports: NextPage = () => {
  const { data: BattleLogs, isLoading } = trpc.arena.getBattleLogs.useQuery();
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
                    <Link key={index} href={`/reports/${log.id}`} passHref>
                      <li className="hover-primary flex h-auto w-full border-2 border-gray-500">
                        <div className="flex flex-col justify-center">
                          <h3 className="text-center text-lg">{content?.combater1.name}</h3>
                          <Avatar
                            imgsrc={content?.combater1.character.image}
                            org_width={225}
                            org_height={350}
                            className="h-24 w-24"
                          />
                        </div>
                        <div className="mx-3 h-full w-0.5 bg-gray-600" />
                        <div className="flex flex-col justify-center">
                          <h3 className="text-center text-lg">{content?.combater2.name}</h3>
                          <Avatar
                            imgsrc={content?.combater2.character.image}
                            org_width={225}
                            org_height={350}
                            className="h-24 w-24"
                          />
                        </div>
                      </li>
                    </Link>
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
