import Image from "next/image";
import ContentWithPopupsNew from "../components/ContentWithPopupsNew";
import getData from "../helpers/getData";
import getFormattedDate from "@/lib/getFormattedDate";

const SinglePage = async ({ params }) => {

  const { id } = params;

  


  const data = await getData(id);
  const formattedDate = getFormattedDate(data.createdAt);


  return (
    <main className="prose prose-slate text-lg mx-auto mt-10 md:mt-20 px-6 pb-28 min-w-[260px]">
     <div className="flex flex-col">
     <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-2 text-gray-800">
        {data.title}
      </h1>
      <p className="text-sm text-gray-600 m-0">{formattedDate}</p>
     </div>
      <article className="mt-2">
      {data.audio && (
          <iframe
            className=" rounded-md sticky top-20"
            src={data.audio}
            width="100%"
            height="100"
            allowFullScreen
            allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        )}
        <Image
          src={data.img}
          width={400}
          height={400}
          alt="Picture of the author"
          className=" md:float-left rounded-lg w-full md:w-80 h-auto m-0 md:ml-0 md:mt-4 md:mr-3"
          priority={true}
        />
        
        <ContentWithPopupsNew content={data.desc} keyWords={data.keyWords} />
      </article>
    </main>
  );
};

export default SinglePage;
