import { LandListing, MarketTrend, Amenity, ZoningInfo } from '@/types';

export const landListings: LandListing[] = [
  {
    id: '1',
    location: '123 Sunset Blvd',
    city: 'Los Angeles',
    state: 'CA',
    latitude: 34.0522,
    longitude: -118.2437,
    pricePerSqFt: 125.5,
    lotSize: 5000,
    zoningType: 'residential',
    totalPrice: 627500,
    lastUpdated: '2026-01-15',
    description: 'Prime residential lot in desirable neighborhood'
  },
  {
    id: '2',
    location: '456 Oak Street',
    city: 'Austin',
    state: 'TX',
    latitude: 30.2672,
    longitude: -97.7431,
    pricePerSqFt: 85.0,
    lotSize: 8000,
    zoningType: 'commercial',
    totalPrice: 680000,
    lastUpdated: '2026-01-20',
    description: 'Commercial zoning with high traffic visibility'
  },
  {
    id: '3',
    location: '789 Maple Ave',
    city: 'Denver',
    state: 'CO',
    latitude: 39.7392,
    longitude: -104.9903,
    pricePerSqFt: 95.75,
    lotSize: 6500,
    zoningType: 'residential',
    totalPrice: 622375,
    lastUpdated: '2026-01-18',
    description: 'Mountain view residential property'
  },
  {
    id: '4',
    location: '321 Pine Road',
    city: 'Seattle',
    state: 'WA',
    latitude: 47.6062,
    longitude: -122.3321,
    pricePerSqFt: 145.25,
    lotSize: 4500,
    zoningType: 'commercial',
    totalPrice: 653625,
    lastUpdated: '2026-01-22',
    description: 'Downtown commercial development opportunity'
  },
  {
    id: '5',
    location: '555 Elm Street',
    city: 'Phoenix',
    state: 'AZ',
    latitude: 33.4484,
    longitude: -112.0740,
    pricePerSqFt: 68.50,
    lotSize: 10000,
    zoningType: 'industrial',
    totalPrice: 685000,
    lastUpdated: '2026-01-10',
    description: 'Large industrial lot near freight corridors'
  },
  {
    id: '6',
    location: '999 Beach Drive',
    city: 'Miami',
    state: 'FL',
    latitude: 25.7617,
    longitude: -80.1918,
    pricePerSqFt: 180.0,
    lotSize: 3500,
    zoningType: 'residential',
    totalPrice: 630000,
    lastUpdated: '2026-01-25',
    description: 'Waterfront residential property'
  },
  {
    id: '7',
    location: '444 Ranch Road',
    city: 'Dallas',
    state: 'TX',
    latitude: 32.7767,
    longitude: -96.7970,
    pricePerSqFt: 72.30,
    lotSize: 15000,
    zoningType: 'agricultural',
    totalPrice: 1084500,
    lastUpdated: '2026-01-12',
    description: 'Agricultural land with water rights'
  },
  {
    id: '8',
    location: '777 Valley View',
    city: 'San Francisco',
    state: 'CA',
    latitude: 37.7749,
    longitude: -122.4194,
    pricePerSqFt: 210.0,
    lotSize: 3000,
    zoningType: 'residential',
    totalPrice: 630000,
    lastUpdated: '2026-01-23',
    description: 'Premium hillside lot with city views'
  }
];

export const marketTrends: Record<string, MarketTrend[]> = {
  'Los Angeles': [
    { month: 'Feb 2025', avgPrice: 118.0, location: 'Los Angeles' },
    { month: 'Mar 2025', avgPrice: 119.5, location: 'Los Angeles' },
    { month: 'Apr 2025', avgPrice: 120.2, location: 'Los Angeles' },
    { month: 'May 2025', avgPrice: 121.8, location: 'Los Angeles' },
    { month: 'Jun 2025', avgPrice: 122.5, location: 'Los Angeles' },
    { month: 'Jul 2025', avgPrice: 123.0, location: 'Los Angeles' },
    { month: 'Aug 2025', avgPrice: 123.8, location: 'Los Angeles' },
    { month: 'Sep 2025', avgPrice: 124.2, location: 'Los Angeles' },
    { month: 'Oct 2025', avgPrice: 124.8, location: 'Los Angeles' },
    { month: 'Nov 2025', avgPrice: 125.0, location: 'Los Angeles' },
    { month: 'Dec 2025', avgPrice: 125.3, location: 'Los Angeles' },
    { month: 'Jan 2026', avgPrice: 125.5, location: 'Los Angeles' }
  ],
  'Austin': [
    { month: 'Feb 2025', avgPrice: 78.0, location: 'Austin' },
    { month: 'Mar 2025', avgPrice: 79.5, location: 'Austin' },
    { month: 'Apr 2025', avgPrice: 80.8, location: 'Austin' },
    { month: 'May 2025', avgPrice: 81.5, location: 'Austin' },
    { month: 'Jun 2025', avgPrice: 82.0, location: 'Austin' },
    { month: 'Jul 2025', avgPrice: 82.8, location: 'Austin' },
    { month: 'Aug 2025', avgPrice: 83.5, location: 'Austin' },
    { month: 'Sep 2025', avgPrice: 84.0, location: 'Austin' },
    { month: 'Oct 2025', avgPrice: 84.3, location: 'Austin' },
    { month: 'Nov 2025', avgPrice: 84.6, location: 'Austin' },
    { month: 'Dec 2025', avgPrice: 84.8, location: 'Austin' },
    { month: 'Jan 2026', avgPrice: 85.0, location: 'Austin' }
  ],
  'Denver': [
    { month: 'Feb 2025', avgPrice: 88.0, location: 'Denver' },
    { month: 'Mar 2025', avgPrice: 89.5, location: 'Denver' },
    { month: 'Apr 2025', avgPrice: 90.8, location: 'Denver' },
    { month: 'May 2025', avgPrice: 91.5, location: 'Denver' },
    { month: 'Jun 2025', avgPrice: 92.3, location: 'Denver' },
    { month: 'Jul 2025', avgPrice: 93.0, location: 'Denver' },
    { month: 'Aug 2025', avgPrice: 93.8, location: 'Denver' },
    { month: 'Sep 2025', avgPrice: 94.5, location: 'Denver' },
    { month: 'Oct 2025', avgPrice: 95.0, location: 'Denver' },
    { month: 'Nov 2025', avgPrice: 95.4, location: 'Denver' },
    { month: 'Dec 2025', avgPrice: 95.6, location: 'Denver' },
    { month: 'Jan 2026', avgPrice: 95.75, location: 'Denver' }
  ]
};

