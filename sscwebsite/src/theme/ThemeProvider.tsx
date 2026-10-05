import { useCallback, useEffect, useState, type ReactNode } from 'react'

import { KEY, ThemeContext, type Theme } from './context'

const read = (): Theme => { try { return localStorage.getItem(KEY) === 'dark' ? 'dark' : 'light' } catch { return 'light' } }

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(read)
  useEffect(() => {
    const el = document.documentElement
    el.classList.toggle('dark', theme === 'dark')
    el.style.colorScheme = theme
  }, [theme])
  const toggle = useCallback(() => {
    const el = document.documentElement
    el.classList.add('theme-anim')
    setTimeout(() => el.classList.remove('theme-anim'), 320)
    setTheme((t) => { const n = t === 'dark' ? 'light' : 'dark'; try { localStorage.setItem(KEY, n) } catch { /* ignore */ } return n })
  }, [])
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}
