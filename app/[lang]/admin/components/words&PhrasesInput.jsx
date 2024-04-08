import { useState } from "react";

export default function WordsAndPhrasesInput({ vocab, addVocab, slug }) {
  const [eng, setEng] = useState("");
  const [jpn, setJpn] = useState("");
  const [partOfSpeech, setPartOfSpeech] = useState("null");

  const handleAdd = () => {
    const newWord = {
      English: eng,
      Japanese: jpn,
      partOfSpeech: partOfSpeech,
      postSlug: slug,
    };



    // Update vocab with new word
    addVocab([...vocab, newWord]);


    // Clear input fields
    // setEng("");
    // setJpn("");
    // setPartOfSpeech("");
  };

  return (
    <>
      <h2>Difficult words and phrases</h2>
      <div className="flex flex-wrap gap-2">
        <input
          onChange={(e) => setEng(e.target.value)}
          placeholder="English"
          type="text"
          className="rounded-md px-4 py-2 my-2 border border-slate-300"
        />
        <input
          onChange={(e) => setJpn(e.target.value)}
          placeholder="Japanese"
          type="text"
          className="rounded-md px-4 py-2 my-2 border border-slate-300"
        />
        <select
          id="words"
          name="words"
          className="rounded-md px-4 py-2 my-2 border border-slate-300"
          onChange={(e) => setPartOfSpeech(e.target.value)}
        >
          <option value="null">null</option>
          <option value="noun">noun</option>
          <option value="pronoun">pronoun</option>
          <option value="verb">verb</option>
          <option value="adjective">adjective</option>
          <option value="adverb">adverb</option>
          <option value="preposition">preposition</option>
          <option value="conjunction">conjunction</option>
          <option value="adjective">adjective</option>
          <option value="interjection">interjection</option>
        </select>
        <button
          className="font-semibold px-4 py-2 shadow-xl bg-green-400 rounded-lg hover:bg-slate-100"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
    </>
  );
}
