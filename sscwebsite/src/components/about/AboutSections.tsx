import { useEffect, useRef, useState, type ReactNode } from 'react'
import { DOCTORS } from '../../data/doctors'
import { Link } from '../../router'
import useLanguage from '../../i18n/useLanguage'
import { Btn, IMG, Leaf, Reveal, TextLink, U, Wrap } from '../ui'

const A = {
  hero: U('1789302557554-cd305f6b0ae8', 1000),
  lounge: U('1637412816281-f80ec9948fea', 1200),
  desk: U('1532204182725-d0f67855ac87', 800),
}

export const Label = ({ children, light = false }: { children: ReactNode; light?: boolean }) => (
  <p className={`flex items-center gap-3 text-[11px] font-medium uppercase tracking-[.14em] ${light ? 'text-white/60' : 'text-muted'}`}>
    {children}<span className={`h-px w-6 ${light ? 'bg-white/40' : 'bg-muted/50'}`} />
  </p>
)

export function AboutHero() {
  const { t } = useLanguage()
  return (
    <section className="relative overflow-hidden">
      <Leaf className="pointer-events-none absolute -left-16 bottom-0 w-40 -rotate-[15deg] text-leaf lg:w-56" />
      <Wrap className="relative grid gap-10 pb-14 pt-12 md:grid-cols-12 md:items-end md:gap-8 md:pb-20 md:pt-16">
        <div className="fade-in md:col-span-7">
          <Label>{t('about.hero.label')}</Label>
          <h1 className="mt-5 font-serif text-[clamp(38px,6.2vw,72px)] leading-[1] tracking-[-.015em]">
            {t('about.hero.titleA')}<em className="font-normal italic text-ink/75">{t('about.hero.titleEm')}</em>{t('about.hero.titleB')}
          </h1>
          <p className="mt-6 max-w-[50ch] text-[14.5px] leading-[1.75] text-muted">{t('about.hero.body')}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Btn>{t('common.nav.book')}</Btn>
            <TextLink href="/dokter">{t('about.hero.meet')}</TextLink>
          </div>
        </div>
        <figure className="fade-in md:col-span-5">
          <div className="relative aspect-[4/5] max-h-[520px] w-full overflow-hidden rounded-lg bg-mint md:ml-auto">
            <img src={A.hero} alt={t('about.hero.alt')} className="h-full w-full object-cover" data-parallax="inner" />
            <span className="absolute bottom-4 left-4 rounded-full bg-paper/95 px-3 py-1.5 text-[10.5px] font-medium uppercase tracking-[.08em] text-ink">{t('about.hero.badge')}</span>
          </div>
        </figure>
      </Wrap>
    </section>
  )
}

export function BrandStatement() {
  const { t } = useLanguage()
  return (
    <Reveal className="border-y border-line">
      <Wrap className="grid gap-8 py-16 md:grid-cols-12 md:py-24">
        <p className="font-serif text-[64px] leading-none text-ink/15 md:col-span-2" aria-hidden>“</p>
        <div className="md:col-span-10">
          <h2 className="max-w-[20ch] font-serif text-[clamp(30px,4.6vw,52px)] leading-[1.08] tracking-[-.01em]">{t('about.brand.title')}</h2>
          <div className="mt-8 grid gap-6 text-[14px] leading-[1.75] text-muted sm:grid-cols-2 md:max-w-[680px]">
            <p>{t('about.brand.p1')}</p>
            <p>{t('about.brand.p2')}</p>
          </div>
        </div>
      </Wrap>
    </Reveal>
  )
}

type Item = { title: string; text: string }

export function PrincipleCard({ n, title, text }: { n: number; title: string; text: string }) {
  return (
    <li className="border-t border-ink/80 pt-6">
      <p className="font-serif text-[56px] leading-none text-ink/20 tabular-nums">{String(n).padStart(2, '0')}</p>
      <h3 className="mt-5 text-[12px] font-medium uppercase tracking-[.16em] text-ink">{title}</h3>
      <p className="mt-3 max-w-[32ch] font-serif text-[20px] leading-[1.35] text-ink/85">{text}</p>
    </li>
  )
}

