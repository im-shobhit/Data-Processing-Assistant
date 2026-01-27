'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { properties, Property } from '@/lib/data';
import SearchFilters from '@/components/SearchFilters';
import MarketTrends from '@/components/MarketTrends';
import InvestmentCalculator from '@/components/InvestmentCalculator';
import ZoningInfo from '@/components/ZoningInfo';
import NearbyAmenities from '@/components/NearbyAmenities';
import AIPricePredictor from '@/components/AIPricePredictor';

const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gray-200 rounded-lg flex items-center justify-center">
      <p className="text-gray-600">Loading map...</p>
    </div>
  )
});

interface FilterState {
  location: string;
  minPrice: string;
  maxPrice: string;
  zoningType: string;
  minLotSize: string;
  maxLotSize: string;
}

export default function Home() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    location: '',
    minPrice: '',
    maxPrice: '',
    zoningType: '',
    minLotSize: '',
    maxLotSize: ''
  });

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      if (filters.zoningType && property.zoningType !== filters.zoningType) {
        return false;
      }
      if (filters.minPrice && property.pricePerSqFt < parseFloat(filters.minPrice)) {
        return false;
      }
      if (filters.maxPrice && property.pricePerSqFt > parseFloat(filters.maxPrice)) {
        return false;
      }
      if (filters.minLotSize && property.lotSize < parseFloat(filters.minLotSize)) {
        return false;
      }
      if (filters.maxLotSize && property.lotSize > parseFloat(filters.maxLotSize)) {
        return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-900">Real Estate Land Price Tracker</h1>
          <p className="text-gray-600 mt-2">Track land prices, analyze trends, and make informed investment decisions</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <SearchFilters onFilterChange={setFilters} />

        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-gray-800">Interactive Map</h2>
              <span className="text-sm text-gray-600">
                {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Click on any marker to view property details</p>
            <MapView properties={filteredProperties} onPropertySelect={setSelectedProperty} />
          </div>
        </div>

        {selectedProperty && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Selected Property</h3>
                <p className="text-gray-700">{selectedProperty.location} - {selectedProperty.address}</p>
              </div>
              <button
                onClick={() => setSelectedProperty(null)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <MarketTrends property={selectedProperty} />
          <AIPricePredictor property={selectedProperty} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <InvestmentCalculator property={selectedProperty} />
          <ZoningInfo property={selectedProperty} />
        </div>

        <div className="mb-6">
          <NearbyAmenities property={selectedProperty} />
        </div>

        {!selectedProperty && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Select a Property to Get Started</h3>
            <p className="text-gray-600">
              Click on any property marker on the map to view detailed information, market trends, and investment analysis.
            </p>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-600">
            <p className="mb-2">© 2025 Real Estate Land Price Tracker. All rights reserved.</p>
            <p className="text-sm">
              Data is for demonstration purposes only. Always consult with real estate professionals before making investment decisions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
