import { useState } from 'react'
import type { Credential } from '../../data/doctors'
import useLanguage from '../../i18n/useLanguage'

export default function DoctorCredentials({ items }: { items: Credential[] }) {
  const [open, setOpen] = useState(0)
  const { t, pick } = useLanguage()
  return (
    <div>
      <h2 className="font-serif text-[clamp(24px,3vw,30px)] leading-tight">{t('doctors.profile.credentials')}</h2>
      <ul className="mt-5 space-y-1.5">
        {items.map((c, i) => {
          const on = open === i
          return (
            <li key={c.title.id} className={`rounded-lg border transition-colors duration-300 ${on ? 'border-line bg-mint-2' : 'border-transparent border-b-line'}`}>
              <button type="button" aria-expanded={on} aria-controls={`cred-${i}`} onClick={() => setOpen(on ? -1 : i)} className="flex min-h-14 w-full items-start justify-between gap-4 rounded-lg px-4 py-4 text-left sm:px-5">
                <span>
                  <span className="block font-serif text-[19px] leading-snug">{pick(c.title)}</span>
                  <span className="mt-1 block text-[13px] text-muted">{pick(c.period)}</span>
                </span>
                <svg viewBox="0 0 24 24" className={`mt-1 h-5 w-5 shrink-0 text-ink transition-transform duration-300 ${on ? '-rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
              </button>
              <div id={`cred-${i}`} className={`grid transition-[grid-template-rows] duration-300 ${on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <p className="overflow-hidden px-4 text-[14px] lg:text-[15px] leading-relaxed text-ink/75 sm:px-5"><span className="block pb-4">{pick(c.detail)}</span></p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
