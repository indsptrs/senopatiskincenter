import { createContext } from 'react'

export type Theme = 'light' | 'dark'
export const KEY = 'senopati-theme'
export const ThemeContext = createContext<{ theme: Theme; toggle: () => void } | null>(null)
