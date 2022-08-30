import React, { ReactElement } from 'react';
import Avatar from './Avatar';

interface Props {
  imgsrc: string | null;
  name: string;
  text: string | null;
}

function PlayerCard({ imgsrc, name, text }: Props): ReactElement {
  return (
    <div className="my-2 flex gap-2 rounded-lg bg-white p-2 shadow-lg transition duration-200 hover:bg-gray-500">
      <Avatar imgsrc={imgsrc} />
      <div>
        <div className="text-lg font-bold">{name}</div>
        <div>{text}</div>
      </div>
    </div>
  );
}

export default PlayerCard;
