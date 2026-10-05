import { ARTICLES, articleText, formatArticleDate } from '../data/articles'
import { useEffect, useRef, useState } from 'react'
import { Link } from '../router'
import { Arrow, Btn, CarouselDots, Eyebrow, IMG, Leaf, Reveal, TextLink, U, Wrap, useSnapCarousel } from '../components/ui'
import { DOCTORS } from '../data/doctors'
import useLanguage from '../i18n/useLanguage'

// Homepage card order, sourced from the shared doctor data
const doctors = ['nadia-prameswari', 'michael-santoso', 'aurelia-tan'].map((id) => {
  const d = DOCTORS.find((x) => x.id === id)!
  return { id: d.id, name: d.name, img: d.image, pos: d.imagePosition, days: d.practiceDays as string[] }
})

type Row = { d: number; time: string; full?: boolean }
const schedule: Record<string, Row[]> = {
  Sen: [{ d: 0, time: '09.00 – 13.00' }, { d: 1, time: '13.00 – 17.00' }, { d: 2, time: '17.00 – 20.00', full: true }],
  Sel: [{ d: 1, time: '09.00 – 13.00' }, { d: 0, time: '14.00 – 18.00', full: true }],
  Rab: [{ d: 0, time: '09.00 – 13.00' }, { d: 2, time: '13.00 – 17.00' }, { d: 1, time: '17.00 – 20.00' }],
  Kam: [{ d: 1, time: '09.00 – 13.00', full: true }, { d: 2, time: '14.00 – 18.00' }],
  Jum: [{ d: 0, time: '09.00 – 13.00' }, { d: 2, time: '15.00 – 20.00' }],
  Sab: [{ d: 2, time: '09.00 – 12.00' }, { d: 1, time: '12.00 – 16.00', full: true }, { d: 0, time: '16.00 – 19.00' }],
}


const testimonialMeta = [
  { n: 'Budi Setiawan', img: IMG.d2 },
  { n: 'Maya Lestari', img: IMG.d1 },
  { n: 'Rani Anggraini', img: IMG.d3 },
  { n: 'Andi Pratama', img: IMG.d2 },
  { n: 'Sinta Wijaya', img: IMG.a1 },
  { n: 'Dewi Kartika', img: IMG.d3 },
  { n: 'Laras Putri', img: IMG.a3 },
  { n: 'Rizky Hidayat', img: IMG.d2 },
  { n: 'Nabila Hasan', img: IMG.a2 },
]



const HERO_IMGS = [IMG.clinic, U('1532204182725-d0f67855ac87', 900), U('1637412816281-f80ec9948fea', 900), U('1789302557554-cd305f6b0ae8', 900)]
const HERO_CAPS = ['home.about.imgAlt', 'about.space.desk', 'about.space.lounge', 'about.philosophy.alt'] as const

