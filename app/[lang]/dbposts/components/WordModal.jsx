"use client"
import React, { useState } from "react";

export default function WordModal({ word, japanese }) {
  const [display, setDisplay] = useState(false);

  return (
    <>
      <span className=" border-b-2 cursor-pointer" onClick={() => setDisplay(true)}>
        {word}
      </span>
      <span> </span>
      {display && (
        <div className="fixed top-0 left-0 h-screen w-screen pt-40 flex items-center justify-center bg-slate-400 bg-opacity-50" onClick={() => setDisplay(false)}>
          <div className="fixed top-0 flex flex-col w-3/5 overflow-scroll justify-center items-center gap-2 bg-white p-4 rounded-md opacity-100">
            <div><h2 className="m-0">{word}</h2></div>
        <div>
        {japanese.map(obj => (
        obj.kanji.length > 0 ? <div className="flex gap-4" key={obj.id}><p className=" font-semibold">{obj.kanji[0].text}</p><p>{obj.kana[0].text}</p></div> : <p key={obj.id}>{obj.kana[0].text}</p>
      ))}
        </div>
          </div>
        </div>
      )}
    </>
  );
}

