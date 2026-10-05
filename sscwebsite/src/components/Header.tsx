import { useEffect, useState } from 'react'
import useLanguage from '../i18n/useLanguage'
import { LANGS } from '../i18n/translations'
import useTheme from '../theme/useTheme'
import { Link, usePath } from '../router'
import { Btn } from './ui'

const NAV: [string, string][] = [['home', '/'], ['about', '/tentang-kami'], ['doctors', '/dokter'], ['articles', '/artikel']]

function LangSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLanguage()
  return (
    <div role="group" aria-label={t('common.util.switchLanguage')} className={`flex items-center text-[11.5px] font-medium tracking-[.04em] ${className}`}>
      {LANGS.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span aria-hidden className="mx-1 text-line">|</span>}
          <button type="button" aria-pressed={lang === l} lang={l} onClick={() => setLang(l)} className={`rounded px-1 py-1 uppercase transition-colors duration-200 ${lang === l ? 'text-ink' : 'text-muted hover:text-ink'}`}>{l}</button>
        </span>
      ))}
    </div>
  )
}

function ThemeToggle({ withLabel = false }: { withLabel?: boolean }) {
  const { theme, toggle } = useTheme()
  const { t } = useLanguage()
  const dark = theme === 'dark'
  return (
    <button type="button" onClick={toggle} aria-label={t(dark ? 'common.util.toggleLight' : 'common.util.toggleDark')} aria-pressed={dark}
      className={`flex items-center gap-2 rounded-full text-muted transition-colors duration-200 hover:text-ink ${withLabel ? 'min-h-11 border border-line px-4 text-[13px]' : 'h-9 w-9 justify-center'}`}>
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {dark ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></> : <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />}
      </svg>
      {withLabel && <span>{t(dark ? 'common.util.light' : 'common.util.dark')}</span>}
    </button>
  )
}

export default function Header() {
  const [menu, setMenu] = useState(false)
  const path = usePath()
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const on = () => setScrolled(scrollY > 8); on(); addEventListener('scroll', on, { passive: true }); return () => removeEventListener('scroll', on) }, [])
  const isActive = (to: string) => (to === '/' ? path === '/' : path.startsWith(to))
  return (
      <header data-scrolled={scrolled} className="sticky top-0 z-40 border-b border-line bg-paper/95">
        <div className="mx-auto flex h-[60px] max-w-[1280px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link to="/" className="font-serif text-[19px] tracking-tight max-[399px]:text-[17px] sm:text-[22px]">Senopati Skin Center</Link>
          <nav className="hidden gap-7 text-[12.5px] text-muted md:flex md:gap-4 lg:gap-9">
            {NAV.map(([k, to]) => (
              <Link key={k} to={to} aria-current={isActive(to) ? 'page' : undefined} className={`relative whitespace-nowrap transition-colors duration-200 hover:text-ink after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-ink after:transition-all after:duration-200 hover:after:w-full ${isActive(to) ? 'text-ink after:w-full' : 'after:w-0'}`}>{t(`common.nav.${k}`)}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <LangSwitch className="hidden md:flex" />
            <span className="hidden md:block"><ThemeToggle /></span>
            <Btn className="whitespace-nowrap rounded-full px-4 py-2 max-md:hidden text-[12px] max-[399px]:gap-2 max-[399px]:px-3 sm:px-5"><span className="lg:hidden">{t('common.nav.bookShort')}</span><span className="hidden lg:inline">{t('common.nav.book')}</span></Btn>
            <button aria-label={t('common.nav.menu')} aria-expanded={menu} onClick={() => setMenu(!menu)} className="grid h-11 w-11 place-items-center md:hidden">
              <span className="relative block h-3 w-5"><i className={`absolute left-0 h-px w-5 bg-ink transition-transform duration-200 ${menu ? 'top-1.5 rotate-45' : 'top-0'}`} /><i className={`absolute left-0 h-px w-5 bg-ink transition-transform duration-200 ${menu ? 'top-1.5 -rotate-45' : 'top-3'}`} /></span>
            </button>
          </div>
        </div>
        <nav className={`grid border-t border-line transition-all duration-300 md:hidden ${menu ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] border-transparent'}`}>
          <div className="overflow-hidden">
            {NAV.map(([k, to]) => (
              <Link key={k} onClick={() => setMenu(false)} to={to} aria-current={isActive(to) ? 'page' : undefined} className={`block border-l-2 px-5 py-3 text-[14px] ${isActive(to) ? 'border-forest font-medium text-ink' : 'border-transparent text-muted hover:text-ink'}`}>{t(`common.nav.${k}`)}</Link>
            ))}
            <div className="border-t border-line px-5 py-4"><Btn className="w-full justify-center py-3 text-[14px]">{t('common.nav.book')}</Btn></div>
            <div className="flex items-center justify-between border-t border-line px-5 py-3">
              <LangSwitch className="text-[13px] [&_button]:min-h-11 [&_button]:px-3" />
              <ThemeToggle withLabel />
            </div>
          </div>
        </nav>
      </header>

  )
}