export const amenitiesData: Record<string, Amenity[]> = {
  '1': [
    { name: 'I-405 Highway', type: 'highway', distance: 0.8 },
    { name: 'Sunset Elementary School', type: 'school', distance: 1.2 },
    { name: 'Cedars-Sinai Medical Center', type: 'hospital', distance: 2.5 },
    { name: 'Beverly Center', type: 'shopping', distance: 1.5 },
    { name: 'Griffith Park', type: 'park', distance: 3.2 }
  ],
  '2': [
    { name: 'US-183 Highway', type: 'highway', distance: 1.0 },
    { name: 'Austin High School', type: 'school', distance: 0.9 },
    { name: 'Dell Seton Medical Center', type: 'hospital', distance: 1.8 },
    { name: 'The Domain', type: 'shopping', distance: 2.0 },
    { name: 'Zilker Park', type: 'park', distance: 2.5 }
  ],
  '3': [
    { name: 'I-25 Highway', type: 'highway', distance: 1.5 },
    { name: 'Denver Academy', type: 'school', distance: 1.1 },
    { name: 'Denver Health Medical Center', type: 'hospital', distance: 2.2 },
    { name: 'Cherry Creek Shopping Center', type: 'shopping', distance: 1.7 },
    { name: 'City Park', type: 'park', distance: 1.0 }
  ],
  '4': [
    { name: 'I-5 Highway', type: 'highway', distance: 0.6 },
    { name: 'Seattle Prep', type: 'school', distance: 1.3 },
    { name: 'Harborview Medical Center', type: 'hospital', distance: 1.5 },
    { name: 'Pike Place Market', type: 'shopping', distance: 0.9 },
    { name: 'Discovery Park', type: 'park', distance: 3.5 }
  ]
};

export const zoningData: Record<string, ZoningInfo> = {
  'residential': {
    type: 'Residential (R1)',
    restrictions: [
      'Single-family dwellings only',
      'Maximum 2 stories',
      'No commercial activities',
      'Minimum 5000 sq ft lot size'
    ],
    allowedUses: [
      'Single-family homes',
      'Accessory dwelling units (ADU)',
      'Home gardens',
      'Garages and carports'
    ],
    maxHeight: '35 feet',
    setbackRequirements: 'Front: 20ft, Side: 10ft, Rear: 15ft'
  },
  'commercial': {
    type: 'Commercial (C2)',
    restrictions: [
      'No hazardous materials',
      'Parking requirements apply',
      'Maximum 6 stories',
      'Noise ordinances enforced'
    ],
    allowedUses: [
      'Retail stores',
      'Restaurants',
      'Offices',
      'Mixed-use developments',
      'Service businesses'
    ],
    maxHeight: '75 feet',
    setbackRequirements: 'Front: 15ft, Side: 5ft, Rear: 10ft'
  },
  'industrial': {
    type: 'Industrial (I1)',
    restrictions: [
      'Environmental compliance required',
      'Limited operating hours',
      'Buffer zones from residential areas',
      'Heavy truck access required'
    ],
    allowedUses: [
      'Light manufacturing',
      'Warehousing',
      'Distribution centers',
      'Research and development',
      'Industrial offices'
    ],
    maxHeight: '45 feet',
    setbackRequirements: 'Front: 25ft, Side: 15ft, Rear: 20ft'
  },
  'agricultural': {
    type: 'Agricultural (AG)',
    restrictions: [
      'Minimum 5 acres for subdivision',
      'Agricultural use required',
      'Limited residential development',
      'Water rights restrictions may apply'
    ],
    allowedUses: [
      'Crop farming',
      'Livestock raising',
      'Agricultural buildings',
      'Farmer\'s residence',
      'Agricultural tourism'
    ],
    maxHeight: 'Varies by structure type',
    setbackRequirements: 'Front: 50ft, Side: 30ft, Rear: 40ft'
  }
};
