import { createContext } from 'react'
import type { L, Lang } from './translations'

// Kept in its own module so hot reloads of the provider don't recreate the context.
export const KEY = 'senopati-language'
let current: Lang = 'id'
export const setCurrentLang = (l: Lang) => { current = l }
/** Current language for non-React code (e.g. WhatsApp message builder). */
export const getLang = () => current

export type LanguageCtx = {
  lang: Lang
  setLang: (l: Lang) => void
  /** Dot-path lookup, e.g. t('common.nav.doctors'). Returns strings, arrays or objects. */
  t: <T = string>(key: string) => T
  /** Pick the active language from a bilingual data value. */
  pick: <T>(v: L<T>) => T
}

export const LanguageContext = createContext<LanguageCtx | null>(null)

