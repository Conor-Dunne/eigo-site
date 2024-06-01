

export default async function ArticleJP({ data }) {
    const articleData = data.data;

  return (
    <article className="mt-2 leading-loose">
       {articleData.desc_jp ? articleData.desc_jp : "No translation available right now. We're working on it! 👷"}
      </article>
  )
}

