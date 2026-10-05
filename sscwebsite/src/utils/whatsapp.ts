import { getLang } from '../i18n/context'
import type { Lang } from '../i18n/translations'

/** Clinic WhatsApp number (placeholder) — international format, digits only. */
export const WHATSAPP_NUMBER = '6281112345678'

/** date: a Date (formatted per language) or a preformatted string. time: "HH:MM" or "HH.MM". */
export type BookingContext = { lang?: Lang; doctor?: string; date?: Date | string; time?: string; articleTitle?: string }

const COPY = {
  id: { hi: 'Halo Senopati Skin Center,', bye: 'Terima kasih.', want: 'Saya ingin membuat janji konsultasi.', with: 'Saya ingin membuat janji konsultasi dengan:', doctor: 'Dokter:', date: 'Tanggal:', time: 'Waktu:', article: 'Saya membaca artikel di website dan ingin berkonsultasi mengenai kondisi kulit saya.', opening: 'Membuka WhatsApp…' },
  en: { hi: 'Hello Senopati Skin Center,', bye: 'Thank you.', want: 'I would like to make an appointment.', with: 'I would like to make an appointment with:', doctor: 'Doctor:', date: 'Date:', time: 'Time:', article: 'I read an article on your website and would like to consult about my skin condition.', opening: 'Opening WhatsApp…' },
} satisfies Record<Lang, Record<string, string>>

export function formatDate(d: Date, lang: Lang) {
  return d.toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}
export function formatTime(t: string, lang: Lang) {
  const [h, m] = t.split(/[:.]/).map(Number)
  if (lang === 'id') return `${String(h).padStart(2, '0')}.${String(m).padStart(2, '0')}`
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`
}

export function buildWhatsAppMessage(ctx: BookingContext = {}) {
  const lang = ctx.lang ?? getLang()
  const c = COPY[lang]
  const { doctor, articleTitle } = ctx
  const date = ctx.date instanceof Date ? formatDate(ctx.date, lang) : ctx.date
  const time = ctx.time && formatTime(ctx.time, lang)
  let body = c.want
  if (doctor && (date || time)) body = `${c.with}\n\n${[`${c.doctor}\n${doctor}`, date && `${c.date}\n${date}`, time && `${c.time}\n${time}`].filter(Boolean).join('\n\n')}`
  else if (doctor) body = `${c.with}\n\n${doctor}`
  else if (articleTitle !== undefined) body = c.article
  return `${c.hi}\n\n${body}\n\n${c.bye}`
}

/** wa.me opens the app on mobile and WhatsApp Web / desktop app on desktop. */
export const buildWhatsAppUrl = (ctx: BookingContext = {}) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(ctx))}`

const isMobile = () => typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)

export function showWhatsAppToast() {
  if (typeof document === 'undefined') return
  document.getElementById('wa-toast')?.remove()
  const el = document.createElement('div')
  el.id = 'wa-toast'
  el.setAttribute('role', 'status')
  el.className = 'fade-in fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-full bg-forest px-5 py-2.5 text-[12.5px] text-white shadow-[0_10px_30px_-12px_rgba(15,58,48,.6)]'
  el.textContent = COPY[getLang()].opening
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 2200)
}

export function openWhatsApp(ctx: BookingContext = {}) {
  const url = buildWhatsAppUrl(ctx)
  showWhatsAppToast()
  if (isMobile()) location.href = url
  else window.open(url, '_blank', 'noopener')
  return url
}
