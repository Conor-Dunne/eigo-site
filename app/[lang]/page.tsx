import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import ListItem from "./components/ListItem";
import Image from "next/image";
import heroImg from "@/public/images/ian-dooley-DuBNA1QMpPA-unsplash.jpg";
import Link from "next/link";
import getFormattedDate from "@/lib/getFormattedDate";

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
      {/* <div
        id="hero"
        className="relative flex justify-center items-center text-white w-full h-4 px-6 py-14 mb-1 -z-10 "
      >
        <h1 className=" text-5xl font-bold md:text-6xl md:my-28 drop-shadow-lg">
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
      </div> */}
      <div>
        {/* <div className="flex justify-center py-10">
          <h2 className=" text-md font-light text-xs md:text-sm text-slate-500 text-center">
            {page.home.description}
          </h2>
        </div> */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 px-3 py-4 md:py-24  xl:px-40">
          <div className="col-span-1 md:col-span-2 md:row-span-2">
            {" "}
            <Link
              className=" font-bold text- hover:text-black/70 dark:hover:text-white"
              href={`/dbposts/${allPosts[0].slug}`}
            >
              <div className="flex flex-col gap-3 w-full p-2 mb-3">
                <div className="flex flex-col gap-2 h-full">
                  <h2 className=" md:text-6xl">{allPosts[0].title}</h2>
                  <p className="md:text-2xl font-light text-gray-700 mt-1">
                    {getFormattedDate(allPosts[0].createdAt)}
                  </p>
                </div>

                <div className="w-full h-full overflow-hidden">
                  {" "}
                  {/* Adjust the height as needed */}
                  <Image
                    src={allPosts[0].img}
                    width={1000}
                    height={1000}
                    alt="Picture of the author"
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
              </div>
            </Link>
          </div>
          {allPosts.slice(1).map((post: any, index: number) => (
            <ListItem key={index} post={post} />
          ))}
        </section>
      </div>
    </>
  );
}
