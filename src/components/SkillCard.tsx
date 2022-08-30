import React, { ReactElement } from 'react';
import Avatar from './Avatar';

interface Props {
  imgsrc: string;
  name: string;
  type: string;
  description: string;
}

function SkillCard({ imgsrc, name, type, description }: Props): ReactElement {
  let color = 'black';
  switch (type) {
    case '攻擊':
      //tailwind css: text-red-500
      color = 'rgb(239 68 68)';
      break;
    case '防禦':
      // tailwind css: text-blue-500
      color = 'rgb(59 130 246)';
      break;
    default:
      color = 'black';
      break;
  }
  const typeStyle = {
    color: color,
  };

  return (
    <div className="flex gap-2 rounded-lg bg-white p-2 shadow-lg transition-all hover:-translate-y-2 hover:scale-105">
      <div>
        <Avatar imgsrc={imgsrc} />
      </div>
      <div className="py-2">
        <span style={typeStyle}>{type} </span>
        <span> {name}</span>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default SkillCard;
