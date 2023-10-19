"use client";
import { HiOutlineHome } from "react-icons/hi";
import LocaleSwitcher from "./locale-switcher";
import { Locale } from "@/i18n.config";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

type NavMenuProps = {
  lang: Locale;
  navigation: {
    home: string;
    about: string;
    // Add other properties from your navigation object
  };
};

export default function NavMenu({ lang, navigation }: NavMenuProps) {
  const [nav, setNav] = useState(false);
  const showNavCss =
    "flex flex-col transition-all duration-500 justify-between items-center text-md gap-4 ";
  const hideNavCss = " -mt-24 ";

  return (
    <>
      <nav className=" max-w-8xl hidden  bg-slate-900  text-white font-semibold  md:flex flex-col md:flex-row gap-3 justify-center sm:justify-around items-center px-5 py-5">
        <ul className="flex justify-between items-center gap-12 text-xl">
          <li>
            <Link href={`/${lang}`}>
              <HiOutlineHome className=" text-2xl" />
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/about`}>{navigation.about}</Link>
          </li>
        </ul>
        <LocaleSwitcher />
      </nav>
      {/* Mobile Menu */}
      <nav className={`relative flex flex-col  bg-slate-900  text-white  md:hidden font-md gap-4 transition-all ${ nav ? "py-6" : "pb-16"}`}>
        <ul className={`${showNavCss}${!nav ? hideNavCss : null}`}>
        <li>
            <button
            onClick={() => setNav(!nav)}
            >
            <Link href={`/${lang}/about`}>{navigation.about}</Link>
            </button>
          </li>
          <li>
            <LocaleSwitcher />
          </li>
        </ul>
        <button
        onClick={() => { nav ? setNav(!nav) : null}}>
        <Link href={`/${lang}`}>
          <HiOutlineHome className=" absolute top-0 left-0 mt-5 ml-2 text-2xl" />
        </Link>
        </button>

        <div className=" absolute top-0 right-0 mt-5 mr-2 font-bold text-xl">
          <button onClick={() => setNav(!nav)}>
            {!nav ? <FaBars /> : <FaTimes />}
          </button>
        </div>
      </nav>
    </>
  );
}
