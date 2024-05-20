"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import TextInputBox from "../../components/TextInput";
import WordsAndPhrasesInput from "../../components/words&PhrasesInput";
import DashboardLink from "../../components/dashboardLink";
import { useRouter } from "next/navigation";

const slugify = require("slugify");

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://eigo-site.vercel.app"
    : "http://localhost:3000";

const updateBlog = async (data) => {
  const res = fetch(`http://localhost:3000/api/blog/${data.id}`, {
    method: "PUT",
    body: JSON.stringify({
      title: data.title,
      img: data.img,
      description: data.description,
    }),
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};

const deleteBlog = async (id) => {
  const res = fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "DELETE",
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};

const deleteVocab = async (id) => {
  const res = fetch(`http://localhost:3000/api/vocabulary/${id}`, {
    method: "DELETE",
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};

const getBlogById = async (id) => {
  const res = await fetch(`${baseUrl}/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export default function EditPost({ params }) {
  const [title, setTitle] = useState("Test Post");
  const [imgSrc, setImgSrc] = useState(
    "https://images.unsplash.com/photo-1707343848723-bd87dea7b118?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );
  const [slug, setSlug] = useState("asdasd");
  const [desc, setDesc] = useState("Test desc");
  const [audio, setAudio] = useState("");
  const [vocab, setVocab] = useState([]);
  const [newVocab, setNewVocab] = useState([]);

  useEffect(() => {
    getBlogById(params.id)
      .then((data) => {
        setTitle(data.title);
        setImgSrc(data.img);
        setSlug(data.slug);
        setDesc(data.desc);
        setVocab(data.keyWords);
        setAudio(data.audio)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])


  const handleAddVocab = (obj) => {
    setNewVocab(obj);
  };

  const router = useRouter();

  const handleDeleteVocab = async (id) => {
    try {
      await deleteVocab(id);
      setVocab(vocab.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleDeleteNewVocab = async (eng) => {
      setNewVocab(newVocab.filter((item) => item.English !== eng));
      console.log(newVocab)
  };


  const handleSubmit = async () => {
    try {
      const postResponse = await fetch(`${baseUrl}/api/posts/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({
          id: params.id,
          title: title,
          img: imgSrc,
          audio: audio,
          desc: desc,
          slug: slug,
        }),
      });

      const postData = await postResponse.json();
      console.log("Posted post data:", postData);

      // Check if newVocab array is not empty before posting
      if (newVocab.length > 0) {
        const vocabPostResponse = await fetch(`${baseUrl}/api/vocabulary`, {
          method: "POST",
          body: JSON.stringify(newVocab),
        });

        if (!vocabPostResponse.ok) {
          throw new Error("Failed to post vocabulary data");
        }

        const vocabData = await vocabPostResponse.json();
        console.log("Posted vocabulary data:", vocabData);
      }

      setNewVocab([]);

      router.push("/admin/dashboard");

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
            // handleSubmit();
          }}
        >
          <TextInputBox
            placeholder={"Enter Title"}
            onChangFunc={(e) => {
              setTitle(e.target.value);
              setSlug(slugify(title).toLowerCase());
            }}
            value={title}
          />
          <TextInputBox
            placeholder={"Add img src url"}
            onChangFunc={(e) => setImgSrc(e.target.value)}
            value={imgSrc}
          />
          {imgSrc ? (
            <Image
              src={imgSrc}
              width={100}
              height={100}
              alt="Picture of the author"
              className="rounded-lg"
              priority={true}
            />
          ) : (
            <p>no image</p>
          )}
          <TextInputBox
            placeholder={"Add audio src url"}
            onChangFunc={(e) => setAudio(e.target.value)}
            value={audio}
          />

          <textarea
            // ref={descriptionRef}
            placeholder="Enter Description"
            className="rounded-md px-4 py-2 w-full my-2 border border-slate-300  h-[300px] "
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          ></textarea>
          <WordsAndPhrasesInput
            vocab={newVocab}
            addVocab={handleAddVocab}
            slug={slug}
          />
          {newVocab.length > 0 ? (
            <ul className="w-full p-4">
              <p>New vocab to be added</p>
              {newVocab.map((obj, index) => (
                <li className="flex w-full gap-3" key={index}>
                  <button
                    className=" p-1 bg-red-500 rounded-lg"
                    onClick={() => handleDeleteNewVocab(obj.English)}
                  >
                    remove
                  </button>

                  <h3>{obj.English}</h3>
                  <h3>{obj.Japanese}</h3>
                </li>
              ))}
            </ul>
          ) : (
            <h2>Add new words!</h2>
          )}

          {vocab.length > 0 ? (
            <ul className="flex flex-col gap-3 w-full p-4">
              <p>saved vocab</p>
              {vocab.map((obj, index) => (
                <li className="flex w-full gap-5" key={index}>
                  <button
                    className=" p-1 bg-red-500 rounded-lg"
                    onClick={() => handleDeleteVocab(obj.id)}
                  >
                    remove
                  </button>
                  <h3>{obj.English}</h3>
                  <h3>{obj.Japanese}</h3>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading vocabulary...</p>
          )}

          <button
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
