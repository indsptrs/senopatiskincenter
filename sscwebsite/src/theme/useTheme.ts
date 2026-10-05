import { useContext } from 'react'
import { ThemeContext } from './context'

export default function useTheme() {
  const c = useContext(ThemeContext)
  if (!c) throw new Error('useTheme must be used inside ThemeProvider')
  return c
}
