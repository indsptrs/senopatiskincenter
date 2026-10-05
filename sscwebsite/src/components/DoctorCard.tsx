import type { Availability, Doctor } from '../data/doctors'
import useLanguage from '../i18n/useLanguage'
import { Link } from '../router'
import { fill, useCalendar } from './profile/PracticeSchedule'
import { Arrow } from './ui'

export function AvailabilityStatus({ value }: { value: Availability }) {
  const { t } = useLanguage()
  return (
    <span className="inline-flex items-center gap-1.5 text-[11.5px] text-muted">
      <i className={`h-2 w-2 rounded-full ${value === 'Hampir Penuh' ? 'bg-amber-400' : 'bg-emerald-500'}`} />
      {t<Record<string, string>>('doctors.availability')[value]}
    </span>
  )
}

export default function DoctorCard({ doctor: d }: { doctor: Doctor }) {
  const { t, pick } = useLanguage()
  const cal = useCalendar()
  return (
    <Link
      to={`/dokter/${d.id}`}
      aria-label={fill(t('doctors.list.viewProfileAria'), { name: d.name })}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface p-2.5 transition duration-200 hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_16px_32px_-24px_rgba(15,58,48,.45)]"
    >
      <div className="relative aspect-[4/3.6] w-full shrink-0 overflow-hidden rounded-md bg-mint">
        <img src={d.image} alt={d.name} loading="lazy" className={`h-full w-full object-cover ${d.imagePosition} transition-transform duration-500 group-hover:scale-[1.03]`} />
        <span className="absolute left-3 top-3 rounded-full bg-paper/95 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[.08em] text-ink">{t<Record<string, string>>('doctors.categories')[d.category]}</span>
      </div>
      <div className="flex flex-1 flex-col px-2.5 pt-4 pb-2">
        <h3 className="line-clamp-2 min-h-[2.2em] font-serif text-[22px] leading-[1.1]">{d.name}</h3>
        <p className="mt-1.5 text-[14px] lg:text-[15px] font-medium text-ink/80">{pick(d.specialtyL)}</p>
        <p className="mt-1.5 truncate text-[13px] text-muted">{pick(d.expertiseL).join(' · ')}</p>
        <p className="mt-3 line-clamp-3 mb-1 min-h-[4.875em] text-[14px] lg:text-[15px] leading-[1.625] text-muted">{pick(d.summaryL)}</p>
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-3.5">
          <div className="space-y-1.5 text-[12px] text-ink/80">
            <p className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-muted" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M9 3v4M15 3v4" /></svg>
              {d.practiceDays.map(cal.dayShort).join(' · ')}
            </p>
            <p className="flex items-center gap-2 tabular-nums">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-muted" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
              {cal.time(d.practiceHours)}
            </p>
          </div>
          <span className="shrink-0 whitespace-nowrap"><AvailabilityStatus value={d.availability} /></span>
        </div>
        <span className="mt-4 flex items-center justify-center gap-2.5 rounded-lg bg-forest px-5 py-3 text-[13px] font-medium text-white transition-shadow duration-200 group-hover:shadow-[0_6px_18px_-8px_rgba(15,58,48,.6)]">
          {t('doctors.list.viewProfile')}<Arrow className="transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
