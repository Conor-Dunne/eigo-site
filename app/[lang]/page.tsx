import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import Hero from "./components/Hero";
import ListItem from "./components/ListItem";
import { getSortedPostsData } from "@/lib/posts"

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);

  const posts = getSortedPostsData()


  return (
    <>
      <Hero />
      <div>
        <div className="flex justify-center py-10">
        <h2 className=" text-md font-light text-xs md:text-sm text-slate-500 text-center">{page.home.description}</h2>

        </div>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 px-3 xl:px-40">
        {posts.map(post => (
                <ListItem key={post.id} post={post} />
            ))}
        </section>
      </div>
    </>
  );
}
