'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  Filter,
  Search,
  Navigation
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Vendor } from '@/types'

export default function Vendors() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading vendors
    setTimeout(() => {
      const mockVendors: Vendor[] = [
        {
          id: '1',
          name: 'Green Earth Recycling Center',
          type: 'recycler',
          address: '123 Eco Street, Bangalore, Karnataka',
          location: { lat: 12.9716, lng: 77.5946 },
          phone: '+91 98765 43210',
          email: 'info@greenearth.in',
          services: ['Plastic', 'Paper', 'Metal', 'Glass'],
          rating: 4.5,
          isVerified: true
        },
        {
          id: '2',
          name: 'Bangalore Municipal Waste Management',
          type: 'municipal',
          address: '456 City Center, Bangalore, Karnataka',
          location: { lat: 12.9789, lng: 77.5917 },
          phone: '+91 98765 43211',
          email: 'waste@bangalore.gov.in',
          services: ['All types', 'Hazardous waste', 'E-waste'],
          rating: 4.2,
          isVerified: true
        },
        {
          id: '3',
          name: 'Eco Warriors NGO',
          type: 'ngo',
          address: '789 Community Lane, Bangalore, Karnataka',
          location: { lat: 12.9655, lng: 77.5855 },
          phone: '+91 98765 43212',
          email: 'contact@ecowarriors.org',
          services: ['Organic waste', 'Composting', 'Education'],
          rating: 4.8,
          isVerified: true
        },
        {
          id: '4',
          name: 'Tech Recycle Solutions',
          type: 'recycler',
          address: '321 Tech Park, Bangalore, Karnataka',
          location: { lat: 12.9716, lng: 77.5946 },
          phone: '+91 98765 43213',
          email: 'hello@techrecycle.in',
          services: ['E-waste', 'Batteries', 'Electronics'],
          rating: 4.6,
          isVerified: true
        }
      ]
      setVendors(mockVendors)
      setFilteredVendors(mockVendors)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = vendors

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(vendor =>
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.services.some(service => 
          service.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(vendor => vendor.type === selectedType)
    }

    setFilteredVendors(filtered)
  }, [vendors, searchTerm, selectedType])

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'recycler':
        return 'bg-blue-100 text-blue-800'
      case 'municipal':
        return 'bg-green-100 text-green-800'
      case 'ngo':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'recycler':
        return '♻️'
      case 'municipal':
        return '🏛️'
      case 'ngo':
        return '🤝'
      default:
        return '📍'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-eco-green rounded-lg flex items-center justify-center">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Find Vendors</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover nearby recycling centers, municipal facilities, and NGOs for proper waste disposal
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                />
              </div>

              {/* Type Filter */}
              <div>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="recycler">Recyclers</option>
                  <option value="municipal">Municipal</option>
                  <option value="ngo">NGOs</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                >
                  <option value="rating">Sort by Rating</option>
                  <option value="distance">Sort by Distance</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Vendor List */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              {loading ? (
                <div className="card">
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-green mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading vendors...</p>
                  </div>
                </div>
              ) : filteredVendors.length === 0 ? (
                <div className="card">
                  <div className="text-center py-12">
                    <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No vendors found
                    </h3>
                    <p className="text-gray-600">
                      Try adjusting your search criteria or check back later
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredVendors.map((vendor, index) => (
                    <motion.div
                      key={vendor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="card hover:shadow-lg transition-shadow duration-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="text-2xl">{getTypeIcon(vendor.type)}</span>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {vendor.name}
                              </h3>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(vendor.type)}`}>
                                  {vendor.type.charAt(0).toUpperCase() + vendor.type.slice(1)}
                                </span>
                                {vendor.isVerified && (
                                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                    Verified
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center space-x-2 text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span>{vendor.address}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Phone className="w-4 h-4" />
                              <span>{vendor.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Mail className="w-4 h-4" />
                              <span>{vendor.email}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < Math.floor(vendor.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">{vendor.rating}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mt-3">
                            {vendor.services.map((service, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2 ml-4">
                          <button className="btn-primary text-sm px-4 py-2">
                            <Navigation className="w-4 h-4 mr-1" />
                            Directions
                          </button>
                          <button className="btn-secondary text-sm px-4 py-2">
                            Contact
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Map View</h3>
                <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Google Maps integration</p>
                    <p className="text-sm text-gray-500">Coming soon</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Interactive map showing vendor locations will be available in the next update.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 