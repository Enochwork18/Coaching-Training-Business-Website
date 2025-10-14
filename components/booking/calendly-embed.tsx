"use client"

import { InlineWidget } from "react-calendly"

export function CalendlyEmbed() {
  return (
    <div className="h-[800px]">
      <InlineWidget url="https://calendly.com/ibasepo" />
    </div>
  )
}