import { useMemo, useState } from 'react'
import useLanguage from '../../i18n/useLanguage'
import { openWhatsApp } from '../../utils/whatsapp'
import type { Doctor } from '../../data/doctors'
import { Arrow, TextLink, Wrap } from '../ui'

export const DAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
export const START = new Date(2026, 9, 5) // prototype week: Senin, 5 Oktober 2026
export const pad = (n: number) => String(n).padStart(2, '0')
/** Fill "{key}" placeholders in a dictionary template. */
export const fill = (tpl: string, v: Record<string, string | number>) => tpl.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ''))

type Cal = { dayShort: Record<string, string>; dayFull: Record<string, string>; monShort: string[]; month: string[]; timeSep: string; chip: string; date: string; dateYear: string; range: string }
/** Localized day/month/time formatting. Day keys stay canonical ('Sen', 'Sel', …); slots stay "HH.MM". */
export function useCalendar() {
  const { t } = useLanguage()
  const c = t<Cal>('doctors.cal')
  const time = (s: string) => s.replace(/(\d{2})[.:](\d{2})/g, `$1${c.timeSep}$2`)
  return {
    dayShort: (k: string) => c.dayShort[k] ?? k,
    dayFull: (k: string) => c.dayFull[k] ?? k,
    time,
    chip: (dt: Date) => fill(c.chip, { dd: pad(dt.getDate()), mon: c.monShort[dt.getMonth()] }),
    date: (k: string, dt: Date, year = false) => fill(year ? c.dateYear : c.date, { day: c.dayFull[k] ?? k, d: dt.getDate(), month: c.month[dt.getMonth()], y: dt.getFullYear() }),
    range: (a: Date, b: Date) => fill(c.range, { a: pad(a.getDate()), b: pad(b.getDate()), month: c.month[b.getMonth()], y: b.getFullYear() }),
  }
}

// Prototype slots only — not real clinic availability.
export function slotsFor(hours: string, date: Date) {
  const [a, b] = hours.split('–').map((s) => parseFloat(s.trim()))
  const out: string[] = []
  for (let m = a * 60; m <= b * 60 - 60; m += 90) out.push(`${pad(Math.floor(m / 60))}.${pad(m % 60)}`)
  const skip = date.getDate() % (out.length + 1)
  return out.filter((_, i) => i !== skip || out.length < 3)
}

export function AppointmentSummary({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="mt-5 border-t border-line text-[13px]">
      {rows.map(([k, v]) => (
        <div key={k} className="grid grid-cols-[80px_1fr] gap-3 border-b border-line py-2.5"><dt className="text-muted">{k}</dt><dd className="text-ink/90">{v}</dd></div>
      ))}
    </dl>
  )
}

