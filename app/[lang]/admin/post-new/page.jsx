"use client"

import { useState } from "react"
import Image from "next/image";


export default function CreatPost () {

  const [isAdmin, setIsAdmin] = useState(true)
  const [imgSrc, setImgSrc] = useState(null);

  const handleInputChangeImg = (e) => {
    setImgSrc(e.target.value);
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
          <form onSubmit={() => alert("test")}>
            <input
              // ref={titleRef}
              placeholder="Enter Title"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2 "
            />
            <input
              // ref={titleRef}
              placeholder="Add image source url"
              onChange={handleInputChangeImg}
              type="text"
              className="rounded-md px-4 w-full py-2 my-2 "
            />
            {imgSrc ? <Image src={imgSrc} width={200} height={200} alt="Picture of the author" className="rounded-lg" priority={true} /> : <p>no image</p>}
            <textarea
              // ref={descriptionRef}
              placeholder="Enter Description"
              className="rounded-md px-4 py-2 w-full my-2"
            ></textarea>
            <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
              Submit
            </button>
          </form>
        </div>
      </div>
     )
  )
  
}
