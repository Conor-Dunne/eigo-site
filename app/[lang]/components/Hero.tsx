import Image from "next/image"
import img from '../../../public/images/ian-dooley-DuBNA1QMpPA-unsplash.jpg'

export default function Hero() {
    return (
      <div id='hero' className="relative flex justify-center items-center text-white w-full h-4 px-6 py-14 mb-1 -z-10">
        <h1 className=" text-5xl font-bold md:text-6xl md:my-28 drop-shadow-lg">Welcome!</h1>
        <div className="absolute -z-10 w-full bg-black h-full">
        <Image
        alt="Mountains"
        src={img}
        quality={100}
        fill  
        style={{
          objectFit: 'cover',
        }}
      />
        </div>
      </div>  
    )
  }