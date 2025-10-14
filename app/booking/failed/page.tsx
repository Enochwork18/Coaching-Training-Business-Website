import { Suspense } from 'react'
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import BookingFailedContent from './content'

export default function BookingFailedPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="py-20 md:py-32 bg-background">
        <Suspense fallback={<div>Loading...</div>}>
          <BookingFailedContent />
        </Suspense>
      </div>
      <SiteFooter />
    </main>
  )
}