import Link from "next/link"
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function SiteFooter() {
  const currentYear = new Date().getFullYear()
  
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/adukelara?igsh=MWQ0cWx1eGtpaXdxcw=="
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/profile.php?id=100002866323294"
  const businessEmail = process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "enquiries@ibasepo.org.uk"
  const businessPhone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+447958709238"
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "447958709238"
  const businessAddress = process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "14 Brunswick Street, Stretford, M32 8NJ, UK"

  return (
    <footer className="bg-muted border-t">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-lg font-bold text-primary mb-4">Ìbáṣepọ̀</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connected Hearts Coaching & Consultancy. Empowering transformation through coaching, training, and
              consultancy.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a href={`mailto:${businessEmail}`} className="hover:text-primary transition-colors">
                  {businessEmail}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a href={`tel:${businessPhone}`} className="hover:text-primary transition-colors">
                  {businessPhone.replace("+44", "0")}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {businessAddress}
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4 mb-6">
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <div className="space-y-2">
              <Link
                href="/privacy"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Ìbáṣepọ̀ — Connected Hearts Coaching & Consultancy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
