'use client';

import { useState, useCallback } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { Property } from '@/lib/data';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapViewProps {
  properties: Property[];
  onPropertySelect: (property: Property) => void;
}

export default function MapView({ properties, onPropertySelect }: MapViewProps) {
  const [popupInfo, setPopupInfo] = useState<Property | null>(null);
  const [viewState, setViewState] = useState({
    longitude: -97.7431,
    latitude: 30.2672,
    zoom: 11
  });

  const handleMarkerClick = useCallback((property: Property) => {
    setPopupInfo(property);
    onPropertySelect(property);
  }, [onPropertySelect]);

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoiZGVtby11c2VyIiwiYSI6ImNrOGVqb3VoZjBhcmczZW1yNnB6dGRqbGEifQ.demo'}
      >
        {properties.map((property) => (
          <Marker
            key={property.id}
            longitude={property.lng}
            latitude={property.lat}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              handleMarkerClick(property);
            }}
          >
            <div className="cursor-pointer transform hover:scale-110 transition-transform">
              <div className="bg-blue-600 text-white px-3 py-2 rounded-full shadow-lg text-sm font-semibold">
                ${property.pricePerSqFt}/sqft
              </div>
            </div>
          </Marker>
        ))}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={popupInfo.lng}
            latitude={popupInfo.lat}
            onClose={() => setPopupInfo(null)}
            closeButton={true}
            closeOnClick={false}
          >
            <div className="p-2 min-w-[200px]">
              <h3 className="font-bold text-lg mb-1">{popupInfo.location}</h3>
              <p className="text-sm text-gray-600 mb-2">{popupInfo.address}</p>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-semibold">Price:</span> ${popupInfo.pricePerSqFt}/sqft
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Lot Size:</span> {popupInfo.lotSize.toLocaleString()} sqft
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Zoning:</span> {popupInfo.zoningType}
                </p>
              </div>
              <button
                onClick={() => onPropertySelect(popupInfo)}
                className="mt-3 w-full bg-blue-600 text-white py-1.5 px-3 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                View Details
              </button>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
