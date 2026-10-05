import { useEffect } from 'react'
import { WaLink, Wrap } from '../components/ui'
import useLanguage from '../i18n/useLanguage'
import { DOCTORS } from '../data/doctors'
import { buildWhatsAppUrl, type BookingContext } from '../utils/whatsapp'

// Compatibility route: /buat-janji forwards straight to WhatsApp.
export default function BookingRedirect() {
  const { t } = useLanguage()
  const p = new URLSearchParams(location.search)
  const ctx: BookingContext = { doctor: DOCTORS.find((d) => d.id === p.get('dokter'))?.name, time: p.get('waktu')?.replace(':', '.') || undefined }
  useEffect(() => { location.replace(buildWhatsAppUrl(ctx)) }, [])
  return (
    <Wrap className="py-24 text-center sm:py-32">
      <p className="font-serif text-[26px]">{t('common.wa.opening')}</p>
      <WaLink ctx={ctx} className="mt-4 inline-block text-[13px] underline underline-offset-4">{t('common.wa.fallback')}</WaLink>
    </Wrap>
  )
}
