"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "./theme-provider"

export function ThemeToggle({ size = "icon" as const }: { size?: "icon" | "sm" | "md" }) {
  const { theme, toggle } = useTheme()
  return (
    <Button
      variant="ghost"
      size={size === "icon" ? "icon" : "sm"}
      aria-label="Toggle theme"
      onClick={toggle}
      className="shrink-0"
      data-theme-toggle
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}
