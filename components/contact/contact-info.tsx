import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export function ContactInfo() {
  const contactDetails = [
    {
      icon: Mail,
      label: "Email",
      value: "Enquiries@ibasepo.org.uk\neo.bismark@ibasepo.org.uk",
      href: "mailto:Enquiries@ibasepo.org.uk",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "07958 709238",
      href: "tel:+447958709238",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "The living room\n14 Brunswick street\nStretford\nM32 8NJ",
      href: null,
    },
    {
      icon: Clock,
      label: "Office Hours",
      value: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 2:00 PM",
      href: null,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold mb-2">Contact Information</h2>
        <p className="text-muted-foreground">
          Reach out through any of these channels. We're here to help you begin your transformation journey.
        </p>
      </div>

      <div className="space-y-4">
        {contactDetails.map((detail) => (
          <Card key={detail.label}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <detail.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold mb-1">{detail.label}</p>
                  {detail.href ? (
                    <a
                      href={detail.href}
                      className="text-muted-foreground hover:text-primary transition-colors whitespace-pre-line"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <p className="text-muted-foreground whitespace-pre-line">{detail.value}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-brand-teal to-brand-teal-dark text-white">
        <CardContent className="pt-6">
          <h3 className="font-heading text-xl font-bold mb-2">Ready to Start?</h3>
          <p className="text-white/90 mb-4">
            Book a complimentary 30-minute consultation to discuss your goals and how we can support you.
          </p>
          <a
            href="/booking"
            className="inline-block bg-white text-primary px-6 py-2 rounded-md font-medium hover:bg-white/90 transition-colors"
          >
            Book Free Consultation
          </a>
        </CardContent>
      </Card>
    </div>
  )
}