export default function PracticeSchedule({ doctor: d }: { doctor: Doctor }) {
  const { t: tr } = useLanguage()
  const cal = useCalendar()
  const [week, setWeek] = useState(0)
  const dates = useMemo(() => DAYS.map((k, i) => {
    const dt = new Date(START); dt.setDate(START.getDate() + week * 7 + i)
    return { k, dt, open: d.practiceDays.includes(k) }
  }), [week, d])
  const firstOpen = dates.findIndex((x) => x.open)
  const [sel, setSel] = useState<{ week: number; i: number }>({ week: 0, i: firstOpen })
  const idx = sel.week === week ? sel.i : -1
  const cur = idx >= 0 ? dates[idx] : null
  const slots = cur ? slotsFor(d.practiceHours, cur.dt) : []
  const [time, setTime] = useState<string | null>(null)
  const t = time && slots.includes(time) ? time : slots[0] ?? null

  const end = dates[5].dt
  const range = cal.range(dates[0].dt, end)
  const label = cur ? cal.date(cur.k, cur.dt, true) : '—'

  const go = (w: number) => { setWeek(w); setSel({ week: w, i: firstOpen }); setTime(null) }
  const book = () => {
    if (!cur || !t) return
    openWhatsApp({ doctor: d.name, date: cur.dt, time: t })
  }

  return (
    <section id="jadwal" className="scroll-mt-24 py-14 md:py-18">
      <Wrap>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[.14em] text-muted">{tr('doctors.schedule.eyebrow')}<span className="h-px w-6 bg-muted/50" /></p>
            <h2 className="mt-3 font-serif text-[clamp(30px,4vw,42px)] leading-tight">{tr('doctors.schedule.title')}</h2>
            <p className="mt-2 text-[14px] text-muted">{tr('doctors.schedule.body')}</p>
          </div>
          <div className="flex items-center rounded-lg border border-line bg-surface">
            <button type="button" aria-label={tr('doctors.schedule.prevWeek')} disabled={week === 0} onClick={() => go(week - 1)} className="grid h-11 w-11 place-items-center text-ink disabled:text-ink/25"><Arrow className="rotate-180" /></button>
            <span className="border-x border-line px-4 text-[13px] tabular-nums text-ink" aria-live="polite">{range}</span>
            <button type="button" aria-label={tr('doctors.schedule.nextWeek')} disabled={week === 3} onClick={() => go(week + 1)} className="grid h-11 w-11 place-items-center text-ink disabled:text-ink/25"><Arrow /></button>
          </div>
        </div>

        <div className="mt-9 grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-10">
          <div className="min-w-0">
            <div className="-mx-5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0" role="group" aria-label={tr('doctors.schedule.pickDate')}>
              <div className="grid min-w-[480px] grid-cols-6 gap-2">
                {dates.map((x, i) => {
                  const on = i === idx
                  return (
                    <button key={x.k} type="button" disabled={!x.open} aria-pressed={on} onClick={() => { setSel({ week, i }); setTime(null) }}
                      className={`rounded-lg border px-2 py-3 text-center transition-colors duration-200 ${on ? 'border-forest bg-forest text-white' : x.open ? 'border-line bg-surface text-ink hover:border-ink/30' : 'cursor-not-allowed border-line/70 bg-transparent text-ink/30'}`}>
                      <span className="block text-[11px] font-medium uppercase tracking-[.08em]">{cal.dayShort(x.k)}</span>
                      <span className="mt-0.5 block text-[13px] tabular-nums">{cal.chip(x.dt)}</span>
                    </button>
                  )
                })}
              </div>
            </div>
            <p className="mt-8 text-[11px] font-medium uppercase tracking-[.14em] text-muted">{tr('doctors.schedule.thisWeek')}</p>
            <ul className="mt-3 border-t border-line text-[14px]">
              {d.practiceDays.map((k) => (
                <li key={k} className="grid grid-cols-[110px_1fr] border-b border-line py-3.5"><span className="font-medium text-ink">{cal.dayFull(k)}</span><span className="tabular-nums text-muted">{cal.time(d.practiceHours)}</span></li>
              ))}
            </ul>
            <div className="mt-5"><TextLink href={`/jadwal-praktik?doctor=${d.id}`}>{tr('doctors.schedule.full')}</TextLink></div>
          </div>

          <aside className="h-fit rounded-lg border border-line bg-mint-2 p-5 sm:p-6">
            <p className="text-[14px] font-medium text-ink">{fill(tr('doctors.schedule.available'), { label: cur ? cal.date(cur.k, cur.dt) : tr('doctors.schedule.pickDateHint') })}</p>
            <div className="mt-4 grid grid-cols-3 gap-2" role="group" aria-label={tr('doctors.schedule.pickTime')}>
              {slots.length ? slots.map((s) => (
                <button key={s} type="button" aria-pressed={s === t} onClick={() => setTime(s)}
                  className={`h-11 rounded-lg border text-[14px] tabular-nums transition-colors duration-200 ${s === t ? 'border-forest bg-forest text-white' : 'border-line bg-surface text-ink hover:border-ink/30'}`}>{cal.time(s)}</button>
              )) : <p className="col-span-3 text-[14px] lg:text-[15px] text-muted">{tr('doctors.schedule.pickDateForTime')}</p>}
            </div>
            <AppointmentSummary rows={[[tr('doctors.schedule.doctor'), d.name], [tr('doctors.schedule.date'), label], [tr('doctors.schedule.time'), t ? cal.time(t) : '—']]} />
            <button type="button" onClick={book} disabled={!t} className="group mt-5 flex w-full items-center justify-center gap-2.5 rounded-lg bg-forest px-5 py-3.5 text-[13px] font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_18px_-8px_rgba(15,58,48,.6)] disabled:opacity-50 disabled:hover:translate-y-0">
              {tr('doctors.schedule.cta')}<Arrow className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
            <p className="mt-4 flex items-center gap-2.5 text-[13px] text-muted">
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" strokeLinecap="round" /></svg>
              {tr('doctors.schedule.note')}
            </p>
          </aside>
        </div>
      </Wrap>
    </section>
  )
}
