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

  

  // console.log(data.words[23].sense); //each sense is an array of objects that include a gloss
  // console.log(data.words[23].sense[0].gloss); //each gloss is also an array of objects that conation text parameters with english values

  // let arr = [];

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
  
  
  
  
  // data.words.forEach((word) => {
  //   if (wordMatch("dispute", word.sense && word.sense[0] && word.sense[0].gloss)) {
  //     arr.push(word.kanji);
  //     arr.push(word.kana);
  //   }
  // });

  // arr.sort((a, b) => {
  //   const aCommon = a.some((item) => item.common);
  //   const bCommon = b.some((item) => item.common);
  
  //   if (aCommon && !bCommon) {
  //     return -1; // Place arrays with common:true words first
  //   } else if (!aCommon && bCommon) {
  //     return 1; // Place arrays with common:false words later
  //   } else {
  //     return 0; // Maintain the order for arrays with no common:true words
  //   }
  // });
  
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

// ? (
//   <WordModal word={word} japanese={translation[0].text} />
// ) : (
//   word + " "
// )