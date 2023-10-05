import getFormattedDate from "@/lib/getFormattedDate"
// import { getSortedPostsData, getPostData } from "../../../../lib/posts"
// import { getSortedPostsData, getPostData } from "../../../../lib/posts"
import { getSortedPostsData, getPostData } from "@/lib/posts";
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'


export function generateStaticParams() {
    const posts = getSortedPostsData()

    return posts.map((post) => ({
        postId: post.id
    }))
}

export function generateMetadata({ params }: { params: { postId: string } }) {

    const posts = getSortedPostsData()
    const { postId } = params

    const post = posts.find(post => post.id === postId)

    if (!post) {
        return {
            title: 'Post Not Found'
        }
    }

    return {
        title: post.title,
    }
}

export default async function Post({ params }: { params: { postId: string } },) {

    const posts = getSortedPostsData()
    const { postId } = params

    if (!posts.find(post => post.id === postId)) notFound()

    const { title, date, contentHtml, img } = await getPostData(postId)

    const pubDate = getFormattedDate(date)

    return (
        <main className=" container prose prose-lg prose-slate mx-auto mt-10 md:mt-20">
            <h1 className=" text-2xl md:text-4xl mt-4 mb-0">{title}</h1>
            <p className="mt-0">
                {pubDate}
            </p>
            <article>
            <Image
                src={img}
                width={800}
                height={800}
                alt="Picture of the author"
            />

                <ReactMarkdown remarkPlugins={[remarkGfm]}>{contentHtml}</ReactMarkdown>
                {/* <section dangerouslySetInnerHTML={{ __html: contentHtml }} /> */}
                <p>
                    <Link href="/">← Back to home</Link>
                </p>
            </article>
        </main>
    )
}