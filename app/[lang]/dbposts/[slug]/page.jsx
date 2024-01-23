import Image from "next/image";
import ContentWithPopups from "../components/ContentWithPopups"
import ContentWithPopupsNew from "../components/ContentWithPopupsNew";
import getData from "../helpers/getData"
import getFormattedDate from "@/lib/getFormattedDate"


const SinglePage = async ({ params }) => {
  const { slug } = params;


  const data = await getData(slug);
  const formattedDate = getFormattedDate(data.createdAt)


  return (
    <main className="prose prose-slate text-lg mx-auto mt-10 md:mt-20 px-6 pb-28 min-w-[260px]">
      <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-2 text-gray-800">
        {data.title}
      </h1>
      <p className="text-sm text-gray-600">{formattedDate}</p>
      <article className="mt-8">
        <Image src={data.img} width={600} height={600} alt="Picture of the author" className="rounded-lg" priority={true} />
        {/* <ContentWithPopups content={data.desc} keyWords={data.keyWords} /> */}
        <ContentWithPopupsNew content={data.desc} keyWords={data.keyWords} />

      </article>
    </main>
  );
};

export default SinglePage;