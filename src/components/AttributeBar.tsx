import React, { ReactElement, useEffect, useState } from 'react';

interface Props {
  attribute: string;
  max: number;
  val: number;
}

function AttributeBar({ attribute, max, val }: Props): ReactElement {
  const [leftStyle, setLeftStyle] = useState({ width: '100%', backgroundColor: 'rgb(34 197 94)' });
  useEffect(() => {
    let length = (val / max) * 100;
    let color = length < 40 ? 'rgb(239 68 68)' : 'rgb(34 197 94)';
    setLeftStyle({ width: length + '%', backgroundColor: color });
  }, [max, val]);

  return (
    <div className="grid h-fit w-full justify-items-stretch gap-1 rounded-lg border-2 border-solid bg-white p-2 shadow-lg">
      {/* bar */}
      <div className="flex w-full">
        {/* Todo: change bar propotion accroding to max and val */}
        <div className="h-fit w-full overflow-hidden rounded-lg bg-gray-500">
          <div className="h-1 rounded-l-lg transition-all ease-linear" style={leftStyle}></div>
        </div>
      </div>
      {/* attribute text description */}
      <p className="justify-self-end text-xs lg:text-sm">
        {attribute} {val}/{max}
      </p>
    </div>
  );
}

export default AttributeBar;
