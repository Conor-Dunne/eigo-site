import Link from 'next/link'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import LocaleSwitcher from './locale-switcher'
import { HiOutlineHome} from  "react-icons/hi";

export default async function Header({ lang }: { lang: Locale }) {
  const { navigation } = await getDictionary(lang)


  return (
    <header className=' bg-slate-900 text-white font-semibold shadow-md'>
          <nav className=" max-w-8xl flex flex-col md:flex-row gap-3 justify-center sm:justify-around items-center px-5 py-5">
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
    </header>
  )
}