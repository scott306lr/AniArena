import Image from 'next/image';
import React from 'react';

interface Props {
  imgsrc: string | undefined;
}

function RectCard({ imgsrc }: Props) {
  return (
    <div className="char-img relative h-72 w-52">
      {imgsrc ? (
        <Image className="rounded-lg" src={imgsrc} layout="fill" alt="rect-card" priority />
      ) : (
        <div>Image not found</div>
      )}
    </div>
  );
}

export default RectCard;
