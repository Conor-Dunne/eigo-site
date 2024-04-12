"use client";
import React, { useState, useEffect } from "react";
import pluralize from "pluralize";
import { GB, JP } from "country-flag-icons/react/3x2";
import Loading from "./loading";

export default function WordModal({ word, japanese, searchByEngBoolean }) {
  const [display, setDisplay] = useState(false);
  const [dictionaryData, setDictionaryData] = useState(null);
  const [exampleData, setExampleData] = useState(null);
  const [exampleLoading, setExampleLoading] = useState(true);
  const [dictionaryApiLoading, setDictionaryApiLoading] = useState(true);
  const [dictionaryDataResponse, setDictionaryDataResponse] = useState(null);

  const cleanWord = word.replace(/[.,]/g, "").toLowerCase();
  const singularWord = pluralize.singular(cleanWord);

  const searchByEng = `lang=eng&q=%3D${pluralize.singular(
    cleanWord
  )}&trans=jpn`;
  const searchByJpn = `lang=jpn&q="${japanese}"&trans=eng`;

  // lock scroll when modal is open
  document.body.style.overflow = !display ? "unset" : "hidden";

  const fetchData = async () => {
    try {
      // Fetch dictionary data
      const dictionaryResponse = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${pluralize.singular(
          cleanWord
        )}`
      );
      const dictionaryData = await dictionaryResponse.json();
      setDictionaryDataResponse(dictionaryResponse.status);
      setDictionaryData(dictionaryData);
      setDictionaryApiLoading(false);

      console.log(dictionaryData)

      // Fetch example data
      const exampleResponse = await fetch(
        `https://api.dev.tatoeba.org/unstable/sentences?${
          searchByEngBoolean ? searchByEng : searchByJpn
        }&limit=3&sort=words`
      );
      const exampleData = await exampleResponse.json();

      const filteredData = [];

      setExampleData(exampleData.data);

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
        className="cursor-pointer underline decoration-orange-500 decoration-1 decoration-dashed underline-offset-4 "
        onClick={() => setDisplay(true)}
      >
        {word}
      </span>
      {display && (
        <div
          id="overlay"
          className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-slate-400 bg-opacity-50 overflow-scroll py-2"
        >
          <div
            id="modal"
            className="absolute top-[5%] flex flex-col shadow-lg border-2 w-[90%] max-w-96 border-cyan-950 justify-center items-center gap-2 bg-white p-4 rounded-md opacity-100"
          >
            <div className="flex flex-col w-full">
              <div className="flex justify-end items-center">
                <div
                  onClick={() => setDisplay(false)}
                  className="cursor-pointer text-lg font-extrabold text-cyan-950 border-2 border-cyan-950 px-2 rounded-md width-content"
                >
                  X
                </div>
              </div>
            </div>
            <div className="text-[10px] bg-slate-200 px-2 border border-rose-600 rounded-md">
              <p className="m-0">In beta | ベータばん | β版</p>
            </div>
            <div className="text-center">
              <h2 className="m-0">{pluralize.singular(cleanWord)}</h2>
              <p>
                {dictionaryData &&
                dictionaryDataResponse != 404 &&
                dictionaryData[0].phonetic
                  ? dictionaryData[0].phonetic
                  : null}
              </p>
            </div>
            <div>{japanese}</div>
            {dictionaryData && dictionaryDataResponse != 404 ? (
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
              <p>{dictionaryApiLoading ? <Loading /> : null}</p>
            )}
            {!exampleLoading && exampleData.length > 0 ? (
              <div className="flex flex-col text-sm w-full p-2 bg-slate-200">
                <div className="flex flex-col">
                  <div>
                    <ul className="list-none p-0">
                      {exampleData.map(
                        (
                          obj,
                          index // Added parentheses and index parameter
                        ) => (
                          <li key={index}>
                            {" "}
                            {/* Added key prop */}
                            <p className="my-2 font-bold">
                              {searchByEngBoolean
                                ? obj.text
                                : obj.translations.map(
                                    (array) => array.length > 0 && array[0].text
                                  )}
                            </p>
                            <p className="my-2 font-thin">
                              {searchByEngBoolean
                                ? obj.translations.map(
                                    (array) => array.length > 0 && array[0].text
                                  )
                                : obj.text}
                            </p>
                            <hr className=" border-0 clear-both block w-full h-[1px] bg-slate-300 my-0" />
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col text-sm w-full p-2 bg-slate-200">
                <div className="flex flex-col items-right">
                  <JP className=" w-[30px] h-4" />
                  <p className="my-2">
                    {exampleLoading ? (
                      <Loading />
                    ) : (
                      "データが見つかりませんでした :("
                    )}
                  </p>
                </div>

                <div className="flex flex-col items-right">
                  <GB className=" w-[30px] h-4" />
                  <p className="my-2">
                    {exampleLoading ? <Loading /> : "No data found... :("}
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
