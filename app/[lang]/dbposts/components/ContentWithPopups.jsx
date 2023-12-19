import React from "react";
import WordModal from "./WordModal";


export default async function ContentWithPopups({ content, keyWords }) {


  const splitWords = content.split(" ");

 
  
  
  const renderContent = () => {
    const result = [];

    splitWords.forEach((word, index) => {
      // let foundTranslation = [];
      let vocabObj = {}


      function wordMatch(word, keyWords) {

        const cleanedWord = word.replace(/[.,]/g, '');
  
        if (keyWords.some(keyword => keyword.English.toLowerCase() === cleanedWord.toLowerCase())) {
          vocabObj = keyWords.find(keyword => keyword.English.toLowerCase() === cleanedWord.toLowerCase());
            return true
        }
      
        return false;
      }


      // jmdictData.words.forEach((obj) => {
      //   if (wordMatch(word.toLowerCase(), obj.sense)) {
      //     wordsArr.push(obj)
      //     foundTranslation = wordsArr
      //       // obj.kanji.length > 0 ? obj.kanji[0].text : obj.kana[0].text 
          
      //   }
      // });

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


// export default async function ContentWithPopups({ content }) {
//   let commonWords = ['in', 'a', 'by', 'the', 'of', 'this', 'that', 'is', 'are', 'from', 'with', 'new', 'to', 'for', 'have', 'and', 'as', 'at', 'time', 'will', 'now', 'about' /* add more common words as needed */];


//   const splitWords = content.split(" ");

//   function wordMatch(word, sense) {
//     // List of common words to ignore
  
//     // Check if the word is a common word
//     if (commonWords.includes(word.toLowerCase())) {
//       return false;
//     }
  
//     if (sense && sense.length > 0) {
//       return sense.some(obj => {
//         return obj.gloss.slice(0, 3).some(g => { // Only check the first 3 glosses
//           return g.text.startsWith(word + " (") ||
//             g.text === word ||
//             g.text === `to ${word}` ||
//             g.text + "s" === `${word}` ||
//             g.text + "." === `${word}` ||
//             g.text + "," === `${word}` ||
//             g.text + "s." === `${word}` ||
//             g.text + "s," === `${word}`;
//         });
//       });
//     }
  
//     return false;
//   }
  
  
//   const renderContent = () => {
//     const result = [];

//     splitWords.forEach((word, index) => {
//       let foundTranslation = [];
//       let wordsArr = []


//       jmdictData.words.forEach((obj) => {
//         if (wordMatch(word.toLowerCase(), obj.sense)) {
//           wordsArr.push(obj)
//           foundTranslation = wordsArr
//             // obj.kanji.length > 0 ? obj.kanji[0].text : obj.kana[0].text 
          
//         }
//       });

//       if (foundTranslation.length > 0) {
//         commonWords.push(word);
//         result.push(
//           <WordModal
//             key={index}
//             word={word}
//             japanese={foundTranslation}
//           />
//         );
//       } else {
//         result.push(word + " ");
//       }
//     });

//     return result;
//   };

//   return <article className="leading-loose">{renderContent()}</article>;
// }
