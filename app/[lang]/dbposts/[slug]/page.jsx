import Image from "next/image";
import ContentWithPopups from "../components/ContentWithPopups"
import jmdictData from "@/data/jmdict-eng-common-3.5.0.json"
import { Suspense } from 'react';
import Loading from "../components/ContentWithPopups"



const getData = async (slug) => {

  const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://eigo-site.vercel.app' 
    : 'http://localhost:3000';


  const res = await fetch(`${baseUrl}/${ "ja" || "en"}/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const SinglePage = async ({ params }) => {
  const { slug } = params;

  const data = await getData(slug);
  

  return (
    <main className="prose prose-slate text-lg mx-auto mt-10 md:mt-20 px-6 pb-28">
      {/* <VocabSideMenu vocabList={data.kay} lang={lang} page={page} /> */}
      <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-2 text-gray-800">
        {data.title}
      </h1>
      <p className="text-sm text-gray-600">{data.createdAt}</p>
      <article className="mt-8">
        <Image src={data.img} width={600} height={600} alt="Picture of the author" className="rounded-lg" />
        {/* <ContentWithPopups content={data.desc} words={data.keyWords} data={jmdictData} /> */}
        <p>{data.desc}</p>
      </article>
    </main>
  );
};

export default SinglePage;