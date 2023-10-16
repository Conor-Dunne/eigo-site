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
  const [nav, setNav] = useState(true);
  const showNavCss =
    "flex flex-col transition-all duration-500 justify-between items-center text-md gap-4 ";
  const hideNavCss = " -mt-24";

  return (
    <>
      <nav className=" max-w-8xl hidden  md:flex flex-col md:flex-row gap-3 justify-center sm:justify-around items-center px-5 py-5">
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
      <nav className=" relative flex flex-col  md:hidden py-5 font-thin gap-4">
        <ul className={`${showNavCss}${nav ? hideNavCss : null}`}>
        <li>
            <Link href={`/${lang}/about`}>{navigation.about}</Link>
          </li>
          <li>
            <LocaleSwitcher />
          </li>
        </ul>
        <button
        onClick={() => { !nav ? setNav(!nav) : null}}>
        <Link href={`/${lang}`}>
          <HiOutlineHome className=" absolute top-0 left-0 m-3 text-2xl" />
        </Link>
        </button>

        <div className=" absolute top-0 right-0 m-3 font-bold">
          <button onClick={() => setNav(!nav)}>
            {nav ? <FaBars /> : <FaTimes />}
          </button>
        </div>
      </nav>
    </>
  );
}
