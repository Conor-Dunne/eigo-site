"use client"

import { useState } from "react"
import Image from "next/image";
import TextInputBox from "./components/TextInput"
import WordsAndPhrasesInput from "./components/words&PhrasesInput"
import { useRouter } from "next/navigation";

const slugify = require('slugify')

const baseUrl = process.env.NODE_ENV === 'production'
? 'https://eigo-site.vercel.app' 
: 'http://localhost:3000';


const getAllPosts = async () => {
  const res = await fetch(`${baseUrl}/${ "ja" || "en"}/api/posts`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

export default function CreatPost() {

  const [isAdmin, setIsAdmin] = useState(false)
  const [title, setTitle] = useState("Test Post");
  const [imgSrc, setImgSrc] = useState("https://images.unsplash.com/photo-1707343848723-bd87dea7b118?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  const [slug, setSlug] = useState("asdasd");
  const [desc, setDesc] = useState("Test desc");
  

  const router = useRouter();


  



  const handleSubmit = async () => {
    const res = await fetch(`${baseUrl}/${ "ja" || "en"}/api/posts`, {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: desc,
        img: imgSrc,
        slug: slugify(title),
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/`);
    }
  };


  return (
    !isAdmin ? (
      <div>
        <p>Please sign in</p>
      </div>
    ) : (
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">
            Make it wonderful! 🚀
          </p>
          <form onSubmit={() => {
            event.preventDefault();
            handleSubmit();
          } }>
            {/* <input
              // ref={titleRef}
              placeholder="Enter Title"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2 "
            /> */}
            < TextInputBox placeholder={"Enter Title"} onChangFunc={(e) => {
              setTitle(e.target.value);
              setSlug(slugify(title).toLowerCase())
            }} />
            <h1>{title}</h1>
            <p>{slug}</p>
            <TextInputBox placeholder={"Add img src url"} onChangFunc={(e) => setImgSrc(e.target.value)} />
            <p>{imgSrc}</p>
            {imgSrc ? <Image src={imgSrc} width={40} height={40} alt="Picture of the author" className="rounded-lg" priority={true} /> : <p>no image</p>}
            <textarea
              // ref={descriptionRef}
              placeholder="Enter Description"
              className="rounded-md px-4 py-2 w-full my-2 border border-slate-300  h-[300px] "
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
            <p>{desc}</p>
            {/* < WordsAndPhrasesInput /> */}
            <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
              Save
            </button>
          </form>
        </div>
      </div>
    )
  )

}
