export default function LineByLine({ data } : { data: { data: {desc : string, desc_jp : string}}}) {
  const articleData = data.data;

  const lineByLine = articleData.desc.split(".");
  const jp = articleData.desc_jp?.split("。");

  function speak(input : string) {
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

line === "" ? null : 
        <div
          className="flex gap-4 border-b border-slate-600 text-base md:text-lg"
          key={index}
        >
          <div className=" flex items-center">
            <button onClick={() => speak(line)}>&#x1F508;</button>
          </div>
          <div className=" flex-col">
            <p>{line + "."}</p>
            <p className=" text-sm text-slate-500">
              {articleData.desc_jp && jp[index] + "。"}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
