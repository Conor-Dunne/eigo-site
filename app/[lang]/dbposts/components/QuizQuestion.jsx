"use client";

import React, { useState, useEffect } from "react";

export default function QuizQuestion({ line }) {
  const [answer, setAnswer] = useState("");
  const [clozeSentence, setClozeSentence] = useState({
    clozeSentence: "",
    cloze: "",
  });

  useEffect(() => {
    function generateClozeSentence(sentence) {
      let trimmedSentence = sentence.trim();
      let sentenceArray = trimmedSentence.split(" ");
      let cloze = sentenceArray[Math.floor(Math.random() * sentenceArray.length)];
      
      // Create a regular expression to match the whole word, considering punctuation
      let clozeRegex = new RegExp(`\\b${cloze}\\b`, 'g');
      
      // Replace the cloze word with "______" in the sentence
      let clozeSentence = sentence.replace(clozeRegex, "______");
      
      // Handle cases where the cloze word has punctuation attached
      if (clozeSentence === sentence) {
        clozeRegex = new RegExp(`\\b${cloze}\\b[.,!?;:]?`, 'g');
        clozeSentence = sentence.replace(clozeRegex, "______");
      }
      
      return { clozeSentence, cloze };
    }

    setClozeSentence(generateClozeSentence(line));
  }, [line]);

  function speak(input) {
    const synth = window.speechSynthesis;
    if (!synth) {
      console.error("no tts");
      return;
    }

    let utterance = new SpeechSynthesisUtterance(input);
    utterance.lang = "en-GB";

    synth.speak(utterance);
  }

  function checkAnswer(input, cloze) {
    console.log("Input:", input);
    console.log("Expected Cloze:", cloze);
    console.log("Comparison Result:", input.trim().localeCompare(cloze, undefined, { sensitivity: 'base' }));
    return input.trim().localeCompare(cloze, undefined, { sensitivity: 'base' }) === 0;
  }

  return (
    <div className="flex flex-col gap-2 text-sm md:text-base">
      <div className="flex gap-3">
        <div className="flex items-center">
          <button onClick={() => speak(line)}>&#x1F508;</button>
        </div>
        <p className="my-2">{clozeSentence.clozeSentence + "."}</p>
      </div>
      <div className="flex gap-4">
        <input
          className="border border-black px-1 py-1 w-full md:w-2/5"
          type="text"
          onChange={(e) => setAnswer(e.target.value)}
        />
        <p className="my-0 text-green-500 font-bold ">
          {checkAnswer(answer, clozeSentence.cloze) ? "correct" : null}
        </p>
      </div>
    </div>
  );
}
