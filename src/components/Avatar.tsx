import Image from 'next/image';
import React from 'react';

interface Props {
  imgsrc?: string | null;
  className?: string;
}

function Avatar({ imgsrc, className }: Props) {
  return (
    <div className="h-min w-min rounded-lg p-1 duration-200 hover:bg-gray-500 hover:ease-in-out">
      <div className="rounded-full border-2 border-solid border-black p-0.5">
        <div className={`relative h-24 w-24 overflow-hidden rounded-full ${className}`}>
          {imgsrc && <Image className="border-solid" src={imgsrc} layout="fill" alt="Avatar" />}
        </div>
      </div>
    </div>
  );
}

export default Avatar;
