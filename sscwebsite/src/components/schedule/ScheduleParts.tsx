import type { Doctor } from '../../data/doctors'
import { Link } from '../../router'
import { AvailabilityStatus } from '../DoctorCard'
import useLanguage from '../../i18n/useLanguage'
import { fill, useCalendar } from '../profile/PracticeSchedule'
import { Arrow } from '../ui'

export type Day = { k: string; dt: Date; count: number }

export function ScheduleDateSelector({ days, active, onSelect }: { days: Day[]; active: number; onSelect: (i: number) => void }) {
  const { t } = useLanguage()
  const cal = useCalendar()
  return (
    <div className="-mx-5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0" role="group" aria-label={t('doctors.schedule.pickDate')}>
      <div className="grid min-w-[560px] grid-cols-7 gap-2">
        {days.map((x, i) => {
          const on = i === active
          return (
            <button key={x.k} type="button" aria-pressed={on} onClick={() => onSelect(i)}
              className={`rounded-lg border px-2 py-3 text-center transition-colors duration-250 ${on ? 'border-forest bg-forest text-white' : 'border-line bg-surface text-ink hover:border-ink/30'}`}>
              <span className="block text-[11px] font-medium uppercase tracking-[.08em]">{cal.dayShort(x.k)}</span>
              <span className="mt-0.5 block text-[13px] tabular-nums">{cal.chip(x.dt)}</span>
              <span className={`mt-1.5 block text-[10.5px] ${on ? 'text-white/70' : 'text-muted'}`}>{x.count ? fill(t('doctors.schedule.doctorsCount'), { n: x.count }) : '—'}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function TimeSlotSelector({ slots, value, onChange }: { slots: string[]; value: string | null; onChange: (s: string) => void }) {
  const { t } = useLanguage()
  const cal = useCalendar()
  return (
    <div className="grid grid-cols-3 gap-2" role="group" aria-label={t('doctors.schedule.pickTime')}>
      {slots.map((s) => (
        <button key={s} type="button" aria-pressed={s === value} onClick={() => onChange(s)}
          className={`h-11 rounded-lg border text-[14px] tabular-nums transition-colors duration-200 ${s === value ? 'border-forest bg-forest text-white' : 'border-line bg-surface text-ink hover:border-ink/30'}`}>{cal.time(s)}</button>
      ))}
    </div>
  )
}

export function ScheduleRow({ doctor: d, selected, onSelect }: { doctor: Doctor; selected: boolean; onSelect: () => void }) {
  const { t, pick } = useLanguage()
  const cal = useCalendar()
  return (
    <li className={`fade-in grid grid-cols-[48px_1fr] items-center gap-x-4 gap-y-4 border-b border-line px-3 py-5 transition-colors duration-200 sm:grid-cols-[52px_1fr_auto] sm:px-4 ${selected ? 'rounded-lg bg-mint-2' : 'hover:bg-surface/70'}`}>
      <img src={d.image.replace('w=900', 'w=160')} alt="" className={`h-12 w-12 rounded-full bg-mint object-cover sm:h-13 sm:w-13 ${d.imagePosition}`} />
      <div className="min-w-0">
        <Link to={`/dokter/${d.id}`} className="font-serif text-[19px] leading-tight text-ink underline decoration-transparent underline-offset-4 transition-colors hover:decoration-ink/40">{d.name}</Link>
        <p className="mt-0.5 text-[14px] lg:text-[15px] text-muted">{pick(d.specialtyL)}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5">
          <p className="flex items-center gap-2 text-[14px] font-medium tabular-nums text-ink">
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-muted" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
            {cal.time(d.practiceHours)}
          </p>
          <span className="whitespace-nowrap"><AvailabilityStatus value={d.availability} /></span>
        </div>
      </div>
      <button type="button" aria-pressed={selected} onClick={onSelect}
        className={`group col-span-2 inline-flex h-11 items-center justify-center gap-2.5 whitespace-nowrap rounded-lg px-5 text-[13px] font-medium transition duration-200 hover:-translate-y-0.5 sm:col-span-1 ${selected ? 'bg-forest text-white' : 'border border-forest/80 text-ink hover:bg-forest hover:text-white'}`}>
        {t(selected ? 'doctors.schedule.selected' : 'doctors.schedule.book')}<Arrow className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </button>
    </li>
  )
}
