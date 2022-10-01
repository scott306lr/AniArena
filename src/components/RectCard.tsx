import Image from 'next/image';
import React from 'react';

interface Props {
  imgsrc: string | undefined;
}

function RectCard({ imgsrc }: Props) {
  return (
    <div
      className="relative h-72 w-52 rounded-lg border-2 border-solid border-gray-700 bg-white 
    p-0.5 shadow-xl"
    >
      {imgsrc ? (
        <Image className="rounded-lg" src={imgsrc} layout="fill" alt="rect-card" priority />
      ) : (
        <div>Image not found</div>
      )}
    </div>
  );
}

export default RectCard;
