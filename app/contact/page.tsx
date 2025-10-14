import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"

export const metadata = {
  title: "Contact Us | Ìbáṣepọ̀",
  description: "Get in touch with our team. We're here to answer your questions and support your journey.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-warm-neutral">
      <SiteHeader />
      <ContactHero />
      <div className="py-20 md:py-32">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}
