import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import Hero from "./components/Hero";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);

  return (
    <>
      <Hero />
      <div className="container">
        <section className=" flex flex-col justify-center items-center w-full mt-28 px-5 gap-24">
          <h1 className="text-3xl font-bold">{page.home.title}</h1>
          <p className="text-gray-500">{page.home.description}</p>
        </section>
      </div>
    </>
  );
}
