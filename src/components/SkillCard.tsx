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
    <div className="flex bg-white rounded-lg p-2 gap-2 shadow-lg hover:scale-105 hover:-translate-y-2 transition-all">
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
