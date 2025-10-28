"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

interface Service {
    id: string;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    image: string;
}

interface ServiceCardProps {
    service: Service;
    index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
    return (
        <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, delay: (index % 3) * 0.1 }}>
            <Link href={`/services/${service.slug}`} className="group block rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full bg-card">
                <div className="relative h-56">
                    <Image src={service.image} alt={service.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                </div>
                <div className="p-6">
                    <span className="text-sm text-teal font-semibold">{service.category}</span>
                    <h3 className="font-heading text-xl font-bold mt-2 mb-3">{service.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{service.excerpt}</p>
                    <span className="font-semibold text-teal group-hover:underline">Learn More &rarr;</span>
                </div>
            </Link>
        </motion.div>
    )
}