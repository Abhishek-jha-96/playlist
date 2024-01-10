import { useState } from "react";

const Card = ({ songlist, selectedartist }) => { 

  const filteredSongList = selectedartist
    ? songlist.filter(item => item.artist === selectedartist)
    : songlist;

  return (
    <div className="flex flex-wrap w-full gap-4">
      {filteredSongList.map((item) => (
        <div key={item} className="flex-col items-center justify-center w-[30vw] md:w-[15vw] hover:drop-shadow-lg hover:md:w-[15.3vw] h-[32vh] hover:transition ease-out shadow-sm rounded-lg bg-[#FAF8F1] hover:bg-[#61481C] hover:text-white p-1">
          <img
            className="w-[29vw] md:w-[14.5vw] h-[22vh] shadow-sm"
            src="/retro-style-cassette-tape.jpg"
            alt="hello"
            height={10}
            width={10}
          />
          <div className="w-full py-1 flex-col px-2">
            <p className="text-lg font-serif font-semibold">{item["title"]}</p>
            <p className="text-base font-sans">{item["artist"]}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
