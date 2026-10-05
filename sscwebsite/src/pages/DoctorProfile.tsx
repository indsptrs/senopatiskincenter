import { useEffect, useRef, useState } from 'react'
import DoctorCredentials from '../components/profile/DoctorCredentials'
import DoctorHero, { BackLink } from '../components/profile/DoctorHero'
import ExpertiseSection from '../components/profile/ExpertiseSection'
import PracticeSchedule from '../components/profile/PracticeSchedule'
import { Arrow, Btn, Reveal, Wrap } from '../components/ui'
import { DOCTORS, getProfile } from '../data/doctors'
import useLanguage from '../i18n/useLanguage'

const toSchedule = () => document.getElementById('jadwal')?.scrollIntoView({ behavior: 'smooth' })

function StickyCta() {
  const [show, setShow] = useState(false)
  const { t } = useLanguage()
  const hero = useRef<number>(0)
  useEffect(() => {
    const onScroll = () => {
      const s = document.getElementById('jadwal')?.getBoundingClientRect()
      hero.current = window.scrollY
      setShow(window.scrollY > 640 && !!s && s.top > window.innerHeight * 0.6)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-5 py-3 transition duration-300 md:hidden ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'}`}>
      <button type="button" onClick={toSchedule} tabIndex={show ? 0 : -1} className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-forest py-3 text-[13px] font-medium text-white">
        {t('doctors.profile.pickSchedule')}<Arrow />
      </button>
    </div>
  )
}

export default function DoctorProfile({ id }: { id: string }) {
  const { t, pick } = useLanguage()
  const d = DOCTORS.find((x) => x.id === id)
  if (!d) return (
    <Wrap className="fade-in py-24 text-center md:py-32">
      <p className="text-[11px] font-medium uppercase tracking-[.14em] text-muted">{t('doctors.profile.eyebrow')}</p>
      <h1 className="mt-4 font-serif text-[clamp(32px,5vw,48px)]">{t('doctors.profile.notFound')}</h1>
      <p className="mx-auto mt-3 max-w-[40ch] text-[14px] text-muted">{t('doctors.profile.notFoundBody')}</p>
      <Btn to="/dokter" className="mt-8">{t('doctors.profile.back')}</Btn>
    </Wrap>
  )
  const p = getProfile(d)
  return (
    <>
      <DoctorHero doctor={d} onSchedule={toSchedule} />
      <Reveal className="border-t border-line py-14 md:py-18">
        <Wrap className="grid gap-10 lg:grid-cols-2 lg:gap-0">
          <div className="lg:border-r lg:border-line lg:pr-12">
            <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[.14em] text-muted">{t('doctors.profile.about')}<span className="h-px w-6 bg-muted/50" /></p>
            <h2 className="mt-3 max-w-[16ch] font-serif text-[clamp(30px,4vw,40px)] leading-[1.08]">{pick(p.aboutHeading)}</h2>
            {pick(p.about).map((x) => <p key={x} className="mt-5 max-w-[56ch] text-[14px] leading-[1.75] text-muted">{x}</p>)}
            <div className="mt-7 hidden lg:block"><BackLink /></div>
          </div>
          <div className="lg:pl-12"><DoctorCredentials key={d.id} items={p.credentials} /></div>
        </Wrap>
      </Reveal>
      <ExpertiseSection items={p.expertiseItems} />
      <PracticeSchedule key={d.id} doctor={d} />
      <StickyCta />
    </>
  )
}
