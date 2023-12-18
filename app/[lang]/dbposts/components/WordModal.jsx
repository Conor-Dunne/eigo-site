"use client";
import React, { useState, useEffect } from "react";
import pluralize from 'pluralize';
import { GB , JP } from 'country-flag-icons/react/3x2'


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
          `https://api.dictionaryapi.dev/api/v2/entries/en/${pluralize.singular(word.replace(/[.,]/g, '').toLowerCase())}`
        );
        console.log(pluralize.singular(word));
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
          `https://api.dev.tatoeba.org/unstable/sentences?lang=eng&q=${pluralize.singular(word.replace(/[.,]/g, '').toLowerCase())}&trans=jpn&limit=3`
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
          id="overlay"
          className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-slate-400 bg-opacity-50"
          onClick={() => setDisplay(false)}
        >
          <div id="modal" className="top-0 flex flex-col shadow-lg border-2 max-w-[90%] border-cyan-950 justify-center items-center gap-12 bg-white p-4 rounded-md opacity-100">
            <div>
              <h2 className="m-0">{word}</h2>
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
              {exampleData.data && exampleData.data.length > 0 && (
                <div className="flex flex-col text-sm p-2 bg-slate-200">
                  <div className="flex flex-col items-right"><GB className=" w-[30px] h-4" /><p className="my-2" >{exampleData.data[0].text}</p></div>
                  {exampleData.data[0].translations[0] &&
                    exampleData.data[0].translations[0].length > 0 && (
                      <div className="flex flex-col items-right"><JP className=" w-[30px] h-4" /><p className="my-2">{exampleData.data[0].translations[0][0].text}</p></div>
                      
                    )}
                </div>
              )}
          </div>
        </div>
      )}
    </>
  );
}
