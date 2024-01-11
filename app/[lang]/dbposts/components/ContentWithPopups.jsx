import React from "react";
import WordModal from "./WordModal";


export default async function ContentWithPopups({ content, keyWords }) {


  const splitWords = content.split(" ");

 
  
  
  const renderContent = () => {
    const result = [];

    splitWords.forEach((word, index) => {
      let vocabObj = {}


      function wordMatch(word, keyWords) {

        const cleanedWord = word.replace(/[.,]/g, '');
  
        if (keyWords.some(keyword => keyword.English.toLowerCase() === cleanedWord.toLowerCase())) {
          vocabObj = keyWords.find(keyword => keyword.English.toLowerCase() === cleanedWord.toLowerCase());
            return true
        }
      
        return false;
      }


      if (wordMatch(word , keyWords)) {
        result.push(
          <WordModal
            key={index}
            word={word}
            japanese={vocabObj.Japanese}
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

