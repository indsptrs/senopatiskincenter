import { useEffect, useState } from 'react'
import { Link } from '../../router'
import { ARTICLES, formatArticleDate, localizeArticle, type Article } from '../../data/articles'
import useLanguage from '../../i18n/useLanguage'
import { Arrow, Btn, Eyebrow, Reveal, Wrap } from '../ui'

/** Shared localization helpers for article UI. */
export function useArticleI18n() {
  const { lang, t } = useLanguage()
  const minRead = (a: Pick<Article, 'readingMinutes'>) => t('articles.minRead').replace('{n}', String(a.readingMinutes))
  return {
    lang, t,
    loc: (a: Article) => localizeArticle(a, lang),
    cat: (c: string) => t<Record<string, string>>('articles.categories')[c] ?? c,
    date: (a: Pick<Article, 'date'>) => formatArticleDate(a.date, lang),
    minRead,
    meta: (a: Pick<Article, 'date' | 'readingMinutes'>) => `${formatArticleDate(a.date, lang)} · ${minRead(a)}`,
  }
}

const Meta = ({ a, cat = true }: { a: Article; cat?: boolean }) => {
  const i = useArticleI18n()
  return (
  <p className="text-[10.5px] uppercase tracking-[.08em] text-muted">
    {cat && <><span className="text-ink/80">{i.cat(a.category)}</span><span className="mx-2">•</span></>}
    <span className="normal-case tracking-normal">{i.meta(a)}</span>
  </p>
  )
}

export function ArticleCard({ a }: { a: Article }) {
  const i = useArticleI18n(), l = i.loc(a)
  return (
    <Link to={`/artikel/${a.id}`} className="group flex flex-col rounded-lg border border-line bg-surface p-2.5 transition duration-200 hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_14px_30px_-22px_rgba(15,58,48,.4)]">
      <div className="aspect-[16/10] overflow-hidden rounded-md bg-mint"><img src={a.heroImage} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /></div>
      <div className="flex flex-1 flex-col px-1.5 pt-3.5 pb-1.5">
        <Meta a={a} />
        <h3 className="mt-2 font-serif text-[18px] leading-[1.2]">{l.title}</h3>
        <p className="mt-2 line-clamp-3 text-[14px] lg:text-[15px] leading-relaxed text-muted">{l.excerpt}</p>
        <span className="mt-auto flex items-center justify-between border-t border-line pt-3 mt-4 text-[12px] font-medium">{i.t('articles.read')}<Arrow className="transition-transform duration-200 group-hover:translate-x-1" /></span>
      </div>
    </Link>
  )
}

export function ArticleRow({ a, n }: { a: Article; n: number }) {
  const i = useArticleI18n(), l = i.loc(a)
  return (
    <Link to={`/artikel/${a.id}`} className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t border-line py-5 sm:grid-cols-[40px_120px_1fr_auto] sm:gap-6">
      <span className="hidden font-serif text-[15px] italic text-muted sm:block">{String(n).padStart(2, '0')}</span>
      <div className="h-16 w-20 overflow-hidden rounded-md bg-mint sm:h-20 sm:w-[120px]"><img src={a.heroImage} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" /></div>
      <div className="min-w-0">
        <Meta a={a} />
        <h3 className="mt-1.5 font-serif text-[17px] leading-[1.25] sm:text-[20px]">{l.title}</h3>
      </div>
      <span className="grid h-9 w-9 place-items-center rounded-full border border-line transition-colors duration-200 group-hover:border-forest group-hover:bg-forest group-hover:text-white"><Arrow className="transition-transform duration-200 group-hover:translate-x-0.5" /></span>
    </Link>
  )
}

export function FeaturedArticle({ a }: { a: Article }) {
  const i = useArticleI18n(), l = i.loc(a)
  return (
    <Link to={`/artikel/${a.id}`} className="group grid overflow-hidden rounded-xl border border-line bg-surface transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_50px_-34px_rgba(15,58,48,.5)] md:grid-cols-[1.25fr_1fr]">
      <div className="aspect-[16/10] overflow-hidden bg-mint md:aspect-auto md:min-h-[380px]"><img src={a.heroImage} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" /></div>
      <div className="flex flex-col p-6 sm:p-8 lg:p-10">
        <p className="text-[10.5px] font-semibold uppercase tracking-[.14em] text-forest">{i.t('articles.featured')}</p>
        <p className="mt-5 text-[10.5px] uppercase tracking-[.08em] text-muted">{i.cat(a.category)}</p>
        <h2 className="mt-2 font-serif text-[clamp(26px,3vw,36px)] leading-[1.08] tracking-[-.01em]">{l.title}</h2>
        <p className="mt-4 text-[14px] lg:text-[15px] leading-relaxed text-muted">{l.excerpt}</p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-8">
          <span className="text-[12px] text-muted">{i.meta(a)}</span>
          <span className="inline-flex items-center gap-2 text-[13px] font-medium">{i.t('articles.read')}<Arrow className="transition-transform duration-200 group-hover:translate-x-1" /></span>
        </div>
      </div>
    </Link>
  )
}