export default function Home() {
  const { t, lang } = useLanguage()
  // Same source as /artikel so titles match the detail pages in both languages.
  const articles = ARTICLES.slice(0, 3).map((a) => { const x = articleText(a, lang); return { cat: t(`articles.categories.${a.category}`), date: formatArticleDate(a.date, lang), title: x.title, ex: x.excerpt, img: a.heroImage } })
  const testimonials = t<string[]>('home.testimonials.items').map((q, i) => ({ q, ...testimonialMeta[i] }))
  const faqs = t<Array<{ q: string; a: string }>>('home.faq').map((f) => [f.q, f.a] as const)
  const features = t<string[][]>('home.features')
  const dayLong = (k: string) => t(`home.days.long.${k}`)
  const [day, setDay] = useState('Sen')
  const [page, setPage] = useState(0)
  const [paused, setPaused] = useState(false)
  const [autoplay, setAutoplay] = useState(false)
  useEffect(() => { setAutoplay(!matchMedia('(prefers-reduced-motion: reduce)').matches) }, [])
  const [open, setOpen] = useState(0)
  const pages = Math.ceil(testimonials.length / 3)
  const heroC = useSnapCarousel(HERO_IMGS.length, 5000)
  const docC = useSnapCarousel(3, 6000)
  const artC = useSnapCarousel(3)

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <Leaf data-parallax className="pointer-events-none absolute -left-10 top-6 hidden w-56 -rotate-12 text-leaf lg:block" />
        <Leaf data-parallax className="pointer-events-none absolute -right-6 top-10 hidden w-64 rotate-[20deg] text-leaf lg:block" />
        <Wrap className="relative grid items-center gap-10 pt-8 pb-10 md:grid-cols-[1fr_0.95fr] md:pt-5">
          <div className="fade-in md:pl-6">
            <Eyebrow>{t('home.hero.eyebrow')}</Eyebrow>
            <h1 className="mt-4 font-serif sm:mt-3 text-[clamp(2.4rem,4.6vw,3.25rem)] leading-[1.02] tracking-[-0.01em]">{t<string[]>('home.hero.title')[0]}<br />{t<string[]>('home.hero.title')[1]}<br />{t<string[]>('home.hero.title')[2]}</h1>
            <p className="mt-5 max-w-[340px] sm:mt-3 text-[14px] lg:text-[15px] leading-relaxed text-muted">{t('home.hero.body')}</p>
            <div className="mt-7 flex flex-col items-start gap-4 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
              <Btn>{t('common.nav.book')}</Btn>
              <TextLink href="#jadwal">{t('home.hero.schedule')}</TextLink>
            </div>
          </div>
          <div className="img-reveal relative hidden [animation-delay:200ms] sm:block" data-parallax>
            <img src={IMG.hero} alt={t('home.hero.imgAlt')} className="aspect-[4/2.85] w-full rounded-[28px] rounded-tl-[90px] object-cover" />
            <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-surface/95 px-3 py-1 text-[10.5px] text-muted"><i className="h-2 w-2 rounded-full bg-emerald-500" />{t('home.hero.available')}</span>
          </div>
          {/* Mobile: swipeable hero imagery */}
          <div className="img-reveal [animation-delay:200ms] sm:hidden">
            <div className="relative overflow-hidden rounded-[24px] rounded-tl-[64px]">
              <div ref={heroC.ref} onScroll={heroC.onScroll} {...heroC.hold} className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]">
                {HERO_IMGS.map((src, i) => (
                  <figure key={src} className="relative w-full shrink-0 snap-start">
                    <img src={src} alt={t(HERO_CAPS[i])} draggable={false} className={`aspect-[4/3.2] w-full object-cover transition-opacity duration-500 ${heroC.index === i ? 'opacity-100' : 'opacity-60'}`} />
                    <figcaption className="absolute bottom-3 left-4 rounded-full bg-surface/90 px-3 py-1 text-[12px] text-muted">{t(HERO_CAPS[i])}</figcaption>
                  </figure>
                ))}
              </div>
              <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-surface/95 px-3 py-1 text-[10.5px] text-muted"><i className="h-2 w-2 rounded-full bg-emerald-500" />{t('home.hero.available')}</span>
            </div>
            <CarouselDots count={HERO_IMGS.length} index={heroC.index} go={heroC.go} label={t('home.testimonials.page')} className="mt-1" />
          </div>
        </Wrap>

        {/* Feature strip */}
        <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
          <div className="flex snap-x snap-mandatory overflow-x-auto rounded-2xl bg-mint py-1 [scrollbar-width:none] sm:grid sm:grid-cols-3 sm:px-6 sm:py-2">
            {[
              [features[0][0], features[0][1], <path key="a" d="M6 3v6a4 4 0 0 0 8 0V3M10 13v3a4 4 0 0 0 8 0v-2M18 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />],
              [features[1][0], features[1][1], <path key="b" d="M6 3h9l4 4v14H6zM9 11h7M9 15h7M9 7h3" />],
              [features[2][0], features[2][1], <path key="c" d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />],
            ].map(([a, b, icon], i) => (
              <div key={i} className={`flex w-[78%] shrink-0 snap-start items-center gap-4 px-5 py-4 sm:w-auto sm:justify-center sm:gap-5 sm:px-0 ${i ? 'border-l border-ink/10' : ''}`}>
                <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
                <p className="text-[13px] leading-snug text-muted">{a}<br />{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <Reveal id="tentang">
        <Wrap className="grid items-center gap-8 py-14 lg:py-20 md:grid-cols-[1fr_1fr] md:gap-12">
          <img src={IMG.clinic} alt={t('home.about.imgAlt')} className="aspect-[1.85/1] w-full rounded-lg object-cover" data-parallax />
          <div>
            <Eyebrow>{t('home.about.eyebrow')}</Eyebrow>
            <h2 className="mt-3 font-serif text-[clamp(1.8rem,3vw,2.15rem)] leading-[1.1]">{t<string[]>('home.about.title')[0]}<br />{t<string[]>('home.about.title')[1]}</h2>
            <p className="mt-3 max-w-[400px] text-[14px] lg:text-[15px] leading-relaxed text-muted">{t('home.about.body')}</p>
            <div className="mt-4"><TextLink href="/tentang-kami">{t('home.about.more')}</TextLink></div>
          </div>
        </Wrap>
      </Reveal>

      {/* Doctors */}
      <Reveal id="dokter">
        <Wrap className="pb-14 lg:pb-20">
          <div className="mb-4 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-0">
            <h2 className="font-serif text-[clamp(1.6rem,2.6vw,1.9rem)]">{t('home.doctors.title')}</h2>
            <TextLink href="/dokter">{t('home.doctors.all')}</TextLink>
          </div>
          <div ref={docC.ref} onScroll={docC.onScroll} {...docC.hold} className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
            {doctors.map((d, di) => (
              <Link key={d.name} to={`/dokter/${d.id}`} className={`group w-full shrink-0 snap-start overflow-hidden max-sm:transition-opacity ${docC.index === di ? '' : 'max-sm:opacity-60'} rounded-md border border-line bg-surface transition duration-500 sm:w-auto hover:-translate-y-1 hover:shadow-[0_14px_30px_-20px_rgba(15,58,48,.35)]`}>
                <div className="aspect-[1.9/1] overflow-hidden bg-mint"><img src={d.img} alt={d.name} className={`h-full w-full object-cover ${d.pos} transition-transform duration-500 group-hover:scale-[1.04]`} /></div>
                <div className="px-4 py-3.5">
                  <p className="text-[14px] lg:text-[15px] font-semibold">{d.name}</p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-muted">{t('home.doctors.specialty')}<br />{t('home.doctors.practice')} {d.days.map(dayLong).join(', ')}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-[12px] font-medium"><span className="underline underline-offset-4">{t('home.doctors.profile')}</span><Arrow className="transition-transform duration-200 group-hover:translate-x-1" /></span>
                </div>
              </Link>
            ))}
          </div>
          <CarouselDots count={doctors.length} index={docC.index} go={docC.go} label={t('home.testimonials.page')} className="mt-1 sm:hidden" />
        </Wrap>
      </Reveal>

      {/* Schedule */}
      <Reveal id="jadwal">
        <Wrap className="pb-16 lg:pb-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-[clamp(1.6rem,2.6vw,1.9rem)]">{t('home.schedule.title')}</h2>
              <p className="text-[13px] text-muted">{t('home.schedule.sub')}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.keys(schedule).map((k) => (
                <button key={k} onClick={() => setDay(k)} className={`h-11 w-12 rounded-md border text-[11.5px] md:h-8 transition-colors duration-200 ${day === k ? 'border-forest bg-forest text-white' : 'border-line bg-surface text-muted hover:border-ink/30 hover:text-ink'}`}>{t(`home.days.short.${k}`)}</button>
              ))}
            </div>
          </div>
          <div className="mt-5 hidden grid-cols-[1.7fr_1fr_1fr_24px] border-b border-line pb-2 text-[10.5px] text-muted sm:grid"><span>{t('home.schedule.doctor')}</span><span>{t('home.schedule.hours')}</span><span>{t('home.schedule.status')}</span></div>
          <div key={day} className="fade-in">
            {schedule[day].map((r) => {
              const d = doctors[r.d]
              return (
                <Link to={`/dokter/${d.id}`} key={d.name + r.time} className="group grid grid-cols-[1fr_24px] items-center gap-y-1 border-b border-line py-3 sm:grid-cols-[1.7fr_1fr_1fr_24px]">
                  <div className="flex items-center gap-5">
                    <img src={d.img} alt="" className={`h-10 w-10 rounded-full object-cover ${d.pos}`} />
                    <div><p className="text-[14px] lg:text-[15px] font-semibold">{d.name}</p><p className="text-[11px] text-muted">{t('home.doctors.specialty')}</p></div>
                  </div>
                  <span className="col-start-1 pl-[60px] text-[12px] text-muted sm:col-start-auto sm:pl-0">{r.time}</span>
                  <span className="col-start-1 flex items-center gap-2 pl-[60px] text-[11.5px] text-muted sm:col-start-auto sm:pl-0"><i className={`h-2.5 w-2.5 rounded-full ${r.full ? 'bg-amber-400' : 'bg-emerald-500'}`} />{r.full ? t('home.schedule.full') : t('home.schedule.available')}</span>
                  <Arrow className="col-start-2 row-span-3 row-start-1 transition-transform duration-200 group-hover:translate-x-1 sm:col-start-auto sm:row-span-1 sm:row-start-auto" />
                </Link>
              )
            })}
          </div>
          <div className="mt-8 text-center"><Btn to="/jadwal-praktik">{t('home.schedule.all')}</Btn></div>
        </Wrap>
      </Reveal>

      {/* Articles */}
      <section id="artikel" className="bg-mint-2">
        <Reveal>
          <Wrap className="py-14 lg:py-20">
            <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
              <div>
                <h2 className="font-serif text-[clamp(1.6rem,2.6vw,1.9rem)]">{t('home.articles.title')}</h2>
                <p className="text-[13px] text-muted">{t('home.articles.sub')}</p>
              </div>
              <TextLink href="/artikel">{t('home.articles.all')}</TextLink>
            </div>
            <div ref={artC.ref} onScroll={artC.onScroll} className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
              {articles.map((a, i) => (
                <Link key={a.title} to={`/artikel/${i + 1}`} className="group flex w-full shrink-0 snap-start flex-col rounded-lg border border-line bg-surface p-2.5 transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_-22px_rgba(15,58,48,.4)] sm:w-auto">
                  <div className="aspect-[16/9] overflow-hidden rounded-md"><img src={a.img} alt="" className="h-full w-full object-cover object-[50%_30%] transition-transform duration-500 group-hover:scale-[1.03]" /></div>
                  <div className="flex flex-1 flex-col px-1.5 pt-3.5 pb-1.5">
                    <p className="text-[10px] uppercase tracking-wide text-muted">{a.cat} <span className="mx-1.5">•</span> <span className="normal-case">{a.date}</span></p>
                    <h3 className="mt-1.5 font-serif text-[17px] leading-[1.2]">{a.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{a.ex}</p>
                    <span className="mt-auto flex items-center justify-between border-t border-line pt-3 mt-4 text-[12px] font-medium">{t('home.articles.read')}<Arrow className="transition-transform duration-200 group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              ))}
            </div>
            <CarouselDots count={articles.length} index={artC.index} go={artC.go} label={t('home.articles.next')} className="mt-2 sm:hidden" />
          </Wrap>
        </Reveal>
      </section>

      {/* Testimonials */}
      <Reveal>
        <Wrap className="py-14 lg:py-20">
          <h2 className="mb-4 font-serif text-[clamp(1.6rem,2.6vw,1.9rem)]">{t('home.testimonials.title')}</h2>
          <div className="relative max-sm:hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} onTouchStart={() => setPaused(true)}>
            <div key={page} className="fade-in grid gap-4 sm:grid-cols-3">
              {testimonials.slice(page * 3, page * 3 + 3).map((tm, i) => (
                <figure key={tm.n} className={`rounded-md border border-line px-5 py-4 ${i === 1 ? 'bg-mint' : 'bg-surface'}`}>
                  <img src={tm.img} alt="" className="h-9 w-9 rounded-full object-cover object-top" />
                  <blockquote className="mt-3 text-[13px] leading-relaxed text-muted">“{tm.q}”</blockquote>
                  <figcaption className="mt-4 text-[12px] font-semibold">{tm.n}</figcaption>
                </figure>
              ))}
            </div>
          </div>
          <MobileTestimonials items={testimonials} label={t('home.testimonials.page')} />
          <div className="mt-2 flex justify-center gap-2.5 max-sm:hidden">
            {Array.from({ length: pages }).map((_, i) => (
              <button key={i} aria-label={`${t('home.testimonials.page')} ${i + 1}`} aria-current={page === i ? 'true' : undefined} onClick={() => { setPage(i); setPaused(true) }} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} className="group grid h-11 place-items-center"><span className={`relative block h-1 overflow-hidden rounded-full bg-line transition-[width] duration-[var(--motion-medium)] ease-[var(--ease-standard)] ${page === i ? 'w-10' : 'w-4 group-hover:bg-muted/40'}`}>{page === i && <span key={page} className={`absolute inset-y-0 left-0 bg-forest ${autoplay ? 'tm-progress' : 'w-full'}`} style={{ animationPlayState: paused ? 'paused' : 'running' }} onAnimationEnd={() => setPage((page + 1) % pages)} />}</span></button>
            ))}
          </div>
        </Wrap>
      </Reveal>

      {/* FAQ */}
      <Reveal>
        <Wrap className="grid gap-10 pb-14 lg:pb-20 md:grid-cols-[0.8fr_1.2fr]">
          <div className="md:border-r md:border-line md:pr-8">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-2 font-serif text-[clamp(1.8rem,3vw,2.15rem)] leading-[1.1]">{t<string[]>('home.faqSection.title')[0]}<br />{t<string[]>('home.faqSection.title')[1]}</h2>
            <p className="mt-5 max-w-[290px] text-[14px] lg:text-[15px] leading-relaxed text-muted">{t('home.faqSection.body')}</p>
            <div className="mt-4"><TextLink href="/faq">{t('home.faqSection.all')}</TextLink></div>
          </div>
          <div className="space-y-2.5">
            {faqs.map(([q, a], i) => {
              const on = open === i
              return (
                <div key={q} className={`rounded-lg border transition-colors duration-200 ${on ? 'border-ink/20 bg-surface' : 'border-line bg-paper hover:border-ink/20'}`}>
                  <button aria-expanded={on} aria-controls={`faq-${i}`} onClick={() => setOpen(on ? -1 : i)} className="flex min-h-[56px] w-full items-center gap-5 px-5 py-3.5 text-left">
                    <span className="w-6 shrink-0 font-serif text-[15px]">0{i + 1}</span>
                    <span className={`flex-1 text-[13px] leading-snug ${on ? 'font-semibold text-ink' : 'text-ink/80'}`}>{q}</span>
                    <span className={`relative grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-colors duration-200 ${on ? 'border-forest bg-forest text-white' : 'border-line'}`}>
                      <i className="absolute h-px w-2.5 bg-current" /><i className={`absolute h-2.5 w-px bg-current transition-transform duration-300 ${on ? 'scale-y-0' : ''}`} />
                    </span>
                  </button>
                  <div id={`faq-${i}`} className={`grid transition-all duration-300 ease-out ${on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <p className="overflow-hidden text-[14px] lg:text-[15px] leading-relaxed text-muted"><span className="block pb-5 pl-[68px] pr-14">{a}</span></p>
                  </div>
                </div>
              )
            })}
          </div>
        </Wrap>
      </Reveal>


    </>
  )
}

function MobileTestimonials({ items, label }: { items: { n: string; q: string; img: string }[]; label: string }) {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const [held, setHeld] = useState(false)
  const x0 = useRef(0)
  const resume = useRef<ReturnType<typeof setTimeout>>(undefined)
  const n = items.length
  const go = (k: number, d = 1) => { setDir(d); setI((k + n) % n) }
  const hold = () => { setHeld(true); clearTimeout(resume.current) }
  const release = () => { clearTimeout(resume.current); resume.current = setTimeout(() => setHeld(false), 4000) }
  useEffect(() => () => clearTimeout(resume.current), [])
  const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
  const tm = items[i]
  const pad = (v: number) => String(v).padStart(2, '0')
  return (
    <div className="sm:hidden" onFocus={hold} onBlur={release}
      onTouchStart={(e) => { hold(); x0.current = e.touches[0].clientX }}
      onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - x0.current; if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1); release() }}>
      <div className="overflow-hidden" aria-live="polite">
        <figure key={i} className={`tm-slide rounded-md border border-line bg-surface px-5 py-4 ${dir < 0 ? 'tm-slide-back' : ''}`}>
          <img src={tm.img} alt="" className="h-9 w-9 rounded-full object-cover object-top" />
          <blockquote className="mt-3 text-[14px] leading-relaxed text-muted">“{tm.q}”</blockquote>
          <figcaption className="mt-4 text-[13px] font-semibold">{tm.n}</figcaption>
        </figure>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <span className="font-mono text-[12px] tabular-nums text-muted" aria-label={`${label} ${i + 1} / ${n}`}>{pad(i + 1)} / {pad(n)}</span>
        <span className="relative h-px flex-1 overflow-hidden bg-ink/15 dark:bg-paper/20">
          {!reduce && <span key={`${i}-${held}`} className={`tm-progress tm-progress-5 absolute inset-y-0 left-0 bg-forest dark:bg-accent ${held ? '[animation-play-state:paused]' : ''}`} onAnimationEnd={() => go(i + 1)} />}
        </span>
      </div>
    </div>
  )
}
