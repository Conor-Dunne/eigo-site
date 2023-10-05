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
      <div className="container">
        <div className="flex justify-center py-6">
        <h2 className=" text-lg md:text-2xl font-extrabold text-center">{page.home.description}</h2>

        </div>
        <section className=" container grid grid-cols-1 md:grid-cols-2 gap-1 justify-items-center">
        {posts.map(post => (
                <ListItem key={post.id} post={post} />
            ))}
        </section>
      </div>
    </>
  );
}
