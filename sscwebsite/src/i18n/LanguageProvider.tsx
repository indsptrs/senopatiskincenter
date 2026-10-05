import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { KEY, LanguageContext, setCurrentLang, type LanguageCtx } from './context'
import { translations, type Lang } from './translations'

const read = (): Lang => { try { return localStorage.getItem(KEY) === 'en' ? 'en' : 'id' } catch { return 'id' } }

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(read)
  setCurrentLang(lang)
  useEffect(() => { document.documentElement.lang = lang }, [lang])
  const setLang = useCallback((l: Lang) => { setLangState(l); try { localStorage.setItem(KEY, l) } catch { /* ignore */ } }, [])
  const value = useMemo<LanguageCtx>(() => {
    const dict = translations[lang]
    const t = <T,>(key: string) => {
      const v = key.split('.').reduce<unknown>((o, k) => (o as Record<string, unknown> | undefined)?.[k], dict)
      if (v === undefined && import.meta.env.DEV) console.warn('[i18n] missing', key)
      return (v ?? key) as T
    }
    return { lang, setLang, t, pick: (v) => v[lang] }
  }, [lang, setLang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
