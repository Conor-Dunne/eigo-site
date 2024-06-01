


export default function LineByLine({ data }) {
    const articleData = data.data;


const lineByLine = articleData.desc.split(".");
const jp = articleData.desc_jp.split("。");


function speak(input) {
    const synth = window.speechSynthesis;
    if (!synth) {
      console.error("no tts");
      return;
    }

    let utterance = new SpeechSynthesisUtterance(input);
    utterance.lang = "en-GB";

    synth.speak(utterance);
  }


  return (
    <>
    {lineByLine.map((line, index) => (
        <div className="flex gap-4 border-b border-slate-600 text-base md:text-lg"  key={index}>
            <div className=" flex items-center">
            <button 
        onClick={() => speak(line)}
        >&#x1F508;</button>
            </div>
            <div className=" flex-col">
            <p>{line + "."}</p>
            <p>{jp[index] + "。"}</p>
            </div>
        </div>
    ))}
    </>
  )
}

