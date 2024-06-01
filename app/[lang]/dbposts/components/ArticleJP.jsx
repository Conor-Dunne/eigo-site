

export default async function ArticleJP({ data }) {
    const articleData = data.data;

  return (
    <article className="mt-2 leading-loose">
       {articleData.desc_jp}
      </article>
  )
}

