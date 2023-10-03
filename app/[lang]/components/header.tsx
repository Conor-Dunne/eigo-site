import Link from 'next/link'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import LocaleSwitcher from './locale-switcher'

export default async function Header({ lang }: { lang: Locale }) {
  const { navigation } = await getDictionary(lang)

  return (
    <header className=' bg-slate-900 text-white font-semibold shadow-md'>
          <nav className=" container max-w-4xl flex justify-between items-center px-5 py-5">
          <ul className='flex justify-around items-center gap-3'>
          <li>
            <Link href={`/${lang}`}>{navigation.home}</Link>
          </li>
          <li>
            <Link href={`/${lang}/about`}>{navigation.about}</Link>
          </li>
          <li>
            <Link href={`/${lang}/articles`}>Articles</Link>
          </li>
        </ul>
        <LocaleSwitcher />
      </nav>
    </header>
  )
}