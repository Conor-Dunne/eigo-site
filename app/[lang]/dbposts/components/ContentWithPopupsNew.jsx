import reactStringReplace from 'react-string-replace';
import WordModal from "./WordModal";


export default async function ContentWithPopupsNew({ content, keyWords }) {

let replacedContent = content


keyWords.forEach(word => {

  let regex = new RegExp(`\\b(${word.English}\\b)`)

    replacedContent = reactStringReplace(replacedContent, regex, (match, i) => (
        <WordModal
            key={i}
            word={word.English}
            japanese={word.Japanese}
            searchByEngBoolean={word.searchByEng}
          />
      ))
})
  return <article className="leading-loose">{replacedContent}</article>;
}

