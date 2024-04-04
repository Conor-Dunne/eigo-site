import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import ListItem from "./components/ListItem";
import Image from "next/image";
import { promises as fs } from "fs";
import heroImg from "@/public/images/ian-dooley-DuBNA1QMpPA-unsplash.jpg"
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);



  const getData = async () => {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://eigo-site.vercel.app"
        : "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/posts`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed");
    }

    return res.json();
  };

  const allPosts = await getData();

  return (
    <>
      <div
        id="hero"
        className="relative flex justify-center items-center text-white w-full h-4 px-6 py-14 mb-1 -z-10"
      >
        <h1 className=" text-5xl font-bold md:text-6xl md:my-28 drop-shadow-lg">
          {page.home.title}
        </h1>
        <div className="absolute -z-10 w-full bg-black h-full">
          <Image
            alt="Mountains"
            src= {heroImg}
            quality={100}
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-center py-10">
          <h2 className=" text-md font-light text-xs md:text-sm text-slate-500 text-center">
            {page.home.description}
          </h2>
        </div>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 px-3 xl:px-40">
          { allPosts.map((post: any) => (
            <ListItem key={post.id} post={post} />
          ))}
        </section>
      </div>
    </>
  );
}

