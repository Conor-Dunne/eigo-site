import Link from 'next/link'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import LocaleSwitcher from './locale-switcher'
import { HiOutlineHome} from  "react-icons/hi";
import NavMenu from './nav-menu';

export default async function Header({ lang }: { lang: Locale }) {
  const { navigation } = await getDictionary(lang)


  return (
    <header className=' sticky top-0 shadow-md'>
      <NavMenu lang={lang} navigation={navigation} />
    </header>
  )
}