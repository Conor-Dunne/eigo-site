"use client";

import React, { useState } from "react";
import Article from "./Article"
import LineByLine from "./LineByLine"

export default function TabsBar( data ) {

  const tabs = ["Article", "Line-by-Line"];

  const [currentView, setCurrentView] = useState("Article")

  return (
    <div>
      <ul className="flex list-none p-0 m-0 gap-3">
        {tabs.map((tab, index) => (
          <li
            key={index}
            onClick={() => setCurrentView(tab)}
            className= {currentView === tab ? " bg-blue-900 text-white font-semibold p-2 rounded cursor-pointer underline" : " bg-blue-400 text-white p-2 rounded cursor-pointer"}
          >
            {tab}
          </li>
        ))}
      </ul>
      {currentView === "Article" ? <Article data={data} /> : <LineByLine data={data} />}
    </div>
  );
}