export function ReadingProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const on = () => { const h = document.documentElement; setP(Math.min(1, h.scrollTop / Math.max(1, h.scrollHeight - innerHeight))) }
    on(); addEventListener('scroll', on, { passive: true }); addEventListener('resize', on)
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on) }
  }, [])
  return <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-[2px]"><div data-progress className="h-full origin-left bg-forest transition-transform duration-100" style={{ transform: `scaleX(${p})` }} /></div>
}

export function ArticleTableOfContents({ items, active }: { items: { id: string; heading: string }[]; active: string }) {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const list = (
    <ol className="space-y-1">
      {items.map((s, i) => (
        <li key={s.id}>
          <a href={`#${s.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' }); setOpen(false) }}
            className={`flex gap-3 border-l py-1.5 pl-3 text-[12.5px] leading-snug transition-colors duration-200 ${active === s.id ? 'border-forest text-ink' : 'border-line text-muted hover:text-ink'}`}>
            <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span>{s.heading}
          </a>
        </li>
      ))}
    </ol>
  )
  return (
    <>
      <div className="mb-8 rounded-lg border border-line bg-surface lg:hidden">
        <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="flex w-full items-center justify-between px-4 py-3.5 text-[13px] font-medium">
          {t('articles.toc')}
          <svg viewBox="0 0 16 16" className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.6"><path d="m4 6 4 4 4-4" strokeLinecap="round" /></svg>
        </button>
        {open && <div className="fade-in px-4 pb-4">{list}</div>}
      </div>
      <nav aria-label={t('articles.tocLabel')} className="sticky top-24 hidden lg:block">
        <p className="mb-3 text-[10.5px] font-semibold uppercase tracking-[.12em] text-muted">{t('articles.toc')}</p>
        {list}
      </nav>
    </>
  )
}

export function ShareButtons({ title }: { title: string }) {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)
  const url = typeof location !== 'undefined' ? location.href : ''
  const cls = 'inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-3.5 text-[12px] transition-colors duration-200 hover:border-ink/30'
  return (
    <div className="flex flex-wrap gap-2">
      <a className={cls} target="_blank" rel="noopener noreferrer" href={`https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`}>WhatsApp</a>
      <button type="button" className={cls} onClick={() => { navigator.clipboard?.writeText(url).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1800) }}>{t(copied ? 'articles.copied' : 'articles.copy')}</button>
    </div>
  )
}

export function RelatedArticles({ ids }: { ids: string[] }) {
  const { t } = useLanguage()
  const list = ids.map((id) => ARTICLES.find((a) => a.id === id)!).filter(Boolean).slice(0, 3)
  return (
    <Reveal className="border-t border-line py-14 md:py-18">
      <Wrap>
        <Eyebrow>{t('articles.related')}</Eyebrow>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map((a) => <ArticleCard key={a.id} a={a} />)}</div>
      </Wrap>
    </Reveal>
  )
}

export function ArticleCTA({ title }: { title: string }) {
  const { t } = useLanguage()
  return (
    <Reveal className="pb-16">
      <Wrap>
        <div className="flex flex-col items-start justify-between gap-6 rounded-xl bg-mint px-6 py-9 sm:px-10 md:flex-row md:items-center">
          <div>
            <h2 className="max-w-[22ch] font-serif text-[clamp(24px,3vw,32px)] leading-[1.1]">{t('articles.ctaTitle')}</h2>
            <p className="mt-2 text-[14px] lg:text-[15px] text-muted">{t('articles.ctaBody')}</p>
          </div>
          <Btn ctx={{ articleTitle: title }} className="shrink-0 px-6 py-3">{t('articles.ctaButton')}</Btn>
        </div>
      </Wrap>
    </Reveal>
  )
}
