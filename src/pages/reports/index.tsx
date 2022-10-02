import type { NextPage } from 'next';
import Avatar from '../../components/Avatar';
import React from 'react';
import Navbar from '../../components/Navbar';
import { trpc } from '../../utils/trpc';
import Link from 'next/link';
import { CombatLog } from '../../utils/AniClasses/Arena';

import type { inferProcedureOutput, inferProcedureInput } from '@trpc/server';
import type { AppRouter } from '../../server/trpc/router';

const Reports: NextPage = () => {
  const { data: battleLogs, isLoading } = trpc.arena.getBattleLogs.useQuery();
  // Todo: fetch data here

  return (
    <div>
      <Navbar />
      <main className="grid">
        {/* sections */}
        <section className="m-8 flex justify-center gap-8 p-4">
          {/* middle characters section*/}
          {!isLoading && battleLogs && <ReportList title={'近期戰報'} battleLogs={battleLogs} />}
        </section>
      </main>
    </div>
  );
};

type BattleLogType = inferProcedureOutput<AppRouter['arena']['getBattleLogs']>;
const ReportList: React.FC<{ title: string; battleLogs: BattleLogType }> = (props) => {
  return (
    <div className="grid place-content-center gap-2 p-2 text-center">
      <h1 className="text-3xl"> {props.title} </h1>
      <ul className="flex h-auto flex-col space-y-2 rounded-lg bg-white p-2 shadow-lg transition-all hover:scale-110">
        {props.battleLogs.map((log, index) => {
          const content = (log.content as unknown as CombatLog) || undefined;
          if (content == null) {
            return null;
          }

          return (
            <Link key={index} href={`/reports/${log.id}`} passHref>
              <li className="hover-primary flex h-auto w-full justify-center border-2 border-gray-500">
                <div className="flex flex-col justify-center px-2">
                  <h3 className="text-center text-lg">{content?.combater1.name}</h3>
                  <Avatar
                    imgsrc={content?.combater1.character.image}
                    org_width={225}
                    org_height={350}
                    className="h-24 w-24"
                  />
                </div>
                {/* <div className="mx-3 h-full w-0.5 bg-gray-600" /> */}
                <div className="mx-3 flex flex-col justify-center">
                  <h3 className="h-fit text-lg">v.s.</h3>
                </div>
                <div className="flex flex-col justify-center px-2">
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
  );
};

export default Reports;
