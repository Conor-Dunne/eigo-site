import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import ListItem from "./components/ListItem";
import { getSortedPostsData } from "@/lib/posts";
import Image from "next/image";


export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);

  const file = await fs.readFile(
    process.cwd() + "/data/jmdict-eng-common-3.5.0.json",
    "utf8",
  );
  const data = JSON.parse(file);

  const posts = getSortedPostsData();

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
            src= {`/images/ian-dooley-DuBNA1QMpPA-unsplash.jpg`}
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
          {posts.map((post) => (
            <ListItem key={post.id} post={post} />
          ))}
        </section>
        <h2>{data.words[0].kanji[0].text}</h2>
      </div>
    </>
  );
}

