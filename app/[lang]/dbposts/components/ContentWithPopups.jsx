import React from "react";
import WordModal from "./WordModal";
import { promises as fs } from "fs";
import { compareSync } from "bcrypt";

export default async function ContentWithPopups({ content, words }) {
  const file = await fs.readFile(
    process.cwd() + "/data/jmdict-eng-common-3.5.0.json",
    "utf8"
  );
  const data = JSON.parse(file);

  const splitWords = content.split(" ");

  function wordMatch(word, sense) {
    // List of common words to ignore
    const commonWords = ['in', 'a', 'by', 'the', 'of', 'this', 'that', 'is', 'are', 'from', 'with', 'new', 'to', 'for', 'have', 'and', 'as', 'at', 'time', 'will', 'now', 'about' /* add more common words as needed */];
  
    // Check if the word is a common word
    if (commonWords.includes(word.toLowerCase())) {
      return false;
    }
  
    if (sense && sense.length > 0) {
      return sense.some(obj => {
        return obj.gloss.slice(0, 3).some(g => { // Only check the first 3 glosses
          return g.text.startsWith(word + " (") ||
            g.text === word ||
            g.text === `to ${word}` ||
            g.text + "s" === `${word}` ||
            g.text + "." === `${word}` ||
            g.text + "," === `${word}` ||
            g.text + "s." === `${word}` ||
            g.text + "s," === `${word}`;
        });
      });
    }
  
    return false;
  }
  
  
  const renderContent = () => {
    const result = [];

    splitWords.forEach((word, index) => {
      let foundTranslation = [];
      let wordsArr = []


      data.words.forEach((obj) => {
        if (wordMatch(word.toLowerCase(), obj.sense)) {
          wordsArr.push(obj)
          foundTranslation = wordsArr
            // obj.kanji.length > 0 ? obj.kanji[0].text : obj.kana[0].text 
          
        }
      });

      if (foundTranslation.length > 0) {
        result.push(
          <WordModal
            key={index}
            word={word}
            japanese={foundTranslation}
          />
        );
      } else {
        result.push(word + " ");
      }
    });

    return result;
  };

  return <article className="leading-loose">{renderContent()}</article>;
}
