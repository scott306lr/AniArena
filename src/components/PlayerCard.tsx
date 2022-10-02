import React, { ReactElement } from 'react';
import Avatar from './Avatar';

interface Props {
  imgsrc: string | null;
  name: string;
  text: string | null;
}

function PlayerCard({ imgsrc, name, text }: Props): ReactElement {
  return (
    // <div className="my-2 flex gap-2 rounded-lg bg-white p-2 shadow-lg transition duration-200 hover:bg-gray-500">
    //   <Avatar imgsrc={imgsrc} org_width={225} org_height={350} className="h-24 w-24" />
    //   <div>
    //     <div className="text-lg font-bold">{name}</div>
    //     <div>{text}</div>
    //   </div>
    // </div>
    // <div className="mt-3 grid grid-cols-3 gap-3 rounded-lg bg-white p-3 text-center shadow-lg transition duration-200 hover:bg-gray-500 md:grid-cols-2">
    <div className="flex w-auto gap-3 rounded-lg bg-white p-3 text-center shadow-lg transition duration-200 hover:bg-gray-500">
      <Avatar imgsrc={imgsrc} org_width={225} org_height={350} className="h-24 w-24 flex-none" />
      <div className="col-span-2 grid content-center items-center text-center">
        <div className="truncate text-lg font-bold">{name}</div>
        <div className="text-clip">{text}</div>
      </div>
    </div>
  );
}

export default PlayerCard;
