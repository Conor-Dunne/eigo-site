import Link from "next/link"
import Image from "next/image"
import getFormattedDate from "@/lib/getFormattedDate"
import getExerpt from "@/lib/getExerpt";
import { FaHeadphonesAlt } from "react-icons/fa";
import { Locale } from "@/i18n.config";



type Props = {
    post: BlogPost;
    lang: Locale;
}

export default function ListItem({ post, lang }: Props) {
    const { id, slug, createdAt,title, img , audio, } = post


    const formattedDate = getFormattedDate(createdAt)


    return (
        <Link 
        className=" font-bold text- hover:text-black/70 dark:hover:text-white" 
        href={`/dbposts/${id}`}
        >
            <div className="flex flex-col gap-3 w-full p-2 mb-3">
<div className="w-full h-32 overflow-hidden relative ">
                <Image
                    src={img}
                    width={600}
                    height={600}
                    alt="Picture of the author"
                    className="object-cover w-full h-full rounded-md " 
                />
                {audio && <FaHeadphonesAlt className="text-white bg-slate-800 text-5xl md:text-4xl rounded-sm p-3 md:p-2 absolute bottom-0 right-0" />}
            </div>       
            <div className="flex flex-col gap-2">
            <h2>{title}</h2> 
            <p className="text-sm font-light text-gray-700 mt-1">{getExerpt(post, lang)}</p>
            <p className="text-sm font-light text-gray-700 mt-1">{formattedDate}</p>
            </div>
                </div>    
            </Link>
    )
}