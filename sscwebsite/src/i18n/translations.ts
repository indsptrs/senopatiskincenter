import about from './dict/about'
import articles from './dict/articles'
import common from './dict/common'
import doctors from './dict/doctors'
import home from './dict/home'

export type Lang = 'id' | 'en'
export const LANGS: Lang[] = ['id', 'en']

/** Bilingual value used inside data files (doctors, articles). */
export type L<T = string> = { id: T; en: T }

// Each dictionary module exports { id, en } with identical shapes; namespaces are merged here.
const modules = { common, home, about, doctors, articles }
const build = (lang: Lang) => Object.fromEntries(Object.entries(modules).map(([ns, m]) => [ns, m[lang]]))
export const translations: Record<Lang, Record<string, unknown>> = { id: build('id'), en: build('en') }
