import { useContext } from 'react'
import { LanguageContext } from './context'

export default function useLanguage() {
  const c = useContext(LanguageContext)
  if (!c) throw new Error('useLanguage must be used inside LanguageProvider')
  return c
}
