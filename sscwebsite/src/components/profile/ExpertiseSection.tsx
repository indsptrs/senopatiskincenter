import type { ExpertiseIcon, ExpertiseItem } from '../../data/doctors'
import useLanguage from '../../i18n/useLanguage'
import { Wrap } from '../ui'

const PATHS: Record<ExpertiseIcon, string> = {
  face: 'M12 3.5c-3.6 0-6 2.9-6 6.9 0 4.4 2.7 8.1 6 8.1s6-3.7 6-8.1c0-4-2.4-6.9-6-6.9zM9.6 10.8h.01M14.4 10.8h.01M10 14.6c1.2.8 2.8.8 4 0',
  leaf: 'M5 19c0-8 5-13 14-14 0 9-5 14-12 14M5 19l7-7',
  drop: 'M12 3.5s-5 5.6-5 9.4a5 5 0 0010 0c0-3.8-5-9.4-5-9.4zM4 20.5h16',
  spark: 'M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.5 2.5M15.2 15.2l2.5 2.5M6.3 17.7l2.5-2.5M15.2 8.8l2.5-2.5',
  child: 'M12 4a3 3 0 110 6 3 3 0 010-6zM6.5 20c0-3.3 2.5-6 5.5-6s5.5 2.7 5.5 6',
  shield: 'M12 3.5l7 2.8v5.2c0 4.3-3 7.6-7 9-4-1.4-7-4.7-7-9V6.3zM9 12l2 2 4-4',
}

export default function ExpertiseSection({ items }: { items: ExpertiseItem[] }) {
  const { t, pick } = useLanguage()
  return (
    <section className="bg-mint py-14 md:py-18">
      <Wrap>
        <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[.14em] text-muted">{t('doctors.profile.areas')}<span className="h-px w-6 bg-muted/50" /></p>
        <h2 className="mt-3 font-serif text-[clamp(30px,4vw,42px)] leading-tight">{t('doctors.profile.areas')}</h2>
        <p className="mt-2 max-w-[46ch] text-[14px] leading-relaxed text-muted">{t('doctors.profile.areasBody')}</p>
        <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <li key={it.title.id} className={`flex gap-4 rounded-lg border border-white/70 bg-mint-2 p-5 transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_32px_-24px_rgba(15,58,48,.45)] ${i === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-paper text-ink">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d={PATHS[it.icon]} /></svg>
              </span>
              <div>
                <p className="text-[11px] font-medium tabular-nums text-muted">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-1 font-serif text-[21px] leading-tight">{pick(it.title)}</h3>
                <p className="mt-2 text-[14px] lg:text-[15px] leading-relaxed text-muted">{pick(it.text)}</p>
              </div>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  )
}
