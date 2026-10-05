import type { Doctor } from '../../data/doctors'
import { getProfile } from '../../data/doctors'
import useLanguage from '../../i18n/useLanguage'
import { Link } from '../../router'
import { fill } from './PracticeSchedule'
import { Arrow, Leaf, Wrap } from '../ui'

export function BackLink() {
  const { t } = useLanguage()
  return (
    <Link to="/dokter" className="group inline-flex items-center gap-2 text-[13px] text-ink/80 hover:text-ink">
      <Arrow className="rotate-180 transition-transform duration-200 group-hover:-translate-x-1" />
      <span className="underline decoration-transparent underline-offset-4 group-hover:decoration-ink/40">{t('doctors.profile.back')}</span>
    </Link>
  )
}

export default function DoctorHero({ doctor: d, onSchedule }: { doctor: Doctor; onSchedule: () => void }) {
  const { t, pick } = useLanguage()
  const p = getProfile(d)
  const rows: [string, string][] = [
    [t('doctors.profile.expertise'), pick(d.expertiseL).join(' · ')],
    [t('doctors.profile.languages'), pick(p.languages).join(' · ')],
    [t('doctors.profile.location'), pick(p.location)],
  ]
  return (
    <section className="relative overflow-hidden">
      <Leaf className="pointer-events-none absolute -right-10 top-2 w-44 rotate-[20deg] text-leaf sm:w-64 lg:right-0 lg:w-80" />
      <Wrap className="relative grid items-center gap-8 py-10 md:grid-cols-[minmax(0,.85fr)_minmax(0,1fr)] md:gap-10 md:py-14 lg:gap-14">
        <div className="fade-in group relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-lg border border-line bg-mint shadow-[0_24px_48px_-36px_rgba(15,58,48,.5)] md:max-w-none">
          <img src={d.image.replace('w=900', 'w=1000')} alt={d.name} className={`h-full w-full object-cover ${d.imagePosition} transition-transform duration-700 group-hover:scale-[1.03]`} />
          <span className="absolute left-4 top-4 rounded-full bg-paper/95 px-3 py-1.5 text-[10.5px] font-medium uppercase tracking-[.08em] text-ink">{t<Record<string, string>>('doctors.badge')[d.category]}</span>
        </div>
        <div className="fade-in min-w-0">
          <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[.14em] text-muted">{t('doctors.profile.eyebrow')}<span className="h-px w-6 bg-muted/50" /></p>
          <h1 className="mt-4 font-serif text-[clamp(34px,5vw,54px)] leading-[1.02] tracking-[-.01em]">
            {d.name.split(',')[0]},<br />{d.name.split(',').slice(1).join(',').trim()}
          </h1>
          <p className="mt-3 text-[15px] text-ink/85">{fill(t('doctors.profile.specialist'), { s: pick(d.specialtyL) })}</p>
          <p className="mt-4 max-w-[52ch] text-[14px] leading-[1.7] text-muted">{pick(d.summaryL)} {t('doctors.profile.summaryTail')}</p>
          <dl className="mt-6 border-t border-line text-[13px]">
            {rows.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[120px_1fr] gap-3 border-b border-line py-3 sm:grid-cols-[140px_1fr]">
                <dt className="text-muted">{k}</dt><dd className="text-ink/85">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
            <button type="button" onClick={onSchedule} className="group inline-flex items-center gap-2.5 rounded-lg bg-forest px-6 py-3 text-[13px] font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_18px_-8px_rgba(15,58,48,.6)] active:translate-y-0">
              {t('doctors.profile.viewSchedule')}<Arrow className="rotate-90 transition-transform duration-200 group-hover:translate-y-0.5" />
            </button>
            <BackLink />
          </div>
        </div>
      </Wrap>
    </section>
  )
}
