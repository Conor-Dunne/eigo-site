"use client"
import React, { useState } from "react";

export default function WordModal({ word, japanese }) {
  const [display, setDisplay] = useState(false);

  return (
    <>
      <span className="underline cursor-pointer text-lg" onClick={() => setDisplay(true)}>
        {word}
      </span>
      <span> </span>
      {display && (
        <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-slate-400 bg-opacity-50" onClick={() => setDisplay(false)}>
          <div className="bg-white p-4 rounded-md opacity-100">
            <h1>{japanese}</h1>
          </div>
        </div>
      )}
    </>
  );
}

