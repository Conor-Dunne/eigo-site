'use client'
import { HiOutlineHome } from "react-icons/hi";
import LocaleSwitcher from "./locale-switcher";
import { Locale } from '@/i18n.config'
import Link from "next/link";
import { useState } from "react";


type NavMenuProps = {
    lang: Locale;
    navigation: {
      home: string;
      about: string;
      // Add other properties from your navigation object
    };
  };
  
  export default function NavMenu({ lang, navigation }: NavMenuProps) {

    const [nav , setNav] = useState(false);

    return(
        <>
        <nav className=" max-w-8xl hidden  md:flex flex-col md:flex-row gap-3 justify-center sm:justify-around items-center px-5 py-5">
        <ul className='flex justify-between items-center gap-12 text-xl'>
        <li>
        <Link href={`/${lang}`}><HiOutlineHome className=" text-2xl"/></Link>
        </li>
        <li>
          <Link href={`/${lang}/about`}>{navigation.about}</Link>
        </li>
      </ul>
      <LocaleSwitcher />
    </nav>
    {/* Mobile Menu */}
    <nav className=" relative flex flex-col  md:hidden py-3 font-thin gap-4">
        { nav && <ul className='flex flex-col justify-between items-center text-md gap-4'>
        <li>
        <Link href={`/${lang}`}><HiOutlineHome className=" text-2xl"/></Link>
        </li>
        <li>
          <Link href={`/${lang}/about`}>{navigation.about}</Link>
        </li>
      </ul>}
      <LocaleSwitcher />
      <div className=" absolute top-0 right-0 m-3 font-bold">
        <button
        onClick={()=> setNav(!nav)}
        >X</button>
      </div>
    </nav>
        </>

    )
}