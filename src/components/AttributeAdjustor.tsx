import React, { ReactElement } from 'react';

interface Props {
  name: string;
  value: number;
  minusClick: () => void;
  addClick: () => void;
}

function AttributeAdjustor({ name, value, minusClick, addClick }: Props): ReactElement {
  return (
    <div className="flex w-fit items-center justify-center gap-8 place-self-center rounded-lg bg-white p-2 shadow-lg transition-all hover:scale-110">
      <button onClick={minusClick} className="round-btn">
        {' '}
        -{' '}
      </button>
      <span className="flex-1 text-center">
        {name}: {value}
      </span>
      <button onClick={addClick} className="round-btn ">
        {' '}
        +{' '}
      </button>
    </div>
  );
}

export default AttributeAdjustor;
