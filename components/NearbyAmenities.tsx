'use client';

import { MapPin, School, Hospital, ShoppingBag, Navigation, Trees } from 'lucide-react';
import { Amenity } from '@/types';

interface NearbyAmenitiesProps {
  amenities: Amenity[];
}

const amenityIcons = {
  highway: Navigation,
  school: School,
  hospital: Hospital,
  shopping: ShoppingBag,
  park: Trees,
};

const amenityColors = {
  highway: 'text-blue-600 bg-blue-50',
  school: 'text-purple-600 bg-purple-50',
  hospital: 'text-red-600 bg-red-50',
  shopping: 'text-green-600 bg-green-50',
  park: 'text-emerald-600 bg-emerald-50',
};

export default function NearbyAmenities({ amenities }: NearbyAmenitiesProps) {
  if (!amenities || amenities.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="text-blue-600" size={24} />
          <h2 className="text-xl font-bold">Nearby Amenities</h2>
        </div>
        <p className="text-gray-500">No amenity data available for this location.</p>
      </div>
    );
  }

  const sortedAmenities = [...amenities].sort((a, b) => a.distance - b.distance);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="text-blue-600" size={24} />
        <h2 className="text-xl font-bold">Nearby Amenities</h2>
      </div>

      <div className="space-y-3">
        {sortedAmenities.map((amenity, index) => {
          const Icon = amenityIcons[amenity.type];
          const colorClass = amenityColors[amenity.type];

          return (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className={`p-2 rounded-lg ${colorClass}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{amenity.name}</h3>
                  <p className="text-sm text-gray-600 capitalize">{amenity.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{amenity.distance}</p>
                <p className="text-sm text-gray-600">miles</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="font-semibold mb-3 text-sm text-gray-700">Impact on Property Value</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <span className="font-medium">Proximity to highways:</span> Enhances accessibility, though noise may be a concern.
          </p>
          <p>
            <span className="font-medium">Nearby schools:</span> Increases appeal for families, typically adds 2-5% value.
          </p>
          <p>
            <span className="font-medium">Healthcare access:</span> Important for all demographics, especially seniors.
          </p>
          <p>
            <span className="font-medium">Shopping & parks:</span> Improve quality of life and neighborhood desirability.
          </p>
        </div>
      </div>
    </div>
  );
}
