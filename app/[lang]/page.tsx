import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import ListItem from "./components/ListItem";
import DisplayLevel from "./components//displayLevel";
import Image from "next/image";
import heroImg from "@/public/images/ian-dooley-DuBNA1QMpPA-unsplash.jpg";
import spotifyIcon from "@/public/images/Spotify_Logo_RGB_Green.png"
import Link from "next/link";
import getFormattedDate from "@/lib/getFormattedDate";
import getExerpt from "@/lib/getExerpt";
import { FaHeadphonesAlt } from "react-icons/fa";

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

    const allPosts = await res.json();

    // Filter out unpublished posts
    return allPosts.filter((post: any) => post.published);
  };

  const allPosts = await getData();


  return (
    <>
      <div
        id="hero"
        className="relative flex justify-center items-center text-white w-full h-4 px-6 py-14 mb-1 -z-10 "
      >
        <h1 className=" text-5xl font-bold md:my-28 drop-shadow-lg">
          {page.home.title}
        </h1>
        <div className="absolute -z-10 w-full bg-black h-full">
          <Image
            alt="Hot air balloons"
            src={heroImg}
            quality={100}
            fill
            style={{
              objectFit: "cover",
            }}
            loading="lazy"
          />
        </div>
        <div className=" absolute right-0 bottom-0 w-20 bg-slate-900 p-2 rounded-sm">
        <Image
            alt="Hot air balloons"
            src={spotifyIcon}
            quality={100}
            loading="lazy"
          />
        </div>
      </div>
      <div>
        {/* <div className="flex justify-center py-10">
          <h2 className=" text-md font-light text-xs md:text-sm text-slate-500 text-center">
            {page.home.description}
          </h2>
        </div> */}
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1 px-3 py-4 xl:px-40">
          {/* Newest post  */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 md:row-span-2">
            <Link
              className=" font-bold text- hover:text-black/70 dark:hover:text-white"
              href={`/dbposts/${allPosts[0].id}`}
            >
              <div className="flex flex-col gap-3 w-full p-2 mb-3">
                <div className="w-full h-full relative">
                  <Image
                    src={allPosts[0].img}
                    width={600}
                    height={600}
                    alt="Picture of the author"
                    className="object-cover w-full h-full rounded-md"
                  />
                  {allPosts[0].audio && (
                    <FaHeadphonesAlt className="text-white bg-slate-800 text-6xl rounded-sm p-3 absolute bottom-0 right-0" />
                  )}
                  <DisplayLevel level={allPosts[0].level} />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className=" md:text-3xl">{allPosts[0].title}</h2>
                  <p className="text-sm font-light text-gray-500 mt-1">{getExerpt(allPosts[0], lang)}</p>
                  {/* <p className="md:text-2xl font-light mt-1">
                    {getFormattedDate(allPosts[0].createdAt)}
                  </p> */}
                </div>
              </div>
            </Link>
            {/* All other posts */}
          </div>
          {allPosts.slice(1).map((post: any, index: number) => (
            <ListItem key={index} post={post} lang={lang} />
          ))}
        </section>
      </div>
    </>
  );
}
