"use client";

import React, { useState } from "react";
import Article from "./Article";
import LineByLine from "./LineByLine";
import ArticleJP from "./ArticleJP";
import Quiz from "./Quiz";

export default function TabsBar(data) {

  const tabs = ["article", "lineByLine", "translation", "quiz"];

  const [currentView, setCurrentView] = useState("article");

  return (
    <div>
      <ul className="flex flex-wrap list-none p-0 m-0 gap-3">
        {tabs.map((tab, index) => (
          <li
            key={index}
            onClick={() => setCurrentView(tab)}
            className={
              currentView === tab
                ? " bg-blue-900 text-white p-2 rounded cursor-pointer underline underline-offset-4 text-base"
                : " bg-blue-400 text-white p-2 rounded cursor-pointer text-base"
            }
          >
            {data.tabNames[`${tab}`]}
          </li>
        ))}
      </ul>
      {currentView === "article" && <Article data={data} />}
      {currentView === "lineByLine" && <LineByLine data={data} />}
      {currentView === "translation" && <ArticleJP data={data} />}{" "}
      {currentView === "quiz" && <Quiz data={data} />}{" "}
    </div>
  );
}
