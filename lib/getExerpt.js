export default function getExerpt(data, lang) {


    let exerpt = ""

    if (lang === "en") { exerpt = data.desc.slice(0, data.desc.indexOf(".")) + "." };
    if (lang === "ja") { exerpt = data.desc_jp.slice(0, data.desc_jp.indexOf("。")) + "。" };


    return exerpt
}