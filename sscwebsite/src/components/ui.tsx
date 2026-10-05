import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from '../router'
import useLanguage from '../i18n/useLanguage'
import { openWhatsApp, buildWhatsAppUrl, type BookingContext } from '../utils/whatsapp'

export const U = (id: string, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`
export const IMG = {
  hero: U('1673865641073-4479f93a7776', 1100),
  clinic: U('1762625570087-6d98fca29531', 1000),
  d1: U('1659353888906-adb3e0041693'),
  d2: U('1612531385446-f7e6d131e1d0'),
  d3: U('1686737357932-ae1c50492a9e'),
  a1: U('1637851496670-2bdc6c548d27'),
  a2: U('1670201203208-055d6d79db4a'),
  a3: U('1786520990372-9173e3ffb8a4'),
}

export const Arrow = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 16 16" className={`h-3.5 w-3.5 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

/** Booking CTA: opens WhatsApp directly (no form). */
export function WaLink({ children, className = '', ctx = {} }: { children: ReactNode; className?: string; ctx?: BookingContext }) {
  const { lang } = useLanguage()
  return <a href={buildWhatsAppUrl({ lang, ...ctx })} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.preventDefault(); openWhatsApp(ctx) }} className={className}>{children}</a>
}

export function Btn({ children, light = false, className = '', to = '/buat-janji', ctx }: { children: ReactNode; light?: boolean; className?: string; to?: string; ctx?: BookingContext }) {
  const cls = `group inline-flex items-center gap-2.5 rounded-lg px-5 py-2.5 text-[13px] font-medium transition duration-200 ease-[var(--ease-standard)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[.98] active:duration-100 ${light ? 'border border-white/50 text-white hover:bg-white/10' : 'bg-forest text-white hover:shadow-[0_6px_18px_-8px_rgba(15,58,48,.6)]'} ${className}`
  const inner = <>{children}<Arrow className="transition-transform duration-200 group-hover:translate-x-0.5" /></>
  return to === '/buat-janji' ? <WaLink ctx={ctx} className={cls}>{inner}</WaLink> : <Link to={to} className={cls}>{inner}</Link>
}

export function TextLink({ children, href = '#' }: { children: ReactNode; href?: string }) {
  return (
    <Link to={href} className="group inline-flex items-center gap-2 text-[13px] font-medium text-ink max-md:-my-3 max-md:py-3">
      <span className="underline decoration-ink/40 underline-offset-4 group-hover:decoration-ink">{children}</span>
      <Arrow className="transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  )
}

export function Reveal({ children, className = '', id }: { children: ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current!
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect() } }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <section ref={ref} id={id} className={`reveal ${className}`}>{children}</section>
}

export const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p className="flex items-center gap-3 text-[11px] text-muted">{children}<span className="h-px w-6 bg-muted/50" /></p>
)

export function Leaf({ className = '', ...rest }: { className?: string; 'data-parallax'?: boolean | string }) {
  return (
    <svg {...rest} viewBox="0 0 200 260" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M100 255C100 180 95 110 70 20" />
      {[[80, 60, -1], [88, 100, 1], [92, 140, -1], [96, 180, 1], [98, 215, -1]].map(([x, y, s], i) => (
        <path key={i} d={`M${x} ${y}c${s * 40} -10 ${s * 70} -40 ${s * 80} -60c${s * -35} 0 ${s * -70} 25 ${s * -80} 60z`} fill="currentColor" fillOpacity=".5" />
      ))}
    </svg>
  )
}


export const Wrap = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-[1280px] px-5 md:px-8 lg:px-10 ${className}`}>{children}</div>
)

/** Lightweight scroll-linked parallax for [data-parallax] images (one rAF-throttled listener). */
export function useParallax(dep: unknown) {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || innerWidth < 768) return
    const els = [...document.querySelectorAll<HTMLElement>('[data-parallax]')]
    if (!els.length) return
    let raf = 0
    const run = () => {
      raf = 0
      const vh = innerHeight
      for (const el of els) {
        const r = el.getBoundingClientRect()
        if (r.bottom < 0 || r.top > vh) continue
        const p = (r.top + r.height / 2 - vh / 2) / vh // -1..1
        el.style.translate = `0 ${(Math.max(-1, Math.min(1, p)) * -8).toFixed(2)}px`
      }
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(run) }
    run(); addEventListener('scroll', on, { passive: true })
    return () => { removeEventListener('scroll', on); cancelAnimationFrame(raf) }
  }, [dep])
}

/** Native scroll-snap carousel (swipe/drag) with optional auto-advance that stops for good once the user interacts. */
export function useSnapCarousel(count: number, interval = 0) {
  const ref = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [held, setHeld] = useState(false)
  const step = () => {
    const el = ref.current
    const c = el?.children[0] as HTMLElement | undefined
    return el && c ? c.offsetWidth + (parseFloat(getComputedStyle(el).columnGap) || 0) : 1
  }
  const onScroll = () => { if (ref.current) setIndex(Math.min(count - 1, Math.round(ref.current.scrollLeft / step()))) }
  const go = (n: number) => ref.current?.scrollTo({ left: ((n + count) % count) * step(), behavior: 'smooth' })
  useEffect(() => {
    const el = ref.current
    if (!interval || held || !el || el.scrollWidth <= el.clientWidth + 4 || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setTimeout(() => go(index + 1), interval)
    return () => clearTimeout(id)
  }, [index, held, interval])
  const hold = () => setHeld(true)
  return { ref, index, go, onScroll, hold: { onPointerDown: hold, onTouchStart: hold, onFocus: hold, onWheel: hold } }
}

/** Small progress dots for mobile carousels (44px tap area, no arrows). */
export function CarouselDots({ count, index, go, label, className = '' }: { count: number; index: number; go: (i: number) => void; label: string; className?: string }) {
  return (
    <div className={`flex justify-center gap-1.5 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <button key={i} type="button" aria-label={`${label} ${i + 1}`} aria-current={index === i ? 'true' : undefined} onClick={() => go(i)} className="group grid h-11 min-w-6 place-items-center">
          <span className={`block h-1 rounded-full transition-[width,background-color] duration-[var(--motion-medium)] ease-[var(--ease-standard)] ${index === i ? 'w-6 bg-forest dark:bg-accent' : 'w-1.5 bg-ink/20'}`} />
        </button>
      ))}
    </div>
  )
}
