"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

const THEME_KEY = "ibasepo_theme"

type Theme = "light" | "dark"

type ThemeContextValue = {
  theme: Theme
  setTheme: (t: Theme) => void
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "light"
  const persisted = window.localStorage.getItem(THEME_KEY) as Theme | null
  if (persisted === "light" || persisted === "dark") return persisted
  const osPref = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
  return osPref ? "dark" : "light"
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.setAttribute("data-theme", theme)
  if (theme === "dark") {
    root.classList.add("dark")
  } else {
    root.classList.remove("dark")
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light")

  useEffect(() => {
    const initial = getPreferredTheme()
    setThemeState(initial)
    applyTheme(initial)
  }, [])

  const setTheme = (t: Theme) => {
    setThemeState(t)
    try { localStorage.setItem(THEME_KEY, t) } catch {}
    applyTheme(t)
  }

  const toggle = () => setTheme(theme === "dark" ? "light" : "dark")

  const value = useMemo(() => ({ theme, setTheme, toggle }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
