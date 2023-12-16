"use client";
import React, { useState, useEffect } from "react";
import pluralize from 'pluralize';


export default function WordModal({ word, japanese }) {
  const [display, setDisplay] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [dictionaryData, setDictionaryData] = useState(null);
  const [exampleData, setExampleData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${pluralize.singular(word)}`
        );
        const data = await response.json();
        setDictionaryData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.dev.tatoeba.org/unstable/sentences?lang=eng&q=${pluralize.singular(word)}&trans=jpn&limit=3`
        );
        const data = await response.json();
        setExampleData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // const audioUrl = dictionaryData[0].phonetics[0]?.audio;
  console.log(exampleData);

  return (
    <>
      <span
        className=" border-b-2 border-orange-400 cursor-pointer"
        onClick={() => setDisplay(true)}
      >
        {word}
      </span>
      <span> </span>
      {display && (
        <div
          className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-slate-400 bg-opacity-50"
          onClick={() => setDisplay(false)}
        >
          <div className="top-0 flex flex-col w-3/5 shadow-lg border-2 border-cyan-950 justify-center items-center gap-2 bg-white p-4 rounded-md opacity-100">
            <div>
              <h2 className="m-0">{word}</h2>
            </div>
            <div>{japanese}</div>
            <div>
              {dictionaryData ? (
                <div className=" flex flex-col justify-center items-center">
                  <p>{dictionaryData[0].word}</p>

                  {dictionaryData[0].phonetics.find(
                    (phonetic) => phonetic.audio !== ""
                  ) && (
                    <audio controls>
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
              {exampleData.data && exampleData.data.length > 0 && (
                <div className="flex flex-col text-sm mt-14">
                  <p>{exampleData.data[0].text}</p>
                  {exampleData.data[0].translations[0] &&
                    exampleData.data[0].translations[0].length > 0 && (
                      <p>{exampleData.data[0].translations[0][0].text}</p>
                    )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
