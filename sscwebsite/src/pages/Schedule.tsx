import { useMemo, useState } from 'react'
import { openWhatsApp } from '../utils/whatsapp'
import { AppointmentSummary, DAYS, START, fill, slotsFor, useCalendar } from '../components/profile/PracticeSchedule'
import { ScheduleDateSelector, ScheduleRow, TimeSlotSelector, type Day } from '../components/schedule/ScheduleParts'
import { Arrow, Eyebrow, Leaf, Wrap } from '../components/ui'
import { CATEGORIES, DOCTORS } from '../data/doctors'
import useLanguage from '../i18n/useLanguage'
import { FilterPill, SearchInput } from './Doctors'

const WEEK = [...DAYS, 'Min']
const SPECIALTIES = [...new Map(DOCTORS.map((d) => [d.specialty, d.specialtyL])).entries()]
const MAX_WEEK = 3 // prototype range: four sample weeks

export default function Schedule() {
  const { t: tr, pick } = useLanguage()
  const cal = useCalendar()
  const catLabel = tr<Record<string, string>>('doctors.categories')
  const pre = DOCTORS.find((d) => d.id === new URLSearchParams(location.search).get('doctor'))
  const [q, setQ] = useState(pre ? pre.name.replace(/^dr\.\s*/, '').split(',')[0] : '')
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>('Semua')
  const [spec, setSpec] = useState('')
  const [onlyOpen, setOnlyOpen] = useState(false)
  const [week, setWeek] = useState(0)
  const [day, setDay] = useState(pre ? Math.max(0, WEEK.indexOf(pre.practiceDays[0])) : 0)
  const [docId, setDocId] = useState<string | null>(pre?.id ?? null)
  const [time, setTime] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    return DOCTORS.filter((d) => (cat === 'Semua' || d.focus.includes(cat)) && (!spec || d.specialty === spec) && (!onlyOpen || d.availability === 'Tersedia')
      && (!t || [d.name, pick(d.specialtyL), ...pick(d.expertiseL)].join(' ').toLowerCase().includes(t)))
  }, [q, cat, spec, onlyOpen, pick])

  const days: Day[] = WEEK.map((k, i) => {
    const dt = new Date(START); dt.setDate(START.getDate() + week * 7 + i)
    return { k, dt, count: filtered.filter((d) => d.practiceDays.includes(k)).length }
  })
  const cur = days[day]
  const list = filtered.filter((d) => d.practiceDays.includes(cur.k))
  const doc = list.find((d) => d.id === docId) ?? null
  const slots = doc ? slotsFor(doc.practiceHours, cur.dt) : []
  const t = time && slots.includes(time) ? time : null
  const label = cal.date(cur.k, cur.dt)
  const end = days[6].dt
  const range = cal.range(days[0].dt, end)
  const filtersOn = q || cat !== 'Semua' || spec || onlyOpen

  const pickDay = (i: number) => { setDay(i); setTime(null) }
  const reset = () => { setQ(''); setCat('Semua'); setSpec(''); setOnlyOpen(false) }
  const nextOpenDay = () => { const i = days.findIndex((x) => x.count > 0); if (i >= 0) pickDay(i) }
  const select = (id: string) => {
    setDocId(id); setTime(null)
    if (innerWidth < 1024) setTimeout(() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }
  const book = () => {
    if (!doc || !t) return
    openWhatsApp({ doctor: doc.name, date: cur.dt, time: t })
  }

  return (
    <>
      <section className="relative overflow-hidden">
        <Leaf className="pointer-events-none absolute -right-10 top-4 w-40 rotate-[20deg] text-leaf sm:w-60 lg:right-0 lg:w-72" />
        <Wrap className="fade-in relative pb-8 pt-12 md:pt-16">
          <Eyebrow>{tr('doctors.schedule.pageEyebrow')}</Eyebrow>
          <h1 className="mt-4 max-w-[18ch] font-serif text-[clamp(34px,5vw,54px)] leading-[1.04] tracking-[-.01em]">{tr('doctors.schedule.pageTitle')}</h1>
          <p className="mt-4 max-w-[48ch] text-[14.5px] leading-relaxed text-muted">{tr('doctors.schedule.pageIntro')}</p>
        </Wrap>
      </section>

      <Wrap className="pb-16 md:pb-20">
        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <SearchInput value={q} onChange={setQ} placeholder={tr('doctors.schedule.search')} />
          <label className="relative block h-12 sm:w-[240px]">
            <span className="sr-only">{tr('doctors.schedule.specialty')}</span>
            <select value={spec} onChange={(e) => setSpec(e.target.value)} className="h-full w-full cursor-pointer appearance-none rounded-lg border border-line bg-surface pl-4 pr-10 text-[13px] text-ink outline-none transition-colors hover:border-ink/30 focus:border-ink/40">
              <option value="">{tr('doctors.schedule.allSpecialties')}</option>
              {SPECIALTIES.map(([s, l]) => <option key={s} value={s}>{pick(l)}</option>)}
            </select>
            <svg viewBox="0 0 16 16" className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="m4 6 4 4 4-4" strokeLinecap="round" /></svg>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
            {CATEGORIES.map((c) => <FilterPill key={c} active={cat === c} onClick={() => setCat(c)}>{catLabel[c]}</FilterPill>)}
          </div>
          <label className="flex min-h-10 cursor-pointer items-center gap-2.5 text-[13px] text-ink/85">
            <input type="checkbox" checked={onlyOpen} onChange={(e) => setOnlyOpen(e.target.checked)} className="h-4 w-4 accent-forest" />
            {tr('doctors.schedule.onlyOpen')}
          </label>
        </div>

        {/* Week navigator */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
          <p className="text-[11px] font-medium uppercase tracking-[.14em] text-muted">{tr('doctors.schedule.pickDate')}</p>
          <div className="flex items-center rounded-lg border border-line bg-surface">
            <button type="button" aria-label={tr('doctors.schedule.prevWeek')} disabled={week === 0} onClick={() => { setWeek(week - 1); setTime(null) }} className="grid h-11 w-11 place-items-center text-ink disabled:text-ink/25"><Arrow className="rotate-180" /></button>
            <span className="border-x border-line px-4 text-[13px] tabular-nums" aria-live="polite">{range}</span>
            <button type="button" aria-label={tr('doctors.schedule.nextWeek')} disabled={week === MAX_WEEK} onClick={() => { setWeek(week + 1); setTime(null) }} className="grid h-11 w-11 place-items-center text-ink disabled:text-ink/25"><Arrow /></button>
          </div>
        </div>
        <div className="mt-5"><ScheduleDateSelector days={days} active={day} onSelect={pickDay} /></div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10">
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-4">
              <h2 className="font-serif text-[clamp(26px,3.4vw,34px)] leading-tight">{label}</h2>
              <p className="text-[14px] lg:text-[15px] text-muted">{fill(tr('doctors.schedule.practicing'), { n: list.length })}</p>
            </div>
            {list.length ? (
              <ul key={`${week}-${day}-${list.length}`}>
                {list.map((d) => <ScheduleRow key={d.id} doctor={d} selected={d.id === doc?.id} onSelect={() => select(d.id)} />)}
              </ul>
            ) : (
              <div className="fade-in py-14 text-center">
                <p className="font-serif text-[22px]">{tr(filtersOn && !filtered.length ? 'doctors.schedule.noMatch' : 'doctors.schedule.noDoctors')}</p>
                <button type="button" onClick={filtersOn && !filtered.length ? reset : nextOpenDay} className="mt-5 inline-flex h-11 items-center gap-2 rounded-lg border border-line bg-surface px-5 text-[13px] text-ink transition-colors hover:border-ink/30">
                  {tr(filtersOn && !filtered.length ? 'doctors.schedule.resetFilter' : 'doctors.schedule.otherDay')}
                </button>
              </div>
            )}
          </div>

          <aside id="booking" className="h-fit scroll-mt-24 rounded-lg border border-line bg-mint-2 p-5 sm:p-6 lg:sticky lg:top-24">
            <p className="text-[11px] font-medium uppercase tracking-[.14em] text-muted">{tr('doctors.schedule.appointment')}</p>
            {doc ? (
              <>
                <p className="mt-3 text-[14px] font-medium text-ink">{fill(tr('doctors.schedule.available'), { label })}</p>
                <div className="mt-4"><TimeSlotSelector slots={slots} value={t} onChange={setTime} /></div>
              </>
            ) : <p className="mt-3 text-[14px] lg:text-[15px] leading-relaxed text-muted">{tr('doctors.schedule.pickDoctor')}</p>}
            <AppointmentSummary rows={[[tr('doctors.schedule.doctor'), doc?.name ?? '—'], [tr('doctors.schedule.date'), doc ? cal.date(cur.k, cur.dt, true) : '—'], [tr('doctors.schedule.time'), t ? cal.time(t) : '—']]} />
            <button type="button" onClick={book} disabled={!t} className="group mt-5 flex w-full items-center justify-center gap-2.5 rounded-lg bg-forest px-5 py-3.5 text-[13px] font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_18px_-8px_rgba(15,58,48,.6)] disabled:opacity-50 disabled:hover:translate-y-0">
              {tr('doctors.schedule.cta')}<Arrow className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
            <p className="mt-4 flex items-start gap-2.5 text-[13px] leading-relaxed text-muted">
              <svg viewBox="0 0 24 24" className="mt-px h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" strokeLinecap="round" /></svg>
              {tr('doctors.schedule.pageNote')}
            </p>
          </aside>
        </div>
      </Wrap>

      <div className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-5 py-3 transition duration-300 lg:hidden ${t ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'}`}>
        <button type="button" onClick={book} tabIndex={t ? 0 : -1} className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-forest py-3 text-[13px] font-medium text-white">
          {tr('doctors.schedule.cta')}<Arrow />
        </button>
      </div>
    </>
  )
}
