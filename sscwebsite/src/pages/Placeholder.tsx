import useLanguage from '../i18n/useLanguage'
import { Eyebrow, TextLink, Wrap } from '../components/ui'

// Route stub for pages not designed yet; keeps navigation inside the app.
export default function Placeholder({ label, title }: { label: string; title: string }) {
  const { t } = useLanguage()
  return (
    <Wrap className="py-24 sm:py-32">
      <Eyebrow>{label}</Eyebrow>
      <h1 className="mt-3 max-w-[640px] font-serif text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.05]">{title}</h1>
      <p className="mt-4 max-w-[460px] text-[14px] leading-relaxed text-muted">{t('common.placeholder.body')}</p>
      <div className="mt-6"><TextLink href="/">{t('common.placeholder.back')}</TextLink></div>
    </Wrap>
  )
}
