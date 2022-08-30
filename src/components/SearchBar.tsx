import React, { ReactElement } from 'react';

import { HiSearch } from 'react-icons/hi';

interface Props {
  onClick: () => void;
}

function SearchBar({ onClick }: Props): ReactElement {
  return (
    <div className="flex gap-1 rounded-lg bg-white p-2 shadow-lg">
      <input className="flex-grow rounded-lg bg-gray-200 p-1"></input>
      <button className="rounded-lg p-1 duration-200 hover:bg-gray-500 hover:ease-in-out" onClick={onClick}>
        <HiSearch className="h-6 w-6" />
      </button>
    </div>
  );
}

export default SearchBar;
