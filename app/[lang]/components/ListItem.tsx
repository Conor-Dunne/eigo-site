import Link from "next/link"
import Image from "next/image"
import getFormattedDate from "@/lib/getFormattedDate"

type Props = {
    post: BlogPost
}

export default function ListItem({ post }: Props) {
    const { id, slug, createdAt,title, img } = post
    const formattedDate = getFormattedDate(createdAt)

    return (
        <Link 
        className=" font-bold text- hover:text-black/70 dark:hover:text-white" 
        href={`/dbposts/${slug}`}
        >
            <div className="flex flex-col gap-3 w-full p-2 mb-3">
<div className="w-full h-32 overflow-hidden ">
                <Image
                    src={img}
                    width={600}
                    height={600}
                    alt="Picture of the author"
                    className="object-cover w-full h-full rounded-md " 
                />
            </div>       
            <div className="flex flex-col gap-2">
            <h2>{title}</h2> 
            <p className="text-sm font-light text-gray-700 mt-1">{formattedDate}</p>
            </div>
                </div>    
            </Link>
    )
}