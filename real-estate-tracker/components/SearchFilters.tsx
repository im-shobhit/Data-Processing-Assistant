'use client';

import { useState } from 'react';

interface FilterState {
  location: string;
  minPrice: string;
  maxPrice: string;
  zoningType: string;
  minLotSize: string;
  maxLotSize: string;
}

interface SearchFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export default function SearchFilters({ onFilterChange }: SearchFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    location: '',
    minPrice: '',
    maxPrice: '',
    zoningType: '',
    minLotSize: '',
    maxLotSize: ''
  });

  const handleChange = (field: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      location: '',
      minPrice: '',
      maxPrice: '',
      zoningType: '',
      minLotSize: '',
      maxLotSize: ''
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Search & Filter</h2>
        <button
          onClick={handleReset}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Reset Filters
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={filters.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="Search by location..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Zoning Type
          </label>
          <select
            value={filters.zoningType}
            onChange={(e) => handleChange('zoningType', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Mixed-Use">Mixed-Use</option>
            <option value="Industrial">Industrial</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range ($/sqft)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => handleChange('minPrice', e.target.value)}
              placeholder="Min"
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handleChange('maxPrice', e.target.value)}
              placeholder="Max"
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lot Size (sqft)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={filters.minLotSize}
              onChange={(e) => handleChange('minLotSize', e.target.value)}
              placeholder="Min"
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="number"
              value={filters.maxLotSize}
              onChange={(e) => handleChange('maxLotSize', e.target.value)}
              placeholder="Max"
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
