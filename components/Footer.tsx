'use client';

import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-text-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-montserrat font-bold text-lg mb-4">Ìbáṣepọ̀ Connected Hearts</h3>
            <p className="text-gray-300 text-sm mb-4">
              Faith-based coaching and counseling for marriages, relationships, parenting, and personal growth.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-montserrat font-semibold text-base mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-300 hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/testimonials" className="text-gray-300 hover:text-primary transition-colors">Testimonials</Link></li>
              <li><Link href="/gallery" className="text-gray-300 hover:text-primary transition-colors">Gallery</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-montserrat font-semibold text-base mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services/marriage-counseling" className="text-gray-300 hover:text-primary transition-colors">Marriage Counseling</Link></li>
              <li><Link href="/services/parenting-coaching" className="text-gray-300 hover:text-primary transition-colors">Parenting Coaching</Link></li>
              <li><Link href="/services/pre-marital-coaching" className="text-gray-300 hover:text-primary transition-colors">Pre-Marital Coaching</Link></li>
              <li><Link href="/booking" className="text-gray-300 hover:text-primary transition-colors">Book Appointment</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-montserrat font-semibold text-base mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>14 Brunswick Street, Stretford, Manchester, M32 8NJ</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="flex-shrink-0" />
                <a href="tel:+447958709238" className="hover:text-primary transition-colors">
                  +44 7958 709238
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="flex-shrink-0" />
                <a href="mailto:info@ibasepo.org.uk" className="hover:text-primary transition-colors">
                  info@ibasepo.org.uk
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
            <div>
              <p>&copy; {new Date().getFullYear()} Ìbáṣepọ̀ Connected Hearts. All rights reserved.</p>
            </div>
            <div className="md:text-right">
              <Link href="/privacy" className="hover:text-primary transition-colors mr-4">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-text-primary/50 py-6">
        <div className="container mx-auto px-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2375.0!2d-2.3!3d53.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDI3JzAwLjAiTiAywrAxOCcwMC4wIlc!5e0!3m2!1sen!2suk!4v1234567890"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
            title="Our Location"
          ></iframe>
        </div>
      </div>
    </footer>
  );
}
