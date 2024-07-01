"use client";

import { useState } from "react";
import Image from "next/image";
import TextInputBox from "../components/TextInput";
import WordsAndPhrasesInput from "../components/words&PhrasesInput";
import DashboardLink from "../components/dashboardLink";
import { useRouter } from "next/navigation";

const slugify = require("slugify");

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://eigo-site.vercel.app"
    : "http://localhost:3000";

const getAllPosts = async () => {
  const res = await fetch(`${baseUrl}/api/posts`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

export default function CreatPost() {
  const [title, setTitle] = useState("");
  const [imgSrc, setImgSrc] = useState(
    "https://images.unsplash.com/photo-1707343848723-bd87dea7b118?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );
  const [slug, setSlug] = useState("");
  const [desc, setDesc] = useState("");
  const [descJP, setDescJP] = useState("");
  const [vocab, setVocab] = useState([]);
  const [audio, setAudio] = useState(null);
  const [level, setLevel] = useState(0);

  const handleAddVocab = (obj) => {
    setVocab(obj);
  };

  const router = useRouter();

  const handleSubmit = async () => {
    if (title.length === 0 || desc.length === 0) return;
    const levelInt = parseInt(level, 10)
    try {
      const postResponse = await fetch(`${baseUrl}/api/posts`, {
        method: "POST",
        body: JSON.stringify({
          title,
          desc: desc,
          audio: audio,
          img: imgSrc,
          slug: slug,
          desc_jp: descJP,
          level: levelInt,
        }),
      });

      if (!postResponse.ok) {
        throw new Error("Failed to post main data");
      }

      // Parse response data to extract information if needed
      const postData = await postResponse.json();
      console.log("Posted post data:", postData);

      router.push(`/`);

      const vocabPostResponse = await fetch(`${baseUrl}/api/vocabulary`, {
        method: "POST",
        body: JSON.stringify(vocab),
      });

      if (!vocabPostResponse.ok) {
        throw new Error("Failed to post vocabulary data");
      }

      const vocabData = await vocabPostResponse.json();
      console.log("Posted vocabulary data:", vocabData);

      // Handle success or do any necessary actions
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error appropriately
    }
  };

  return (
    <div className="w-full m-auto flex my-4">
      <div className="flex flex-col justify-center items-center m-auto">
        <DashboardLink />
        <p className="text-2xl text-slate-200 font-bold p-3">
          Make it wonderful! 🚀
        </p>
        <form
          onSubmit={() => {
            event.preventDefault();
          }}
        >
          <TextInputBox
            placeholder={"Enter Title"}
            onChangFunc={(e) => {
              setTitle(e.target.value);
              setSlug(slugify(title).toLowerCase());
            }}
            required={true}
          />
          <p>{title}</p>
          <p>{slug}</p>
          <TextInputBox
            placeholder={"Add img src url"}
            onChangFunc={(e) => setImgSrc(e.target.value)}
            required={false}
          />
          {imgSrc ? (
            <Image
              src={imgSrc}
              width={40}
              height={40}
              alt="Picture of the author"
              className="rounded-lg"
              priority={true}
            />
          ) : (
            <p>no image</p>
          )}
          <TextInputBox
            placeholder={"Add audio url"}
            onChangFunc={(e) => setAudio(e.target.value)}
            required={false}
          />
          <textarea
            placeholder="Enter Description"
            className="rounded-md px-4 py-2 w-full my-2 border border-slate-300  h-[300px] "
            onChange={(e) => setDesc(e.target.value)}
            required
          ></textarea>
         <div>
          <p>Difficulty Level:</p>
         <select
          id="level"
          name="level"
          className="rounded-md px-4 py-2 my-2 border border-slate-300"
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
         </div>
          <textarea
            placeholder="翻訳"
            className="rounded-md px-4 py-2 w-full my-2 border border-slate-300  h-[300px] "
            onChange={(e) => setDescJP(e.target.value)}
            required
          ></textarea>

          <WordsAndPhrasesInput
            vocab={vocab}
            addVocab={handleAddVocab}
            slug={slug}
          />

          <ul className="w-full p-4">
            {vocab.map((obj, index) => (
              <li className="flex w-full gap-3" key={index}>
                <h3>{obj.English}</h3>
                <h3>{obj.Japanese}</h3>
              </li>
            ))}
          </ul>

          <button
            type="submit"
            className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100"
            onClick={handleSubmit}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
