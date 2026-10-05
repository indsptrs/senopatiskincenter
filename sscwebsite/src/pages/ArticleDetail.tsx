import { useEffect, useMemo, useState } from 'react'
import { ArticleCTA, ArticleTableOfContents, ReadingProgress, RelatedArticles, ShareButtons, useArticleI18n } from '../components/article/ArticleParts'
import { Btn, Wrap } from '../components/ui'
import { Link } from '../router'
import { getArticle } from '../data/articles'

export default function ArticleDetail({ id }: { id: string }) {
  const i = useArticleI18n(), { t } = i
  const raw = getArticle(id)
  // Localized view; section ids are identical across languages, so the observer below only re-binds per article.
  const a = useMemo(() => (raw ? i.loc(raw) : undefined), [raw, i.lang]) // eslint-disable-line react-hooks/exhaustive-deps
  const [active, setActive] = useState(a?.content[0].id ?? '')
  useEffect(() => {
    if (!a) return
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-20% 0px -70% 0px' })
    a.content.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [a])

  if (!a) return (
    <Wrap className="py-24 sm:py-32">
      <h1 className="font-serif text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.05]">{t('articles.notFound')}</h1>
      <Btn to="/artikel" className="mt-8">{t('articles.back')}</Btn>
    </Wrap>
  )

  return (
    <>
      <ReadingProgress />
      <Wrap className="fade-in pt-10 md:pt-14">
        <Link to="/artikel" className="text-[13px] text-ink/70 hover:text-ink">{t('articles.all')}</Link>
        <div className="mx-auto mt-8 max-w-[760px] text-center">
          <p className="text-[10.5px] font-semibold uppercase tracking-[.14em] text-forest">{i.cat(a.category)}</p>
          <h1 className="mt-4 font-serif text-[clamp(32px,5vw,52px)] leading-[1.05] tracking-[-.01em]">{a.title}</h1>
          <p className="mx-auto mt-5 max-w-[60ch] text-[15px] leading-relaxed text-muted">{a.excerpt}</p>
          <p className="mt-5 text-[13px] text-muted">{i.meta(a)}</p>
        </div>
        <div className="img-reveal mt-10 aspect-[16/9] overflow-hidden rounded-xl bg-mint md:aspect-[21/9]"><img src={a.heroImage} alt="" className="h-full w-full object-cover" data-parallax="inner" /></div>
      </Wrap>

      <Wrap className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[160px_minmax(0,680px)_200px] lg:justify-between">
          <aside className="order-2 lg:order-none">
            <div className="lg:sticky lg:top-24">
              <p className="text-[10.5px] font-semibold uppercase tracking-[.12em] text-muted">{t('articles.share')}</p>
              <div className="mt-3"><ShareButtons title={a.title} /></div>
              <p className="mt-6 hidden text-[13px] leading-relaxed text-muted lg:block">{i.cat(a.category)}<br />{i.date(a)}<br />{i.minRead(a)}</p>
            </div>
          </aside>
          <article className="min-w-0">
            <div className="lg:hidden"><ArticleTableOfContents items={a.content} active={active} /></div>
            {a.content.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-24 [&+&]:mt-12">
                <h2 className="font-serif text-[clamp(24px,2.6vw,30px)] leading-[1.15]">{s.heading}</h2>
                {s.paragraphs.map((p, j) => <p key={j} className={`mt-4 text-[15.5px] leading-[1.8] text-ink/85 ${i === 0 && j === 0 ? 'first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-[56px] first-letter:leading-[.9]' : ''}`}>{p}</p>)}
                {s.list && <ul className="mt-5 space-y-2.5">{s.list.map((l) => <li key={l} className="flex gap-3 text-[15px] leading-relaxed text-ink/85"><span className="mt-[11px] h-px w-4 shrink-0 bg-forest" />{l}</li>)}</ul>}
                {s.quote && <blockquote className="my-10 border-l-2 border-forest pl-6 font-serif text-[clamp(22px,2.6vw,28px)] italic leading-[1.3] text-forest">“{s.quote}”</blockquote>}
                {s.image && <figure className="mt-8"><div className="aspect-[3/2] overflow-hidden rounded-lg bg-mint"><img src={s.image.src} alt="" loading="lazy" className="h-full w-full object-cover" /></div><figcaption className="mt-3 text-[12px] text-muted">{s.image.caption}</figcaption></figure>}
              </section>
            ))}
            <p className="mt-12 border-t border-line pt-5 text-[13px] leading-relaxed text-muted">{t('articles.disclaimer')}</p>
          </article>
          <div className="hidden lg:block"><ArticleTableOfContents items={a.content} active={active} /></div>
        </div>
      </Wrap>

      <RelatedArticles ids={a.relatedArticles} />
      <ArticleCTA title={a.title} />
    </>
  )
}
