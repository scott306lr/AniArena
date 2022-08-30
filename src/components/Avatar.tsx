import Image from 'next/future/image';
import React from 'react';

interface Props {
  imgsrc?: string | null;
  org_width: number;
  org_height: number;
  className?: string;
}

const Avatar: React.FC<Props> = (prop) => {
  if (prop.imgsrc == null) {
    return <div>Loading...</div>;
  }

  return (
    <Image
      className={`m-1 rounded-full border-2 border-black p-0.5 ${prop.className}`}
      // layout="responsive"
      width={prop.org_width} // 225
      height={prop.org_height} // 350
      src={prop.imgsrc}
      alt="Avatar"
    />
  );
};

export default Avatar;
