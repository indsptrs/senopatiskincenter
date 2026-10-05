import { useMemo, useState } from 'react'
import DoctorCard from '../components/DoctorCard'
import { Eyebrow, Leaf, Wrap } from '../components/ui'
import { CATEGORIES, DOCTORS } from '../data/doctors'
import useLanguage from '../i18n/useLanguage'
import { fill } from '../components/profile/PracticeSchedule'

const SORTS = ['rekomendasi', 'spesialisasi', 'nama', 'tersedia'] as const
type SortKey = (typeof SORTS)[number]

export function SearchInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  const { t } = useLanguage()
  return (
    <label className="flex h-12 flex-1 items-center gap-3 rounded-lg border border-line bg-surface px-4 transition-colors duration-200 focus-within:border-ink/40">
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 shrink-0 text-muted" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>
      <span className="sr-only">{t('doctors.list.searchLabel')}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder ?? t('doctors.list.search')} className="h-full w-full bg-transparent text-[13.5px] text-ink outline-none placeholder:text-muted/80" />
      {value && <button type="button" onClick={() => onChange('')} aria-label={t('doctors.list.clearSearch')} className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-mint hover:text-ink">×</button>}
    </label>
  )
}

function SortDropdown({ value, onChange }: { value: SortKey; onChange: (v: SortKey) => void }) {
  const { t } = useLanguage()
  const labels = t<Record<string, string>>('doctors.list.sorts')
  return (
    <label className="relative block h-12 sm:w-[240px]">
      <span className="sr-only">{t('doctors.list.sortLabel')}</span>
      <select value={value} onChange={(e) => onChange(e.target.value as SortKey)} className="h-full w-full cursor-pointer appearance-none rounded-lg border border-line bg-surface pl-4 pr-10 text-[13px] text-ink outline-none transition-colors duration-200 hover:border-ink/30 focus:border-ink/40">
        {SORTS.map((k) => <option key={k} value={k}>{labels[k]}</option>)}
      </select>
      <svg viewBox="0 0 16 16" className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="m4 6 4 4 4-4" strokeLinecap="round" /></svg>
    </label>
  )
}

export function FilterPill({ active, children, onClick }: { active: boolean; children: string; onClick: () => void }) {
  return (
    <button type="button" aria-pressed={active} onClick={onClick} className={`h-10 shrink-0 rounded-full border px-5 text-[13px] transition-colors duration-200 ${active ? 'border-forest bg-forest text-white' : 'border-line bg-mint-2 text-ink/80 hover:border-ink/25 hover:text-ink'}`}>
      {children}
    </button>
  )
}

export default function Doctors() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>('Semua')
  const [sort, setSort] = useState<SortKey>('rekomendasi')
  const { t, pick } = useLanguage()
  const catLabel = t<Record<string, string>>('doctors.categories')

  const list = useMemo(() => {
    const term = q.trim().toLowerCase()
    const out = DOCTORS.filter((d) => (cat === 'Semua' || d.focus.includes(cat)) && (!term || [d.name, pick(d.specialtyL), ...pick(d.expertiseL)].join(' ').toLowerCase().includes(term)))
    if (sort === 'rekomendasi') return out
    const by = { spesialisasi: (d: (typeof out)[0]) => pick(d.specialtyL), nama: (d: (typeof out)[0]) => d.name.replace(/^dr\.\s*/, ''), tersedia: (d: (typeof out)[0]) => (d.availability === 'Tersedia' ? '0' : '1') + d.name }[sort as Exclude<SortKey, 'rekomendasi'>]
    return [...out].sort((a, b) => by(a).localeCompare(by(b)))
  }, [q, cat, sort, pick])

  return (
    <section className="relative">
      <Leaf className="pointer-events-none absolute -right-10 top-4 w-40 rotate-[20deg] text-leaf sm:w-60 lg:right-0 lg:w-72" />
      <Wrap className="relative pt-10 pb-16 sm:pt-14">
        <Eyebrow>{t('doctors.list.eyebrow')}</Eyebrow>
        <h1 className="mt-3 max-w-[720px] font-serif text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] tracking-[-0.01em]">{t('doctors.list.title')}</h1>
        <p className="mt-4 max-w-[520px] text-[14px] leading-relaxed text-muted">{t('doctors.list.intro')}</p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <SearchInput value={q} onChange={setQ} />
          <SortDropdown value={sort} onChange={setSort} />
        </div>
        <div role="group" aria-label={t('doctors.list.filterLabel')} className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          {CATEGORIES.map((c) => <FilterPill key={c} active={cat === c} onClick={() => setCat(c)}>{catLabel[c]}</FilterPill>)}
        </div>

        <p className="mt-7 text-[13px] text-muted" aria-live="polite">{fill(t('doctors.list.count'), { n: list.length })}</p>
        {list.length ? (
          <div key={cat + sort + q} className="fade-in mt-3 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((d) => <DoctorCard key={d.id} doctor={d} />)}
          </div>
        ) : (
          <div className="fade-in mt-3 rounded-lg border border-dashed border-line bg-surface/60 px-6 py-14 text-center">
            <p className="font-serif text-[22px]">{t('doctors.list.emptyTitle')}</p>
            <p className="mt-1.5 text-[14px] lg:text-[15px] text-muted">{t('doctors.list.emptyBody')}</p>
            <button type="button" onClick={() => { setQ(''); setCat('Semua') }} className="mt-5 rounded-lg border border-line bg-surface px-5 py-2.5 text-[13px] font-medium hover:border-ink/30">{t('doctors.list.reset')}</button>
          </div>
        )}
      </Wrap>
    </section>
  )
}
