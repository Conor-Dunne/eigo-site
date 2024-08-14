import reactStringReplace from 'react-string-replace';
import WordModal from "./WordModal";

type Word = {
    id: string,
    English: string,
    Japanese: string,
    searchByEng: boolean,
}

type Props = {
  content: string;
  keyWords: Word[] 
    
  }



export default async function ContentWithPopupsNew({ content, keyWords } : Props) {

let replacedContent: string | React.ReactNode[] = content


keyWords.forEach((word, index) => {

  let regex = new RegExp(`\\b(${word.English}\\b)`)


    replacedContent = reactStringReplace(replacedContent, regex, (match, i) => (
        <WordModal
            key={`${word.id}-${i}`}
            word={word.English}
            japanese={word.Japanese}
            searchByEngBoolean={word.searchByEng}
          />
      ))
})


  return <article className="leading-loose">{replacedContent}</article>;
}

