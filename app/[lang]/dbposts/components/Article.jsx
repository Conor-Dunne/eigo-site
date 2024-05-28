import Image from "next/image";
import ContentWithPopupsNew from "./ContentWithPopupsNew";




export default async function Article({ data }) {
    const articleData = data.data;

  return (
    <article className="mt-2">
      {articleData.audio && (
          <iframe
            className=" rounded-md sticky top-20"
            src={articleData.audio}
            width="100%"
            height="100"
            allowFullScreen
            allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        )}
        <Image
          src={articleData.img}
          width={400}
          height={400}
          alt="Picture of the author"
          className=" md:float-left rounded-lg w-full md:w-80 h-auto m-0 md:ml-0 md:mt-4 md:mr-3"
          priority={true}
        />
        
        <ContentWithPopupsNew content={articleData.desc} keyWords={articleData.keyWords} />
      </article>
  )
}

