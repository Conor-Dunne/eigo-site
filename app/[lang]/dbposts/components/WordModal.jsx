"use client";
import React, { useState, useEffect } from "react";
import pluralize from "pluralize";
import { GB, JP } from "country-flag-icons/react/3x2";

export default function WordModal({ word, japanese }) {
  const [display, setDisplay] = useState(false);
  const [dictionaryData, setDictionaryData] = useState(null);
  const [exampleData, setExampleData] = useState(null);
  const [exampleLoading, setExampleLoading] = useState(true)

  const cleanWord = word.replace(/[.,]/g, "").toLowerCase()

  const fetchData = async () => {
    try {
      // Fetch dictionary data
      const dictionaryResponse = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${pluralize.singular(
          cleanWord
        )}`
      );
      const dictionaryData = await dictionaryResponse.json();
      setDictionaryData(dictionaryData);

      // Fetch example data
      const exampleResponse = await fetch(
        `https://api.dev.tatoeba.org/unstable/sentences?lang=jpn&q=${japanese}&trans=eng&limit=3`
      );
      const exampleData = await exampleResponse.json();
      setExampleData(exampleData);
      setExampleLoading(false);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect to load data when word or japanese changes
  useEffect(() => {
    if (display) {
      fetchData();
    }
  }, [word, japanese, display]);

  return (
    <>
      <span
        className=" text-orange-700 font-medium cursor-pointer"
        onClick={() => setDisplay(true)}
      >
        {word}
      </span>
      <span> </span>
      {display && (
        <div
          id="overlay"
          className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-slate-400 bg-opacity-50"
        >
          <div
            id="modal"
            className="relative flex flex-col shadow-lg border-2 max-w-[90%] min-w-[250px] border-cyan-950 justify-center items-center gap-8 bg-white p-4 rounded-md opacity-100 "
          >
            <div className="flex flex-col w-full">
            <div className="flex justify-end">
            <div
              onClick={() => setDisplay(false)}
              className="cursor-pointer text-lg font-extrabold text-cyan-950 border-2 border-cyan-950 px-2 rounded-md width-content"
            >
              X
            </div>
            </div>
            <div className="text-center">
              <h2 className="m-0">{cleanWord}</h2>
            </div>
            </div>
            <div>{japanese}</div>
            {dictionaryData ? (
              <div className="flex justify-center">
                {dictionaryData[0].phonetics.find(
                  (phonetic) => phonetic.audio !== ""
                ) && (
                  <audio controls className="max-w-[90%]">
                    <source
                      src={
                        dictionaryData[0].phonetics.find(
                          (phonetic) => phonetic.audio !== ""
                        )?.audio
                      }
                      type="audio/mpeg"
                    />
                  </audio>
                )}
              </div>
            ) : (
              <p>Loading...</p>
            )}
            {!exampleLoading && exampleData.data && exampleData.data.length > 0 && exampleData.data[0].text.includes(japanese) ? (
              <div className="flex flex-col text-sm w-full p-2 bg-slate-200">
                <div className="flex flex-col items-right">
                  <JP className=" w-[30px] h-4" />
                  <p className="my-2">{exampleData.data[0].text}</p>
                </div>
                {exampleData.data[0].translations[0] &&
                  exampleData.data[0].translations[0].length > 0 && (
                    <div className="flex flex-col items-right">
                      <GB className=" w-[30px] h-4" />
                      <p className="my-2">
                        {exampleData.data[0].translations[0][0].text}
                      </p>
                    </div>
                  )}
              </div>
            ) : (
              <div className="flex flex-col text-sm w-full p-2 bg-slate-200">
              <div className="flex flex-col items-right">
                <JP className=" w-[30px] h-4" />
                <p className="my-2">{exampleLoading ? "読み込み中" : "データが見つかりませんでした :("}</p>
              </div>
           
                  <div className="flex flex-col items-right">
                    <GB className=" w-[30px] h-4" />
                    <p className="my-2">
                      {exampleLoading ? "Loading..." : "No data found... :("}
                    </p>
                  </div>
            </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