export function PhilosophySection() {
  const { t } = useLanguage()
  return (
    <Reveal className="py-16 md:py-24">
      <Wrap>
        <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-8">
          <div className="overflow-hidden rounded-lg md:col-span-5">
            <img src={IMG.clinic} alt={t('about.philosophy.alt')} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Label>{t('about.philosophy.label')}</Label>
            <h2 className="mt-4 font-serif text-[clamp(36px,5.4vw,64px)] leading-[1] tracking-[-.015em]">{t('about.philosophy.title')}</h2>
            <p className="mt-6 max-w-[44ch] text-[15px] leading-[1.75] text-muted">{t('about.philosophy.body')}</p>
          </div>
        </div>
        <ul className="mt-16 grid gap-10 sm:grid-cols-2 md:mt-24 lg:grid-cols-3 lg:gap-8">
          {t<Item[]>('about.principles').map((p, i) => <PrincipleCard key={p.title} n={i + 1} title={p.title} text={p.text} />)}
        </ul>
      </Wrap>
    </Reveal>
  )
}

export function SpaceStory() {
  const { t } = useLanguage()
  return (
    <Reveal className="bg-mint py-16 md:py-24">
      <Wrap>
        <div className="grid gap-6 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Label>{t('about.space.label')}</Label>
            <h2 className="mt-4 max-w-[16ch] font-serif text-[clamp(30px,4vw,44px)] leading-[1.08]">{t('about.space.title')}</h2>
          </div>
          <p className="max-w-[46ch] self-end text-[14px] leading-[1.75] text-muted md:col-span-5 md:col-start-8">{t('about.space.body')}</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-12 md:gap-8">
          <figure className="md:col-span-8">
            <div className="overflow-hidden rounded-lg"><img src={A.lounge} alt={t('about.space.loungeAlt')} loading="lazy" className="aspect-[16/11] w-full object-cover transition-transform duration-700 hover:scale-[1.03]" /></div>
            <figcaption className="mt-3 flex gap-3 text-[12.5px]"><span className="font-medium text-ink">{t('about.space.lounge')}</span><span className="text-muted">{t('about.space.loungeText')}</span></figcaption>
          </figure>
          <figure className="md:col-span-4 md:mt-28">
            <div className="overflow-hidden rounded-lg"><img src={A.desk} alt={t('about.space.deskAlt')} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.03]" /></div>
            <figcaption className="mt-3 text-[12.5px]"><span className="block font-medium text-ink">{t('about.space.desk')}</span><span className="text-muted">{t('about.space.deskText')}</span></figcaption>
          </figure>
        </div>
      </Wrap>
    </Reveal>
  )
}

