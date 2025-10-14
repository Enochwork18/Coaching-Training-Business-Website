import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export function ContactInfo() {
  const contactDetails = [
    {
      icon: Mail,
      label: "Email",
      value: "enquiries@ibasepo.org.uk",
      href: "mailto:enquiries@ibasepo.org.uk",
    },
    {
      icon: Phone,
      label: "Phone / WhatsApp",
      value: "+44 7958 709238",
      href: "tel:+447958709238",
    },
    {
      icon: MapPin,
      label: "Address",
      value: "The Living Room, 14 Brunswick Street, Stretford, M32 8NJ, UK",
      href: "https://www.google.com/maps/search/?api=1&query=The+Living+Room,+14+Brunswick+Street,+Stretford",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-montserrat text-2xl font-bold text-forest-green mb-2">Get In Touch</h2>
        <p className="text-charcoal">
          We're here to answer your questions and help you on your journey.
        </p>
      </div>

      <div className="space-y-4">
        {contactDetails.map((detail) => (
          <div key={detail.label} className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-deep-teal/10 flex items-center justify-center flex-shrink-0">
              <detail.icon className="h-5 w-5 text-deep-teal" />
            </div>
            <div>
              <p className="font-semibold font-montserrat text-forest-green">{detail.label}</p>
              <a
                href={detail.href}
                className="text-charcoal hover:text-deep-teal transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {detail.value}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2374.882346613865!2d-2.3069!3d53.456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487badd29a73c3d7%3A0x8b3e8c9b3f3b1b3b!2sThe%20Living%2Ie9!4m5!3m4!1s0x487badd29a73c3d7%3A0x8b3e8c9b3f3b1b3b!8m2!3d53.456!4d-2.3069"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  )
}
