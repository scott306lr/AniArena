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
  //Recent
  const { data: battleLogs, isLoading } = trpc.arena.getBattleLogs.useQuery();

  //Popular
  const { data: battleLogsP, isLoading: isLoadingP } = trpc.arena.getBattleLogs.useQuery();
  // Todo: fetch data here

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <main className="flex h-auto justify-center overflow-hidden p-4">
        {/* sections */}
        <section className="flex h-auto justify-center gap-8 overflow-hidden p-4">
          {/* middle characters section*/}
          {!isLoading && battleLogs && <ReportList title={'近期戰報'} battleLogs={battleLogs} />}
          {!isLoadingP && battleLogsP && <ReportList title={'熱門戰報'} battleLogs={battleLogsP} />}
        </section>
      </main>
    </div>
  );
};

type BattleLogType = inferProcedureOutput<AppRouter['arena']['getBattleLogs']>;
const ReportList: React.FC<{ title: string; battleLogs: BattleLogType }> = (props) => {
  return (
    <div className="grid h-auto gap-2 p-2 text-center">
      <h1 className="text-3xl"> {props.title} </h1>
      <div className="h-auto overflow-y-auto rounded-md bg-white shadow-lg">
        <ul className="flex h-auto flex-col space-y-2 p-4">
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
    </div>
  );
};

export default Reports;
