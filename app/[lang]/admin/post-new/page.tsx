"use client"

import { useState } from "react"

export default function CreatPost () {

  const [isAdmin, setIsAdmin] = useState(true)



  return (
     !isAdmin ? (
      <div>
      <p>Please sign in</p>
  </div>
     ) : (
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">
            Add A Wonderful Blog 🚀
          </p>
          <form onSubmit={() => alert("test")}>
            <input
              // ref={titleRef}
              placeholder="Enter Title"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2 "
            />
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
