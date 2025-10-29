"use client"

import type { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { ReducedMotionProvider } from "@/components/providers/reduced-motion-provider"

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ReducedMotionProvider>
        {children}
      </ReducedMotionProvider>
    </ThemeProvider>
  )
}
