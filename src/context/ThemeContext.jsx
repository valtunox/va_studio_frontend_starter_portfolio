import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const THEMES = {
  default:  { label: 'Purple',   color: '#7c3aed', primary: '262.1 83.3% 57.8%',  ring: '262.1 83.3% 57.8%',  primaryFg: '210 40% 98%', accent: '#a855f7', accent2: '#ec4899' },
  ocean:    { label: 'Ocean',    color: '#2563eb', primary: '221.2 83.2% 53.3%',  ring: '221.2 83.2% 53.3%',  primaryFg: '210 40% 98%', accent: '#3b82f6', accent2: '#06b6d4' },
  slate:    { label: 'Slate',    color: '#475569', primary: '215.4 16.3% 46.9%',  ring: '215.4 16.3% 46.9%',  primaryFg: '210 40% 98%', accent: '#64748b', accent2: '#94a3b8' },
  midnight: { label: 'Midnight', color: '#0a0a0a', primary: '0 0% 9%',            ring: '0 0% 20%',           primaryFg: '0 0% 98%',    accent: '#18181b', accent2: '#27272a' },
  sunset:   { label: 'Sunset',   color: '#f97316', primary: '24.6 95% 53.1%',     ring: '24.6 95% 53.1%',     primaryFg: '0 0% 100%',   accent: '#f97316', accent2: '#ef4444' },
  emerald:  { label: 'Emerald',  color: '#10b981', primary: '160.1 84.1% 39.4%',  ring: '160.1 84.1% 39.4%',  primaryFg: '0 0% 100%',   accent: '#10b981', accent2: '#14b8a6' },
  rose:     { label: 'Rose',     color: '#e11d48', primary: '346.8 77.2% 49.8%',  ring: '346.8 77.2% 49.8%',  primaryFg: '0 0% 100%',   accent: '#e11d48', accent2: '#f43f5e' },
  cyber:    { label: 'Cyber',    color: '#22d3ee', primary: '187.9 85.7% 53.3%',  ring: '187.9 85.7% 53.3%',  primaryFg: '222 47% 11%', accent: '#22d3ee', accent2: '#a855f7' },
}

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    try { return localStorage.getItem('va-theme') || 'default' } catch { return 'default' }
  })
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem('va-dark') === 'true' } catch { return false }
  })

  const setTheme = useCallback((t) => {
    setThemeState(t)
    try { localStorage.setItem('va-theme', t) } catch {}
  }, [])

  const toggleDark = useCallback(() => {
    setIsDark(prev => {
      const next = !prev
      try { localStorage.setItem('va-dark', String(next)) } catch {}
      return next
    })
  }, [])

  useEffect(() => {
    const root = document.documentElement
    Object.keys(THEMES).forEach((k) => root.classList.remove(`theme-${k}`))
    root.classList.add(`theme-${theme}`)
    root.classList.toggle('dark', isDark)
    const t = THEMES[theme] || THEMES.default
    root.style.setProperty('--primary', t.primary)
    root.style.setProperty('--ring', t.ring)
    root.style.setProperty('--primary-foreground', t.primaryFg)
    root.style.setProperty('--accent-color', t.accent)
    root.style.setProperty('--accent-color-2', t.accent2)
  }, [theme, isDark])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark, toggleDark, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) return { theme: 'default', setTheme: () => {}, isDark: false, toggleDark: () => {}, themes: THEMES }
  return ctx
}

export { THEMES }
