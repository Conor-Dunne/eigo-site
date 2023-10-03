import ListItem from "../components/ListItem"
import { getSortedPostsData } from "@/lib/posts"

export default function Aritcles(){

    const posts = getSortedPostsData()
    return (
        <section className=" container grid grid-cols-1 md:grid-cols-3 gap-1 justify-items-center mt-14">
            {posts.map(post => (
                <ListItem key={post.id} post={post} />
            ))}
    </section>
    )
    

}

