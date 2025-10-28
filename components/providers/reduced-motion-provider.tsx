import type { ReactNode } from "react"
import { useEffect, useState } from "react"

export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      setReduced(mq.matches)
      const listener = (e: MediaQueryListEvent) => setReduced(e.matches)
      mq.addEventListener?.('change', listener)
      return () => mq.removeEventListener?.('change', listener)
    }
  }, [])
  return (
    <div data-reduced-motion={reduced ? 'true' : 'false'}>
      {children}
    </div>
  )
}
