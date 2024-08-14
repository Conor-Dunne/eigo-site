import QuizQuestion from "./QuizQuestion";

export default function Quiz({ data } : { data: { data: {desc : string, desc_jp : string}}}) {
  const articleData = data.data;
  const lineByLine = articleData.desc.split(".");
  const jp = articleData.desc_jp?.split("。");

  return (
    <>
      <div className="text-[10px] bg-slate-200 px-2 border border-rose-600 rounded-md text-center my-3">
              <p className="m-0">In beta | ベータばん | β版</p>
            </div>

      {lineByLine.map((line, index) => (
        <>
          {line === "" ? null : (
            <div
              key={index}
              className="flex flex-col border-b border-slate-600 text-base md:text-lg py-2"
            >
              <QuizQuestion line={line} />
              <p className=" text-sm text-slate-500">
                {articleData.desc_jp && jp[index] + "。"}
              </p>
            </div>
          )}
        </>
      ))}
    </>
  );
}
