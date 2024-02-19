
export default function WordsAndPhrasesInput({ placeholder, onChangFunc }) {


    return (
        <>
            <h2>Difficult words and phrases</h2>
            <div className="flex flex-wrap gap-2">
                <input
                    // ref={titleRef}
                    placeholder="english"
                    type="text"
                    className="rounded-md px-4 py-2 my-2 border border-slate-300 "
                />
                <input
                    // ref={titleRef}
                    placeholder="japanese"
                    type="text"
                    className="rounded-md px-4 py-2 my-2 border border-slate-300 "
                />
                <select id="words" name="words" className="rounded-md px-4 py-2 my-2 border border-slate-300 "
                >
                    <option value="noun">noun</option>
                    <option value="pronoun">pronoun</option>
                    <option value="verb">verb</option>
                    <option value="adjective">adjective</option>
                    <option value="adverb">adverb</option>
                    <option value="preposition">preposition</option>
                    <option value="conjunction">conjunction</option>
                    <option value="adjective">adjective</option>
                    <option value="interjection">interjection</option>
                    <option value="null" selected>null</option>
                </select>
                <button className="font-semibold px-4 py-2 shadow-xl bg-green-400 rounded-lg hover:bg-slate-100">
              Add
            </button>
            </div>
        </>
    )
}