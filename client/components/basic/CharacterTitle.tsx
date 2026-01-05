import React from "react";

function CharacterTitle({ name }: { name: string }) {
  return (
    <div className="flex w-full items-center">
      <div className="w-full h-1 bg-green-600" />
      <h2 className="w-fit px-10 text-4xl uppercase">{name}</h2>
      <div className="w-full h-1 bg-green-600" />
    </div>
  );
}

export default CharacterTitle;
