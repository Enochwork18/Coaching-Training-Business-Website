'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Search, Heart, Users, BookOpen, Briefcase, Handshake, Mic } from 'lucide-react'

const categories = [
  'All',
  'Marriage',
  'Faith',
  'Parenting',
  'Personal Development',
  'Workshops',
  'Consultancy',
  'Speaking',
  'Digital Resources'
]

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [services, setServices] = useState([])
  const [filteredServices, setFilteredServices] = useState([])

  useEffect(() => {
    // Fetch services from API
    fetchServices()
  }, [])

  useEffect(() => {
    filterServices()
  }, [selectedCategory, searchQuery, services])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services')
      const data = await response.json()
      setServices(data)
      setFilteredServices(data)
    } catch (error) {
      console.error('Error fetching services:', error)
    }
  }

  const filterServices = () => {
    let filtered = services

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((s: any) => s.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter((s: any) =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredServices(filtered)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#A8D5BA] to-[#CFEAFB] py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2D5F4F] mb-6">
                Our Services
              </h1>
              <p className="text-lg md:text-xl text-[#2C3E50] max-w-3xl mx-auto mb-8">
                Discover the coaching and consultancy services designed to help you thrive
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-white"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-8 bg-[#F5F3EE] sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className={`whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-[#2A7F7F] text-white'
                      : 'bg-white text-[#2C3E50]'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service: any, index: number) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group"
                >
                  <div className="h-full bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#A8D5BA] to-[#2A7F7F] rounded-xl mb-4">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <span className="inline-block px-3 py-1 bg-[#CFEAFB] text-[#2A7F7F] text-sm font-semibold rounded-full mb-4">
                      {service.category}
                    </span>
                    <h3 className="text-xl font-bold text-[#2D5F4F] mb-3">
                      {service.title}
                    </h3>
                    <p className="text-[#2C3E50] mb-6 line-clamp-3">
                      {service.excerpt}
                    </p>
                    <Button asChild className="w-full bg-[#2A7F7F] hover:bg-[#2D5F4F]">
                      <Link href={`/services/${service.slug}`}>
                        Learn More
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-gray-500">
                  No services found. Try adjusting your search or filters.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}