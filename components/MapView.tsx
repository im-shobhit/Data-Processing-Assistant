'use client';

import { useState, useCallback } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';
import { MapPin } from 'lucide-react';
import { LandListing } from '@/types';
import { formatCurrency } from '@/lib/utils';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapViewProps {
  listings: LandListing[];
  onSelectListing: (listing: LandListing) => void;
  selectedListing?: LandListing | null;
}

export default function MapView({ listings, onSelectListing, selectedListing }: MapViewProps) {
  const [popupInfo, setPopupInfo] = useState<LandListing | null>(null);

  const handleMarkerClick = useCallback((listing: LandListing) => {
    setPopupInfo(listing);
    onSelectListing(listing);
  }, [onSelectListing]);

  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
      <Map
        initialViewState={{
          latitude: 37.7749,
          longitude: -95.4194,
          zoom: 3.5
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'}
      >
        <NavigationControl position="top-right" />

        {listings.map((listing) => (
          <Marker
            key={listing.id}
            latitude={listing.latitude}
            longitude={listing.longitude}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              handleMarkerClick(listing);
            }}
          >
            <div className="cursor-pointer transform transition-transform hover:scale-110">
              <MapPin
                className={`${
                  selectedListing?.id === listing.id
                    ? 'text-blue-600 fill-blue-600'
                    : 'text-red-600 fill-red-600'
                }`}
                size={32}
              />
            </div>
          </Marker>
        ))}

        {popupInfo && (
          <Popup
            latitude={popupInfo.latitude}
            longitude={popupInfo.longitude}
            anchor="top"
            onClose={() => setPopupInfo(null)}
            closeButton={true}
            closeOnClick={false}
            className="max-w-sm"
          >
            <div className="p-2">
              <h3 className="font-bold text-lg mb-1">{popupInfo.location}</h3>
              <p className="text-sm text-gray-600 mb-2">{popupInfo.city}, {popupInfo.state}</p>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-semibold">Price/sq ft:</span> {formatCurrency(popupInfo.pricePerSqFt)}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Lot Size:</span> {popupInfo.lotSize.toLocaleString()} sq ft
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Total:</span> {formatCurrency(popupInfo.totalPrice)}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Zoning:</span>{' '}
                  <span className="capitalize">{popupInfo.zoningType}</span>
                </p>
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
