import reactStringReplace from 'react-string-replace';
import WordModal from "./WordModal";


export default async function ContentWithPopupsNew({ content, keyWords }) {

let replacedContent = content

keyWords.forEach(word => {


    replacedContent = reactStringReplace(replacedContent, word.English, (match, i) => (
        <WordModal
            key={i}
            word={word.English}
            japanese={word.Japanese}
          />
      ))

})

console.log(replacedContent)

 
  
  

  return <article className="leading-loose">{replacedContent}</article>;
}

