import { Link } from '../router'
import useLanguage from '../i18n/useLanguage'
import { Leaf, WaLink } from './ui'

export default function Footer() {
  const { t } = useLanguage()
  const f = (k: string) => t(`common.footer.${k}`)
  return (
      <footer className="relative mt-6 overflow-hidden rounded-t-[28px] bg-forest text-white">
        <div className="relative mx-auto max-w-[1280px] px-5 pt-14 pb-6 md:px-8 md:pt-16 lg:px-10 lg:pt-20">
          {/* Top: brand (left) balanced by mark (right) */}
          <div className="grid grid-cols-12 items-end gap-x-8 gap-y-7">
            <div className="col-span-12 lg:col-span-8">
              <h2 className="font-serif text-[clamp(2.2rem,5vw,3.6rem)] leading-[0.98] tracking-[-0.015em]">Senopati Skin Center</h2>
              <p className="mt-4 max-w-[440px] text-[13px] leading-relaxed text-white/70">{f('tagline')}</p>
            </div>
            <div aria-hidden className="pointer-events-none relative col-span-4 hidden h-24 justify-self-end text-white/[.09] lg:block lg:w-28">
              <Leaf className="absolute right-6 top-0 w-20 rotate-[25deg]" />
              <span className="absolute bottom-0 right-0 font-serif text-[40px] italic leading-none">SSC</span>
            </div>
          </div>

          {/* Information grid */}
          <div className="mt-12 grid grid-cols-12 gap-x-8 gap-y-8 border-t border-white/10 pt-10 lg:mt-14">
            {([[f('navigation'), [[f('about'), '/tentang-kami'], [t('common.nav.doctors'), '/dokter'], [t('common.nav.articles'), '/artikel'], [f('faq'), '/faq']]], [f('services'), [[f('skinConsult'), '/buat-janji'], [f('skinCare'), '/tentang-kami'], [f('specialists'), '/dokter'], [f('schedule'), '/jadwal-praktik']]]] as [string, [string, string][]][]).map(([h, items]) => (
              <div key={h} className="col-span-6 md:col-span-3">
                <h4 className="text-[11px] font-semibold uppercase tracking-[.08em] text-white/50">{h}</h4>
                <ul className="mt-4 space-y-2.5 text-[13px] leading-5">
                  {items.map(([l, to]) => (
                    <li key={l}>{(() => { const cls = 'text-white/75 underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:text-white hover:decoration-white/40 focus-visible:outline-white'; return to === '/buat-janji' ? <WaLink className={cls}>{l}</WaLink> : <Link to={to} className={cls}>{l}</Link> })()}</li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="col-span-12 sm:col-span-6 md:col-span-3">
              <h4 className="text-[11px] font-semibold uppercase tracking-[.08em] text-white/50">{f('contact')}</h4>
              <ul className="mt-4 space-y-3 text-[13px] leading-5 text-white/75">
                {[
                  [<path key="p" d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />, <>Jl. Senopati No. 88<br />Kebayoran Baru, Jakarta Selatan<br />DKI Jakarta 12190</>],
                  [<path key="t" d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />, '+62 811 1234 5678'],
                  [<g key="i"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" fill="currentColor" /></g>, '@senopatiskincenter'],
                ].map(([ic, t], i) => (
                  <li key={i} className="grid grid-cols-[16px_1fr] gap-3">
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 text-white/55" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{ic}</svg>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-3">
              <h4 className="text-[11px] font-semibold uppercase tracking-[.08em] text-white/50">{f('hours')}</h4>
              <dl className="mt-4 grid grid-cols-[16px_1fr] gap-3 text-[13px] leading-5">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 text-white/55" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                <div className="space-y-0.5">
                  <dt className="text-white/75">{f('days')}</dt>
                  <dd className="font-medium tabular-nums text-white">{f('time')}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Utility row */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-white/15 pt-6 text-[11.5px] text-white/55 sm:grid sm:grid-cols-[1fr_auto_1fr]">
            <p>{f('rights')}</p>
            <a href="https://instagram.com/senopatiskincenter" target="_blank" rel="noreferrer" aria-label="Instagram" className="order-first grid h-8 w-8 place-items-center rounded-full text-white/70 transition duration-200 hover:scale-110 hover:text-white focus-visible:outline-white sm:order-none"><svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" fill="currentColor" /></svg></a>
            <div className="flex items-center gap-2.5 sm:justify-self-end">
              <Link to="/kebijakan-privasi" className="transition-colors duration-200 hover:text-white">{t('common.placeholder.privacy')}</Link><span aria-hidden>·</span><Link to="/syarat-ketentuan" className="transition-colors duration-200 hover:text-white">{t('common.placeholder.terms')}</Link>
            </div>
          </div>
        </div>
      </footer>
  )
}
