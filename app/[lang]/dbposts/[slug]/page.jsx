import Image from "next/image";
import ContentWithPopups from "../components/ContentWithPopups"
import { Suspense } from 'react';
import Loading from "../components/ContentWithPopups"
import getData from "../helpers/getData"


const SinglePage = async ({ params }) => {
  const { slug } = params;

  const data = await getData(slug);


  return (
    <main className="prose prose-slate text-lg mx-auto mt-10 md:mt-20 px-6 pb-28">
      <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-2 text-gray-800">
        {data.title}
      </h1>
      <p className="text-sm text-gray-600">{data.createdAt}</p>
      <article className="mt-8">
        <Image src={data.img} width={600} height={600} alt="Picture of the author" className="rounded-lg" />
        <ContentWithPopups content={data.desc} keyWords={data.keyWords} />
      </article>
    </main>
  );
};

export default SinglePage;