"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Instagram, Linkedin, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-text-dark text-white">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Ìbáṣepọ̀</h3>
            <p className="text-white/70">Connected Hearts, Empowered Minds.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-white/70 hover:text-white">About</Link></li>
              <li><Link href="/services" className="text-white/70 hover:text-white">Services</Link></li>
              <li><Link href="/blog" className="text-white/70 hover:text-white">Blog</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-white">Contact</Link></li>
              <li><Link href="/terms" className="text-white/70 hover:text-white">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-white/70 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-white/70 hover:text-white"><Instagram /></Link>
              <Link href="#" className="text-white/70 hover:text-white"><Linkedin /></Link>
              <Link href="#" className="text-white/70 hover:text-white"><Facebook /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/20 pt-8 text-center text-white/70">
          <p>&copy; {new Date().getFullYear()} Ìbáṣepọ̀. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}