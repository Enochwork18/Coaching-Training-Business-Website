import { Suspense } from 'react'
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import BookingSuccessContent from './content'

export default function BookingSuccessPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="py-20 md:py-32 bg-background">
        <Suspense fallback={<div>Loading...</div>}>
          <BookingSuccessContent />
        </Suspense>
      </div>
      <SiteFooter />
    </main>
  )
}