export function PeopleSection() {
  const { t, pick } = useLanguage()
  const [lead, ...rest] = DOCTORS.slice(0, 3)
  return (
    <Reveal className="py-16 md:py-24">
      <Wrap className="grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <Link to={`/dokter/${lead.id}`} className="group block overflow-hidden rounded-lg bg-mint">
            <img src={lead.image} alt={lead.name} loading="lazy" className={`aspect-[4/5] w-full object-cover ${lead.imagePosition} transition-transform duration-700 group-hover:scale-[1.03]`} />
          </Link>
        </div>
        <div className="flex flex-col md:col-span-6 md:col-start-7">
          <Label>{t('about.people.label')}</Label>
          <h2 className="mt-4 font-serif text-[clamp(30px,4.4vw,48px)] leading-[1.06]">{t('about.people.title')}</h2>
          <blockquote className="mt-8 border-l border-ink/60 pl-5">
            <p className="font-serif text-[21px] italic leading-snug text-ink/85">{t('about.people.quote')}</p>
            <footer className="mt-2 text-[12.5px] text-muted">— {lead.name.split(',')[0]}</footer>
          </blockquote>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-auto md:grid-cols-1 lg:grid-cols-2 md:pt-10">
            {rest.map((d) => (
              <li key={d.id}>
                <Link to={`/dokter/${d.id}`} className="group flex items-center gap-4 rounded-lg border border-line bg-surface p-3 transition duration-200 hover:-translate-y-0.5 hover:border-ink/20">
                  <img src={d.image.replace('w=900', 'w=200')} alt="" loading="lazy" className={`h-16 w-16 shrink-0 rounded-md object-cover ${d.imagePosition}`} />
                  <span className="min-w-0"><span className="block font-serif text-[16px] leading-tight">{d.name.split(',')[0]}</span><span className="mt-1 block text-[12px] text-muted">{pick(d.specialtyL)}</span></span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6"><TextLink href="/dokter">{t('about.people.all')}</TextLink></div>
        </div>
      </Wrap>
    </Reveal>
  )
}

export function CareJourney() {
  const { t } = useLanguage()
  const STEPS = t<Item[]>('about.steps')
  const refs = useRef<(HTMLLIElement | null)[]>([])
  const [active, setActive] = useState(-1)
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) setActive((a) => Math.max(a, refs.current.indexOf(e.target as HTMLLIElement)))
    }), { rootMargin: '0px 0px -30% 0px', threshold: 0.6 })
    refs.current.forEach((r) => r && io.observe(r))
    return () => io.disconnect()
  }, [])
  const pct = `${((active + 1) / STEPS.length) * 100}%`
  return (
    <section className="border-t border-line py-16 md:py-24">
      <Wrap>
        <Label>{t('about.journey.label')}</Label>
        <h2 className="mt-4 max-w-[18ch] font-serif text-[clamp(30px,4.4vw,48px)] leading-[1.06]">{t('about.journey.title')}</h2>
        <div className="relative mt-14">
          {/* connecting line: vertical on mobile, horizontal on large screens */}
          <span className="absolute left-[15px] top-2 bottom-2 w-px bg-line lg:inset-x-0 lg:top-[15px] lg:bottom-auto lg:h-px lg:w-auto" />
          <span className="absolute left-[15px] top-2 w-px bg-forest transition-all duration-500 lg:hidden" style={{ height: `calc(${pct} - 16px)` }} />
          <span className="absolute left-0 top-[15px] hidden h-px bg-forest transition-all duration-500 lg:block" style={{ width: pct }} />
          <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
            {STEPS.map(({ title, text }, i) => {
              const on = i <= active
              return (
                <li key={i} ref={(el) => { refs.current[i] = el }} className={`grid grid-cols-[32px_1fr] gap-5 transition duration-500 lg:block ${on ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-40'}`}>
                  <span className={`grid h-8 w-8 place-items-center rounded-full border text-[11px] font-medium tabular-nums transition-colors duration-300 ${on ? 'border-forest bg-forest text-white' : 'border-line bg-paper text-muted'}`}>{String(i + 1).padStart(2, '0')}</span>
                  <div className="lg:mt-6">
                    <h3 className="font-serif text-[20px] leading-tight">{title}</h3>
                    <p className="mt-2 text-[14px] lg:text-[15px] leading-relaxed text-muted">{text}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </Wrap>
    </section>
  )
}

export function SenopatiStandard() {
  const { t } = useLanguage()
  return (
    <Reveal className="relative overflow-hidden bg-forest py-16 text-white md:py-24">
      <Leaf className="pointer-events-none absolute -right-12 -top-6 w-48 rotate-[25deg] text-white/[.06] md:w-72" />
      <Wrap className="relative grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <Label light>{t('about.standard.label')}</Label>
          <p className="mt-5 max-w-[22ch] font-serif text-[clamp(26px,3.4vw,38px)] leading-[1.15] text-white/95">{t('about.standard.body')}</p>
        </div>
        <ol className="md:col-span-6 md:col-start-7">
          {t<string[]>('about.standard.items').map((s, i) => (
            <li key={s} className="flex items-baseline gap-6 border-t border-white/15 py-5 last:border-b">
              <span className="text-[12px] tabular-nums text-white/50">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-serif text-[clamp(22px,2.6vw,30px)] leading-tight">{s}</span>
            </li>
          ))}
        </ol>
      </Wrap>
    </Reveal>
  )
}

export function AboutCTA() {
  const { t } = useLanguage()
  return (
    <Reveal className="py-16 md:py-24">
      <Wrap className="text-center">
        <Leaf className="mx-auto w-12 text-ink/30" />
        <h2 className="mx-auto mt-6 max-w-[18ch] font-serif text-[clamp(32px,4.6vw,52px)] leading-[1.05]">{t('about.cta.title')}</h2>
        <p className="mx-auto mt-5 max-w-[52ch] text-[14.5px] leading-[1.75] text-muted">{t('about.cta.body')}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
          <Btn>{t('common.nav.book')}</Btn>
          <TextLink href="/dokter">{t('about.cta.doctors')}</TextLink>
        </div>
      </Wrap>
    </Reveal>
  )
}
