import { useMemo, useState } from 'react'
import { ArticleCard, ArticleRow, FeaturedArticle, useArticleI18n } from '../components/article/ArticleParts'
import { Eyebrow, Leaf, Wrap } from '../components/ui'
import { ARTICLE_CATEGORIES, ARTICLES, type ArticleCategoryFilter } from '../data/articles'
import { FilterPill, SearchInput } from './Doctors'

export default function Articles() {
  const i = useArticleI18n(), { t } = i
  const [q, setQ] = useState('')
  const [cat, setCat] = useState<ArticleCategoryFilter>('Semua')
  const featured = ARTICLES.find((a) => a.featured)!
  const browsing = !!q.trim() || cat !== 'Semua'
  const list = useMemo(() => {
    const t = q.trim().toLowerCase()
    return ARTICLES.filter((a) => (cat === 'Semua' || a.category === cat) && (!t || (({ title, excerpt }) => [title, i.cat(a.category), excerpt])(i.loc(a)).join(' ').toLowerCase().includes(t)))
  }, [q, cat, i.lang]) // eslint-disable-line react-hooks/exhaustive-deps
  const rest = browsing ? list : list.filter((a) => a !== featured)
  const grid = rest.slice(0, 6), rows = rest.slice(6)

  return (
    <>
      <section className="relative overflow-hidden">
        <Leaf className="pointer-events-none absolute -right-10 top-4 w-40 rotate-[20deg] text-leaf sm:w-60 lg:right-0 lg:w-72" />
        <Wrap className="fade-in relative pb-10 pt-12 md:pt-16">
          <Eyebrow>{t('articles.hero.eyebrow')}</Eyebrow>
          <h1 className="mt-4 max-w-[20ch] font-serif text-[clamp(34px,5vw,54px)] leading-[1.04] tracking-[-.01em]">{t('articles.hero.title')}</h1>
          <p className="mt-4 max-w-[56ch] text-[14.5px] leading-relaxed text-muted">{t('articles.hero.body')}</p>
        </Wrap>
      </section>

      <Wrap className="pb-16 md:pb-20">
        {!browsing && <div className="fade-in mb-12"><FeaturedArticle a={featured} /></div>}

        <SearchInput value={q} onChange={setQ} placeholder={t('articles.search')} />
        <div role="group" aria-label={t('articles.filterLabel')} className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          {ARTICLE_CATEGORIES.map((c) => <FilterPill key={c} active={cat === c} onClick={() => setCat(c)}>{i.cat(c)}</FilterPill>)}
        </div>
        <p className="mt-7 text-[13px] text-muted" aria-live="polite">{t('articles.count').replace('{n}', String(list.length))}</p>

        {list.length ? (
          <div key={cat + q} className="fade-in">
            <div className="mt-3 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{grid.map((a) => <ArticleCard key={a.id} a={a} />)}</div>
            {rows.length > 0 && (
              <div className="mt-14">
                <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-[.12em] text-muted">{t('articles.more')}</p>
                <div className="border-b border-line">{rows.map((a, i) => <ArticleRow key={a.id} a={a} n={i + 1} />)}</div>
              </div>
            )}
          </div>
        ) : (
          <div className="fade-in mt-3 rounded-lg border border-dashed border-line bg-surface/60 px-6 py-14 text-center">
            <p className="font-serif text-[22px]">{t('articles.empty')}</p>
            <button type="button" onClick={() => { setQ(''); setCat('Semua') }} className="mt-5 rounded-lg border border-line bg-surface px-5 py-2.5 text-[13px] font-medium hover:border-ink/30">{t('articles.reset')}</button>
          </div>
        )}
      </Wrap>
    </>
  )
}
