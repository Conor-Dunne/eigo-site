import Link from "next/link"
import Image from "next/image"
// import getFormattedDate from "@/lib/getFormattedDate"

type Props = {
    post: BlogPost
}

export default function ListItem({ post }: Props) {
    const { id, title, date, img } = post
    // const formattedDate = getFormattedDate(date)
    console.log(post)

    return (
            <div className="flex flex-col gap-3 w-full shadow-md p-2">
<div className="w-full h-44 overflow-hidden"> {/* Adjust the height as needed */}
                <Image
                    src={img}
                    width={600}
                    height={600}
                    alt="Picture of the author"
                    className="object-cover w-full h-full" 
                />
            </div>            <Link className=" font-bold text- hover:text-black/70 dark:hover:text-white" href={`/posts/${id}`}>{title}</Link>
            <br />
            {/* <p className="text-sm mt-1">{formattedDate}</p> */}

            </div>
    )
}