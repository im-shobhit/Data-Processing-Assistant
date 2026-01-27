'use client';

import { Property } from '@/lib/data';

interface ZoningInfoProps {
  property: Property | null;
}

export default function ZoningInfo({ property }: ZoningInfoProps) {
  if (!property) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Zoning & Legal Information</h2>
        <div className="flex items-center justify-center h-48 text-gray-500">
          Select a property to view zoning information
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Zoning & Legal Information</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{property.location}</h3>
        <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold">
          {property.zoningType}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Development Restrictions
          </h4>
          <ul className="space-y-2">
            {property.zoningInfo.restrictions.map((restriction, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700">
                <span className="text-blue-600 mt-1">•</span>
                <span>{restriction}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h5 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              Maximum Height
            </h5>
            <p className="text-gray-700">{property.zoningInfo.maxHeight}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h5 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              Setback Requirements
            </h5>
            <p className="text-gray-700">{property.zoningInfo.setbackRequirements}</p>
          </div>
        </div>

        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h5 className="font-semibold text-gray-800 mb-1">Important Notice</h5>
              <p className="text-sm text-gray-700">
                This information is for reference only. Always consult with local zoning authorities and legal professionals before making development decisions. Zoning regulations may change and additional permits may be required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
