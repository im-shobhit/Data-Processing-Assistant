'use client';

import { Property } from '@/lib/data';

interface NearbyAmenitiesProps {
  property: Property | null;
}

export default function NearbyAmenities({ property }: NearbyAmenitiesProps) {
  if (!property) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Nearby Amenities</h2>
        <div className="flex items-center justify-center h-48 text-gray-500">
          Select a property to view nearby amenities
        </div>
      </div>
    );
  }

  const { highways, schools, hospitals } = property.nearbyAmenities;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Nearby Amenities</h2>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{property.location}</h3>
        <p className="text-sm text-gray-600">
          Proximity to key infrastructure and services that influence land value
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Highways & Major Roads
          </h4>
          <div className="space-y-2">
            {highways.map((highway, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">{highway.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{highway.distance} miles</span>
                  <div className={`w-2 h-2 rounded-full ${highway.distance < 1 ? 'bg-green-500' : highway.distance < 2 ? 'bg-yellow-500' : 'bg-orange-500'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Schools & Education
          </h4>
          <div className="space-y-2">
            {schools.map((school, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">{school.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{school.distance} miles</span>
                  <div className={`w-2 h-2 rounded-full ${school.distance < 1 ? 'bg-green-500' : school.distance < 2 ? 'bg-yellow-500' : 'bg-orange-500'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Healthcare Facilities
          </h4>
          <div className="space-y-2">
            {hospitals.map((hospital, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">{hospital.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{hospital.distance} miles</span>
                  <div className={`w-2 h-2 rounded-full ${hospital.distance < 1 ? 'bg-green-500' : hospital.distance < 2 ? 'bg-yellow-500' : 'bg-orange-500'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h5 className="font-semibold text-gray-800 mb-2">Location Score</h5>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-700">Excellent (&lt; 1 mile)</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm text-gray-700">Good (1-2 miles)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-sm text-gray-700">Fair (&gt; 2 miles)</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Overall Accessibility</p>
              <p className="text-2xl font-bold text-blue-600">
                {(() => {
                  const allDistances = [...highways, ...schools, ...hospitals].map(a => a.distance);
                  const avgDistance = allDistances.reduce((a, b) => a + b, 0) / allDistances.length;
                  return avgDistance < 1.5 ? 'A+' : avgDistance < 2.5 ? 'A' : 'B+';
                })()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
