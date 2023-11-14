import React from "react";
import WordModal from "./WordModal";

export default function ContentWithPopups({ content, words }) {

  console.log( content, words);

  const splitWords = content.split(" ");
  const vocabArr = words.map((obj) => obj.English.toLowerCase());

  return (
    <article>
      {splitWords.map((word, index) => (
        <React.Fragment key={index}>
          {vocabArr.includes(word.toLowerCase()) ? (
            <WordModal word={word} japanese={getJapanese(word, words)} />
          ) : (
            word + " "
          )}
        </React.Fragment>
      ))}
    </article>
  );
}

function getJapanese(word, words) {
  const matchingWord = words.find(
    (obj) => obj.English.toLowerCase() === word.toLowerCase()
  );
  return matchingWord ? matchingWord.Japanese : "";
}
