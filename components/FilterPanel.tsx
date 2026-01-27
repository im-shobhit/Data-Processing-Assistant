'use client';

import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { FilterOptions } from '@/types';

interface FilterPanelProps {
  onFilterChange: (filters: FilterOptions) => void;
  resultsCount: number;
}

export default function FilterPanel({ onFilterChange, resultsCount }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterUpdate = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleZoningToggle = (zoning: string) => {
    const currentZoning = filters.zoningType || [];
    const newZoning = currentZoning.includes(zoning)
      ? currentZoning.filter(z => z !== zoning)
      : [...currentZoning, zoning];
    handleFilterUpdate('zoningType', newZoning);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  const hasActiveFilters = Object.keys(filters).some(key => {
    const value = filters[key as keyof FilterOptions];
    return value !== undefined && value !== '' && (!Array.isArray(value) || value.length > 0);
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="text-gray-600" size={20} />
          <h2 className="text-lg font-semibold">Filters</h2>
          <span className="text-sm text-gray-500">({resultsCount} results)</span>
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <X size={16} />
              Clear all
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            {isExpanded ? 'Hide' : 'Show'} filters
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by location (city, state)..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.location || ''}
            onChange={(e) => handleFilterUpdate('location', e.target.value)}
          />
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Price ($/sq ft)
              </label>
              <input
                type="number"
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.minPrice || ''}
                onChange={(e) => handleFilterUpdate('minPrice', e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price ($/sq ft)
              </label>
              <input
                type="number"
                placeholder="1000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.maxPrice || ''}
                onChange={(e) => handleFilterUpdate('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Lot Size (sq ft)
              </label>
              <input
                type="number"
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.minLotSize || ''}
                onChange={(e) => handleFilterUpdate('minLotSize', e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Lot Size (sq ft)
              </label>
              <input
                type="number"
                placeholder="100000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.maxLotSize || ''}
                onChange={(e) => handleFilterUpdate('maxLotSize', e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Zoning Type
            </label>
            <div className="flex flex-wrap gap-2">
              {['residential', 'commercial', 'industrial', 'agricultural'].map((zoning) => (
                <button
                  key={zoning}
                  onClick={() => handleZoningToggle(zoning)}
                  className={`px-4 py-2 rounded-lg border transition-colors capitalize ${
                    filters.zoningType?.includes(zoning)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {zoning}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
